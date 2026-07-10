const fs = require('fs');
const path = require('path');

const docs = {
  'README.md': `# Flow Enterprise Support

## Project Overview
Flow Enterprise Support is a multi-tenant, enterprise-grade SaaS platform designed for comprehensive ticket tracking, task management, and team collaboration.

## Vision
To streamline support operations and project management through an intuitive, scalable, and customizable workspace.

## Features
- **Dashboard:** High-level metrics and date-range filtered reporting.
- **Ticket Explorer:** Advanced filtering, sorting, and management of support tickets.
- **Task Management:** Cross-project task tracking and assignment.
- **User Management:** Internal user administration and role-based access control.
- **Dynamic Workflows:** Customizable support workflows.

## Technology Stack
- **Frontend:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Routing:** React Router DOM

## Running Locally
\`\`\`bash
npm install
npm run dev
\`\`\`

## Architecture Summary
The application follows a modular, client-side React architecture (SPA). State is managed via React hooks, and the application is structurally divided into core pages, reusable UI components, and utility functions.
`,
  'docs/PRODUCT_REQUIREMENTS_DOCUMENT.md': `# Product Requirements Document (PRD)

## Goals
To provide a scalable, multi-tenant enterprise support and task management system that allows organizations to seamlessly track tickets, manage workflows, and collaborate on tasks.

## Requirements
- A robust dashboard for an overview of tickets and tasks.
- Advanced ticket management with filtering, categorization, and tracking.
- Role-based permissions for Internal Users vs. Clients.
- Workflow configuration engine.
- Dynamic report generation.
- Responsive design tailored for web, tablet, and mobile.

## Modules
- **Authentication:** Login, Forgot Password, Reset Password.
- **Dashboard:** High-level metrics, ticket counts, task summaries, date range filtering.
- **Tickets:** Ticket Explorer, My Tickets, Created By Me, Ticket Details, Create Ticket Flow.
- **Tasks:** Task listing, filtering, and assignment.
- **Settings & Management:** Internal Users, Team Management, Workflows.
- **Reporting:** Analytics and data export.

## Workflows
- **Ticket Lifecycle:** Open -> In Progress -> Waiting for Support -> Resolved -> Closed.
- **Task Assignment:** Creation -> Assignment -> Execution -> Review -> Done.
- **User Onboarding:** Admin invites -> User registers/logs in -> Role assignment.

## Permissions
- **Admin:** Full access to all modules, configurations, and user management.
- **Agent/Assignee:** Access to assigned tickets, tasks, and limited internal notes.
- **Client/Requestor:** Access to their created tickets, ability to add public comments.

## Functional Requirements
- Secure authentication.
- Real-time updates for notifications and ticket status.
- Markdown rendering for ticket descriptions and comments.
- Date range filtering across all analytical views.

## Non-functional Requirements
- **Performance:** Fast initial load and rendering.
- **Accessibility:** Ensure high contrast, keyboard navigation.
- **Scalability:** System supports enterprise loads.

## Success Metrics
- Reduction in average ticket resolution time.
- Increased user productivity.

## Future Scope
- AI-driven ticket categorization.
- Real-time collaborative features.
`,
  'docs/CHANGELOG.md': `# Changelog

## [0.8.0] - 2026-07-10

### Added
- Enterprise-grade Documentation Suite (/docs).
- README, PRD, Roadmap, Feature Catalog, and User Guide.

### Improved
- Fixed DateRangeDropdown integration in Dashboard and Tasks to correctly align filter state.

### Fixed
- Addressed missing import statements in Tasks.tsx.

### Changed
- Standardized Date Range filter usage.
`,
  'docs/ROADMAP.md': `# Roadmap

## Completed Features
- [x] Basic Routing Setup
- [x] Authentication Pages (Login, Reset Password)
- [x] Dashboard Layout and Metrics
- [x] Ticket Explorer and Details Page
- [x] Internal User Management
- [x] Date Range Dropdown Integration

## In Progress
- [ ] Enterprise Documentation Setup
- [ ] API Integration and Data Fetching
- [ ] Role-Based Access Control (RBAC) Enforcement

## Planned
- [ ] Dynamic Form Engine implementation
- [ ] Conversation Engine for Ticket comments
- [ ] Advanced Report Generation

## Future Ideas
- [ ] AI-Powered Ticket Summarization
- [ ] SLA Breach Prediction
- [ ] Multi-language Support
`,
  'docs/ARCHITECTURE.md': `# Architecture

## Application Architecture
Flow Enterprise Support is built as a single-page application (SPA) using React 18, Vite, and TypeScript. It leverages an event-driven, component-based architectural pattern.

## Folder Structure
- \`/src/components/\`: Reusable UI elements (Buttons, Dropdowns, Inputs) and complex widgets (Drawers, Modals).
- \`/src/pages/\`: Top-level route components representing specific application views.
- \`/src/types.ts\`: Shared TypeScript interfaces and enums.
- \`/docs/\`: Living product documentation.

## Component Hierarchy
- **App Root:** Wraps the application with global providers (Router, Context).
- **Layouts:** Defines the global shell (Sidebar, Header, Main Content Area).
- **Pages:** Feature-specific containers orchestrating multiple components.
- **UI Components:** Stateless, highly reusable display components.

## Routing
Implemented using \`react-router-dom\`, structured with protected and public routes.

## State Management
Currently utilizing local component state (\`useState\`, \`useReducer\`). Future integration planned for global state management (e.g., Zustand or Redux) as complexity scales.

## Rendering Flow
Components follow standard React rendering lifecycles, with an emphasis on functional components and hooks to avoid unnecessary re-renders.
`,
  'docs/DESIGN_SYSTEM.md': `# Design System

## Typography
- **Primary Font:** Inter (sans-serif) for high legibility and modern enterprise aesthetics.
- **Monospace Font:** JetBrains Mono for technical data, codes, and IDs.

## Color Palette
- **Brand/Primary:** Deep blue/indigo tones for actions.
- **Surface/Background:** Soft off-whites and deep charcoal grays (for dark mode).
- **Text:** High-contrast neutral grays.

## Spacing
- Utility-first spacing powered by Tailwind CSS. Adheres to an 8pt grid system.

## Components
- **Buttons:** Solid, Outline, Ghost, and Danger variants.
- **Inputs:** Clean borders, clear focus states.
- **Cards:** Subtle borders, no heavy drop shadows.
- **Drawers/Dialogs:** Right-side sliding drawers for complex filters/forms, centered dialogs for confirmations.

## Icons
- Exclusively using **Lucide React**.

## Responsive Behaviour
- **Mobile First:** Code structure prioritizes mobile constraints.
- **Desktop Enhanced:** Utilizes multi-column grids and expanded sidebars on larger viewports.
`,
  'docs/FEATURE_CATALOG.md': `# Feature Catalog

## 1. Dashboard
- **Purpose:** Provide a centralized overview of system health and metrics.
- **Description:** Displays ticket counts, task priorities, and SLA statuses filtered by a global date range.
- **User Roles:** Admin, Agent.
- **Status:** Implemented.

## 2. Ticket Explorer
- **Purpose:** Browse and manage all tickets.
- **Description:** A robust data table with sorting, pagination, and multi-select filtering.
- **User Roles:** Admin, Agent.
- **Status:** Implemented.

## 3. Ticket Details
- **Purpose:** Deep dive into a specific ticket's lifecycle.
- **Description:** Shows ticket metadata, conversation history, internal notes, and linked tasks.
- **User Roles:** Admin, Agent, Client.
- **Status:** Implemented.

## 4. Tasks Management
- **Purpose:** Track internal and project-specific tasks.
- **Description:** List view of tasks with assignees, priorities, and linked tickets.
- **User Roles:** Admin, Agent.
- **Status:** Implemented.

## 5. Internal Users
- **Purpose:** Manage system access.
- **Description:** Add, edit, and deactivate internal support staff.
- **User Roles:** Admin.
- **Status:** Implemented.
`,
  'docs/USER_GUIDE.md': `# User Guide

## Login
1. Navigate to the application root.
2. Enter your registered email and password.
3. Click "Sign In".

## Dashboard
The dashboard provides a high-level overview. Use the **Date Range** dropdown in the top right to filter metrics across the entire view.

## Creating Tickets
1. Navigate to **Tickets -> Create Ticket**.
2. Fill out the subject, description, priority, and assign it to a team or individual.
3. Click "Submit".

## Updating Tickets
1. From the **Ticket Explorer**, click on any ticket.
2. Update fields such as Status, Priority, or Assignee directly from the right sidebar.
3. Add a public comment or internal note using the conversation engine.

## Internal Users
Administrators can manage staff by navigating to **Settings -> Internal Users**. Here you can invite new members and manage roles.
`,
  'docs/DECISION_LOG.md': `# Decision Log

## Decision: Date Range Filter Implementation
- **Reason:** Users need a consistent way to filter analytical data across the Dashboard and Tasks modules.
- **Alternative Considered:** Individual date pickers per widget.
- **Rejected Because:** Causes inconsistent views and requires repetitive user actions.
- **Outcome:** Implemented a unified \`DateRangeDropdown\` component that standardizes filtering.

## Decision: Component Styling
- **Reason:** Need rapid development with consistent design patterns.
- **Alternative Considered:** SCSS Modules.
- **Rejected Because:** Slower to write, harder to maintain consistency across a large team compared to utility classes.
- **Outcome:** Adopted **Tailwind CSS**.
`,
  'docs/RELEASE_NOTES.md': `# Release Notes

## Version 0.8.0

### New Features
- **Enterprise Documentation:** Full living documentation suite created under \`/docs\`.
- **Date Range Filtering:** Standardized \`DateRangeDropdown\` integrated into Dashboard and Tasks.

### Enhancements
- Improved layout consistency and responsive design.

### Bug Fixes
- Fixed missing component imports in page modules.

### Known Issues
- Real-time WebSocket connection for ticket updates is currently stubbed.
`
};

for (const [filepath, content] of Object.entries(docs)) {
  fs.writeFileSync(filepath, content.trim() + '\n');
}

console.log('Documentation generated successfully.');
