# 🧠 Product Decisions & Architectural Trade-offs

Building a consumer-grade enterprise platform requires strict balancing between scalability, maintainability, and user experience. This log documents the major product and engineering decisions made during the development of Flow Enterprise Support.

---

### 1. Dynamic Form Engine
**Problem:** Every enterprise client requires unique metadata for their tickets (e.g., "Server ID" for DevOps vs. "Store Number" for Retail). Hardcoding these fields creates a rigid, unscalable database schema.
**Alternatives Considered:**
- Generic `custom_fields` JSONB blob with hardcoded frontend UI components.
- Separate frontend builds per client.
**Decision:** Implemented a schema-driven Dynamic Form Engine.
**Reason:** By passing JSON schemas from the backend to a React renderer, the UI dynamically constructs inputs (text, select, date) without requiring frontend engineering updates.
**Benefits:** Infinite scalability across verticals. Zero-code customization for admins.
**Trade-offs:** Slightly higher upfront engineering complexity and stricter type-safety requirements in the renderer.
**Future Improvements:** Add conditional logic (e.g., "If Category is Hardware, show Asset ID field").

---

### 2. Email Conversation Renderer vs. Standard Renderer
**Problem:** Support tickets originate from multiple channels. Standard portal tickets have clean, structured JSON payloads. Email-originated tickets arrive as messy, deeply nested HTML/Text strings with trailing signatures.
**Alternatives Considered:**
- Treat all replies as raw HTML blobs.
- Force all users to use the portal (block email).
**Decision:** Built distinct rendering pipelines (Standard Renderer vs. Email Renderer) within the Conversation Engine.
**Reason:** Emails require specific sanitization, blockquote collapsing, and signature stripping that would corrupt or over-complicate standard markdown portal replies.
**Benefits:** Preserves pristine UI for portal users while gracefully degrading for legacy email users.
**Trade-offs:** Maintaining two distinct visual parsers in the component tree.
**Future Improvements:** Implement machine learning to auto-summarize long, nested email threads into a single paragraph at the top of the ticket.

---

### 3. Ticket Workspace Layout (Dual-Pane)
**Problem:** In legacy ITSM tools, clicking a ticket opens a new page. Agents lose their place in the queue, resulting in "tab explosion" and high context-switching costs.
**Alternatives Considered:**
- Standard page navigation (List View -> Detail Page).
- Modal popups for ticket details.
**Decision:** Dual-Pane Slide-over Workspace.
**Reason:** Agents can browse the queue on the left while simultaneously reading the ticket details and replying on the right.
**Benefits:** Drastically reduces MTTR (Mean Time To Resolution). Keeps operational context intact.
**Trade-offs:** Requires strict responsive breakpoints; dual-pane is impossible on mobile, requiring a fallback stacking strategy.
**Future Improvements:** Allow users to collapse the left pane entirely for "Focus Mode."

---

### 4. Internal User Management (RBAC logic)
**Problem:** Support platforms inherently deal with sensitive PII and organizational data. A flat permission structure is a security risk.
**Alternatives Considered:**
- Simple "Admin vs User" boolean flags.
- Relying entirely on backend API rejections for security.
**Decision:** Granular Role-Based Access Control (RBAC) mirrored on the frontend.
**Reason:** The UI must proactively hide inaccessible features (e.g., the Settings gear) to prevent user frustration, while the backend acts as the ultimate security source of truth.
**Benefits:** Cleaner UI for lower-tier agents. Enterprise compliance readiness.
**Trade-offs:** Frontend routing and component rendering logic becomes more complex.
**Future Improvements:** Custom Role Builder (e.g., "Tier 1 Agent", "Billing Specialist").

---

### 5. Responsive Strategy
**Problem:** Enterprise tools are overwhelmingly used on desktop monitors, but field agents and managers increasingly require mobile access for approvals and quick replies.
**Alternatives Considered:**
- Desktop-only portal.
- Two separate codebases (React Web + React Native).
**Decision:** Desktop-first density, Mobile-first CSS structure using Tailwind.
**Reason:** Maintaining a single responsive SPA ensures feature parity. Tailwind's breakpoint prefixes (`md:`, `lg:`) allow us to write mobile-stacked layouts that progressively enhance into dense multi-column desktop grids.
**Benefits:** Single codebase. Immediate availability on all devices.
**Trade-offs:** Tables require complex responsive transformations (e.g., converting table rows to card blocks on mobile) to avoid horizontal scrolling nightmares.
**Future Improvements:** Dedicated mobile app via React Native for native push notifications.
