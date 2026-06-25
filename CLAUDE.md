# CLAUDE.md

## Project Overview

Smart AR Assistant is a modern web-based Augmented Reality platform that combines Three.js, AR.js/MindAR, and AI-powered contextual assistance.

Users can scan a marker using their device camera and interact with a 3D model in real time. The system allows object selection, AI-powered explanations, voice interaction, and dynamic animations.

The project is intended to serve as a professional portfolio and internship-level application demonstrating expertise in:

* Next.js
* TypeScript
* Three.js
* React Three Fiber
* Augmented Reality
* Artificial Intelligence
* Responsive UI/UX Design

---

## Primary Goal

Build a production-quality mobile-first web application where users can:

1. Scan an AR marker.
2. View a 3D model in AR.
3. Select model components.
4. Ask AI questions about the selected component.
5. Receive contextual responses.
6. Trigger visual demonstrations and animations.

---

## Technology Stack

### Framework

* Next.js 15 App Router
* TypeScript

### Styling

* Tailwind CSS
* Framer Motion

### State Management

* Zustand

### 3D

* Three.js
* React Three Fiber
* Drei

### Augmented Reality

Preferred:

* MindAR

Alternative:

* AR.js

### AI

* OpenAI API

### Voice

* Web Speech API
* SpeechRecognition
* SpeechSynthesis

---

## Design Principles

### Mobile First

The application must prioritize mobile devices.

Target devices:

* Android Chrome
* iPhone Safari

Desktop support is secondary.

---

### UI Style

Use:

* Glassmorphism
* Soft blur backgrounds
* Smooth animations
* Modern spacing
* Rounded corners
* Minimalistic controls

Inspired by:

* Apple Vision Pro
* Tesla UI
* Vercel
* Linear
* Arc Browser

---

## Code Standards

### General

* Strict TypeScript
* No any type
* Reusable components
* Modular architecture

### Components

Each component should:

* Have a single responsibility
* Be reusable
* Be strongly typed

### Naming

Components:
PascalCase

Example:

ARCamera.tsx

Hooks:
camelCase

Example:

useSelectedObject.ts

Stores:

useARStore.ts

---

## Performance Rules

Always:

* Lazy load 3D models
* Dynamic import heavy modules
* Optimize renders
* Avoid unnecessary re-renders
* Keep mobile performance above 60 FPS when possible

---

## Accessibility

All interfaces should:

* Support keyboard navigation
* Have sufficient contrast
* Include ARIA labels
* Support screen readers where possible

---

## Folder Structure

src/
├── app/
├── components/
├── hooks/
├── services/
├── store/
├── types/
├── lib/
├── assets/
└── data/

---

## AI Assistant Context

The AI assistant must always know:

* Current selected object
* Current selected part
* Current animation state

Example:

Selected Object: Motorcycle Engine
Selected Part: Piston

User Question:
What is the function of this part?

The AI must answer based on the selected context.

---

## Expected Deliverables

* Responsive AR experience
* Interactive 3D model
* AI contextual assistant
* Voice interaction
* Object highlighting
* Animation explanations
* Clean architecture
* Production-ready code

