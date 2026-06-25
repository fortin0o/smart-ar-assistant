# Smart AR Assistant: 3D Engine Hologram 🏎️✨

**Smart AR Assistant** is a premium, mobile-first WebAR application that renders an interactive, procedurally animated 3D internal combustion engine. Designed to mimic the aesthetics of next-generation AR interfaces like Apple Vision Pro or Meta Quest, it features a highly polished "holographic glass" aesthetic, real-time interactivity, and a floating contextual interface.

This application allows users to explore the internal mechanics of an engine by selecting specific parts, viewing them in X-Ray (glass transmission) mode, and triggering real-time mechanical animations, while an integrated AI Assistant panel provides contextual data.

---

## 🌟 Key Features

- **Holographic 3D Engine Model:** The outer shells of the engine (cylinder block, head, oil pan) are rendered as frosted physical glass with high transmission, allowing the user to constantly see the internal workings (pistons, crankshaft, valves) in real time.
- **Interactive Component Selection:** Tap directly through the glass shell to select specific internal parts (Pistons, Crankshaft, Camshaft, Sparkplugs, Valves). Selected parts glow with a pulsing cyan emissive light, while the rest of the engine fades into the background.
- **Real-time Mechanical Animations:** Trigger full-cycle engine animations or isolate specific movements (e.g., Crankshaft Spin, Camshaft Rotate, Valve Operation, Sparkplug Ignition).
- **Premium Floating UI / Bottom Sheets:** A deeply immersive, mobile-first interface using a Floating Action Button (FAB) and sleek, glassmorphic bottom sheets. The UI never clutters the 3D viewport, preserving the pure AR experience.
- **Smart Data Integration (Mock):** Contextual AI and Voice command sheets (currently mocked for demonstration) built directly into the floating interface to provide data on engine metrics, diagnostics, and voice controls.

---

## 📖 User Manual & How to Operate

### 1. Navigating the 3D Space
- **Rotate / Orbit:** Click and drag (or drag with one finger on mobile) anywhere on the dark background to orbit around the 3D engine.
- **Zoom:** Scroll up/down (or pinch on mobile) to zoom in and out.
- **Pan:** Right-click and drag (or two-finger swipe on mobile) to pan the camera.

### 2. Selecting Parts (X-Ray Mode)
Because the outer engine block is rendered as **transparent physical glass**, you can click straight through it!
- **Click an internal part** (like a silver piston or the purple crankshaft) to select it.
- **When selected:** The part will pulse with a bright cyan glow, making it the focal point of the scene.
- **Click again** or click the background to deselect the part and return to the default state.

### 3. Using the Floating Action Button (FAB) Menu
In the bottom-right corner of the screen, you will find the **FAB Menu (+)**. Clicking it reveals several interaction modes:

- 🤖 **AI Assistant:** Opens the Smart AI diagnostics panel to view current engine status (e.g., Operating Temp, Oil Pressure).
- 🎤 **Voice Commands:** Opens the voice interaction overlay (mock feature).
- 📦 **Object Info:** Displays detailed specifications and historical data about the currently selected 3D component.
- ⚙️ **Animations:** Opens the Animation Control panel. Use this to trigger specific mechanical movements (e.g., "Full Cycle", "Piston Move", "Spark Ignite") and watch the 3D model animate in real-time.
- 🛠️ **Settings:** Access AR and Tracking settings (e.g., Show Markers, Quality).

*Tip: Swipe down on any open Bottom Sheet or click the close (X) button to dismiss it and return to the pure 3D view.*

---

## 💻 Tech Stack & Architecture

- **Framework:** Next.js 15 (React 19)
- **3D Rendering:** Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Animations:** Framer Motion (for sleek, spring-physics UI transitions)
- **Styling:** Tailwind CSS + custom Glassmorphism CSS modules
- **State Management:** Zustand (for global UI, animation targets, and 3D selection states)
- **Icons:** Lucide React

---

## 🚀 Getting Started Locally

First, ensure you have Node.js installed, then install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the AR Assistant.
