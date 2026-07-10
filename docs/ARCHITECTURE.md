# Architecture

## Application Architecture
Flow Enterprise Support is built as a single-page application (SPA) using React 18, Vite, and TypeScript. It leverages an event-driven, component-based architectural pattern.

## Folder Structure
- `/src/components/`: Reusable UI elements (Buttons, Dropdowns, Inputs) and complex widgets (Drawers, Modals).
- `/src/pages/`: Top-level route components representing specific application views.
- `/src/types.ts`: Shared TypeScript interfaces and enums.
- `/docs/`: Living product documentation.

## Component Hierarchy
- **App Root:** Wraps the application with global providers (Router, Context).
- **Layouts:** Defines the global shell (Sidebar, Header, Main Content Area).
- **Pages:** Feature-specific containers orchestrating multiple components.
- **UI Components:** Stateless, highly reusable display components.

## Routing
Implemented using `react-router-dom`, structured with protected and public routes.

## State Management
Currently utilizing local component state (`useState`, `useReducer`). Future integration planned for global state management (e.g., Zustand or Redux) as complexity scales.

## Rendering Flow
Components follow standard React rendering lifecycles, with an emphasis on functional components and hooks to avoid unnecessary re-renders.
