'use client';

declare global {
  interface Window {
    MINDAR?: {
      IMAGE?: {
        Controller: any;
        Compiler: any;
        UI: any;
      };
    };
  }
}

export interface ARDetectionState {
  isLoaded: boolean;
  markerFound: boolean;
  cameraMatrix: Float32Array | null;
  projectionMatrix: Float32Array | null;
  error: string | null;
}

type Listener = (state: ARDetectionState) => void;

const STATE: ARDetectionState = {
  isLoaded: false,
  markerFound: false,
  cameraMatrix: null,
  projectionMatrix: null,
  error: null,
};

let listeners: Listener[] = [];

function notify(s: ARDetectionState) {
  listeners.forEach(l => l(s));
}

export function subscribeAR(cb: Listener) {
  listeners.push(cb);
  return () => { listeners = listeners.filter(l => l !== cb); };
}

export function getARState(): ARDetectionState {
  return { ...STATE };
}

let controller: any = null;
let stream: MediaStream | null = null;

export function getARStream(): MediaStream | null {
  return stream;
}

/**
 * Start camera and return the stream.
 * Call this before startAR to share the video element.
 */
export async function startCamera(): Promise<{ stream: MediaStream; video: HTMLVideoElement }> {
  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
  });

  const video = document.createElement('video');
  video.srcObject = stream;
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.objectFit = 'cover';
  video.style.position = 'absolute';
  video.style.top = '0';
  video.style.left = '0';
  document.body.appendChild(video);
  await video.play();

  return { stream, video };
}

export function startAR(videoEl: HTMLVideoElement, markerUrl: string = '/ar/marker.mind'): Promise<{ projectionMatrix: Float32Array }> {
  return new Promise(async (resolve, reject) => {
    try {
      if (!window.MINDAR?.IMAGE) {
        await new Promise<void>((resolve2, reject2) => {
          const s = document.createElement('script');
          s.src = '/mindar/mindar-image.prod.js';
          s.onload = () => resolve2();
          s.onerror = () => reject2(new Error('Failed to load MindAR'));
          document.head.appendChild(s);
        });
      }

      const { Controller } = window.MINDAR!.IMAGE!;
      controller = new Controller({
        inputWidth: videoEl.videoWidth,
        inputHeight: videoEl.videoHeight,
        maxTrack: 1,
        warmupTolerance: 3,
        missTolerance: 3,
      });

      const resp = await fetch(markerUrl);
      const buf = await resp.arrayBuffer();
      controller.addImageTargetsFromBuffer(buf);

      controller.onUpdate = (data: any) => {
        if (data.type === 'updateMatrix') {
          STATE.isLoaded = true;
          STATE.markerFound = !!data.worldMatrix;
          STATE.cameraMatrix = data.worldMatrix ? new Float32Array(data.worldMatrix) : null;
          notify({ ...STATE });
        }
      };

      controller.dummyRun(videoEl);

      STATE.isLoaded = true;
      STATE.projectionMatrix = new Float32Array(controller.getProjectionMatrix());
      notify({ ...STATE });

      controller.processVideo(videoEl);

      resolve({ projectionMatrix: STATE.projectionMatrix! });
    } catch (err) {
      STATE.error = err instanceof Error ? err.message : 'AR init failed';
      notify({ ...STATE });
      reject(err);
    }
  });
}

export function stopAR() {
  controller?.stopProcessVideo();
  controller = null;
  stream?.getTracks().forEach(t => t.stop());
  stream = null;

  Object.assign(STATE, {
    isLoaded: false,
    markerFound: false,
    cameraMatrix: null,
    projectionMatrix: null,
    error: null,
  });
  notify({ ...STATE });
}
