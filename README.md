# Web.AR Explorer (Three.js & AR.js)

An interactive, premium augmented reality experience built using **Three.js** and **AR.js**. The application projects interactive 3D models onto a physical **Hiro Marker** tracked in real-time through your webcam. It features a futuristic, responsive glassmorphic HUD dashboard for adjusting models, scaling, color palettes, and animation speeds.

---

## 🚀 How to Run

Because webcams require a **secure context** (HTTPS or `localhost`), you cannot open `index.html` directly from your local filesystem (`file://`) in modern browsers. Doing so will block camera access.

You must serve the project files using a local development server.

### Option A: Using Node.js (Recommended)
If you have Node.js installed, run this command in your project directory:
```bash
npx -y http-server -p 8080
```
Then open your browser and navigate to: **`http://localhost:8080`**

### Option B: Using Python
If you have Python installed, run:
```bash
python -m http.server 8080
```
Then open your browser and navigate to: **`http://localhost:8080`**

---

## 🎯 How to Use the AR Space

1. **Enter AR Space**: Click the **ENTER AR SPACE** button on the splash screen and allow webcam/camera permissions when prompted.
2. **Retrieve the Hiro Marker**: 
   - Click **Show Hiro Marker** in the dashboard panel.
   - Scan the **QR Code** using your phone to open the marker image on your phone screen, or point your webcam directly at the marker on a second screen.
3. **Project & Interact**: Hold the Hiro marker in front of your camera. A 3D object will float and rotate right on top of it.
4. **Customize in Real-Time**:
   - Change geometry (Rotating Cube, Torus Knot, Glossy Sphere, Cyber Cylinder).
   - Alter colors using the HSL color palette.
   - Adjust the object's physical scale and rotation speed.

---

## 🛠️ Key Technical Modifications & Fixes

1. **Camera Zoom Adjustment**: 
   - Modified `animation.js` to scale the horizontal and vertical projection elements of the Three.js camera. By applying a `0.75x` factor, we successfully **zoomed out the camera** (widening the FOV), allowing the 3D model to be viewed fully without getting cropped close-up.
2. **AR.js Resize Handler Crash Fix**:
   - Resolved a critical console error in the window resize handler. Standard AR.js methods `onResizeElement()` and `copyElementSizeTo()` were corrected from the legacy `onResize()` and `copySizeTo()`, ensuring the camera view scales properly without throwing exceptions when resizing.

---

## 📦 Stack Details
- **Rendering Engine**: Three.js (r128)
- **AR Tracking**: AR.js (using `artoolkit` and `ar-threex`)
- **Styling**: Vanilla CSS with glassmorphism, responsive grids, and CSS animations.
