# 🏗 System Architecture

Flow Enterprise Support is engineered for high performance, maintainability, and massive scalability. This document outlines the structural foundation of the platform.

---

## 1. High-Level Architecture

The platform operates as a decoupled Single Page Application (SPA). The frontend is strictly responsible for presentation, state management, and schema rendering, while relying on asynchronous API layers for persistence.

```mermaid
graph TD
    A[Client Browser] -->|HTTPS| B[Nginx / CDN Edge]
    B --> C[Vite React SPA]
    
    subgraph Frontend Architecture
    C --> D[React Router]
    D --> E[Page Components]
    E --> F[Feature Modules]
    F --> G[Shared UI Components]
    end
    
    subgraph State & Data Layer
    F <--> H[React Hooks / Context]
    H <--> I[Axios / Fetch Client]
    end
    
    I -->|REST / GraphQL| J[(Backend API Services)]
```

---

## 2. Dynamic Form Engine

To support multi-tenancy without altering the database schema or frontend code per client, Flow uses a Dynamic Form Engine.

```mermaid
sequenceDiagram
    participant User
    participant Component as TicketWorkspace
    participant Engine as FormRenderer
    participant API as Backend Schema API
    
    User->>Component: Opens Create Ticket
    Component->>API: Fetch Client-Specific Schema
    API-->>Component: Returns JSON Schema
    Component->>Engine: Pass Schema & Initial State
    Engine-->>User: Renders Custom Inputs (Text, Date, Select)
    User->>Engine: Fills Form & Submits
    Engine->>API: Post Flattened JSON Payload
```

---

## 3. Conversation Rendering Pipeline

Tickets contain interleaved events (public replies, internal notes, system changes). The rendering pipeline intelligently parses and formats these streams.

```mermaid
graph LR
    A[Raw Ticket Data] --> B{Data Type?}
    B -->|System Event| C[System Badge Component]
    B -->|Internal Note| D[Yellow Warning Canvas]
    B -->|Client Reply| E{Channel?}
    
    E -->|Portal Support| F[Markdown Renderer]
    E -->|Email Inbox| G[Email HTML Sanitizer]
    
    C --> H[Unified Ticket Timeline]
    D --> H
    F --> H
    G --> H
```

---

## 4. Authentication & RBAC Flow

Security is handled via JWT and mirrored in the frontend to proactively hide unauthorized UI elements.

```mermaid
flowchart TD
    A[User Visits Site] --> B{Has Valid JWT Token?}
    B -->|No| C[Redirect to /login]
    B -->|Yes| D[Fetch User Context & Permissions]
    D --> E{Check Route Access}
    
    E -->|Unauthorized| F[Render 403 / Redirect]
    E -->|Authorized| G[Render Route Component]
    
    G --> H{Component Level Checks}
    H -->|Admin Role| I[Show Settings Gear & Delete Buttons]
    H -->|Agent Role| J[Hide Settings, Show Reply Box]
```

---

## 5. Folder Structure & Component Hierarchy

Components follow a modified Atomic Design methodology.

```text
src/
├── components/
│   ├── ui/               # Atoms & Molecules (Buttons, Inputs, Badges)
│   ├── layout/           # Global shells (Sidebar, Header, Layout Wrappers)
│   └── shared/           # Cross-domain widgets (FilterDrawers, Pagination)
├── pages/                # Smart components representing full routing views
├── types/                # Global TypeScript definitions
└── utils/                # Pure functions, formatters, and helpers
```

## 6. State Management Strategy

- **Local State (`useState`):** Used for isolated UI interactions (dropdown toggles, hover states, immediate form inputs).
- **Complex Component State (`useReducer`):** Used for multi-step forms and complex ticket filtering criteria.
- **Global State:** Planned implementation via Context API / Zustand for global authentication state, theme preferences, and cross-tab synchronization.

---

## 7. Internal User Management Flow

The internal directory operates strictly under role-based logic.

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant AuthContext
    participant Backend

    Admin->>Frontend: Navigates to /settings/users
    Frontend->>AuthContext: Verify 'Admin' Role
    AuthContext-->>Frontend: Allowed
    Frontend->>Backend: GET /api/users
    Backend-->>Frontend: JSON User Array
    Frontend-->>Admin: Renders User Data Grid

    Admin->>Frontend: Clicks 'Deactivate User'
    Frontend->>Backend: PATCH /api/users/:id {status: inactive}
    Backend-->>Frontend: 200 OK
    Frontend-->>Admin: Updates UI & Shows Success Toast
```
