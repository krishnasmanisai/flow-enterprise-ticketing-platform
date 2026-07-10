# 📸 Screenshot Capture Guide

To ensure the GitHub repository looks like a premium SaaS product, all screenshots must be captured with strict consistency. Follow this guide to replace the placeholders in the `docs/screenshots` directory.

## General Capture Guidelines
- **Resolution:** Capture at exactly **1440x900** (Standard Desktop) unless specified otherwise.
- **Browser State:** Use a clean, chromeless window (e.g., Safari/Chrome without bookmarks bar). Hide cursor.
- **Zoom Level:** **100%** (Actual Size). Do not scale.
- **Theme:** Capture in **Light Mode** (default) to ensure contrast against GitHub's dark mode, unless demonstrating a specific dark mode feature.
- **Data Quality:** Use realistic, professional mock data. Do not use "test", "asdf", or "123".

---

## 1. Login (`login.png`)
- **Page:** `/` (Login route)
- **UI State:** Default state. Input fields should be empty, but browser autofill styles should be hidden.
- **Cropping:** Full screen window with subtle drop shadow on the application frame.

## 2. Forgot Password (`forgot-password.png`)
- **Page:** `/forgot-password`
- **UI State:** Email field filled with a realistic corporate email (`agent@acmecorp.com`).

## 3. Dashboard (`dashboard.png`)
- **Page:** `/dashboard`
- **UI State:** "Last 30 Days" selected in the Date Range Dropdown. Ensure the KPI cards show realistic numbers and the charts (if applicable) are fully rendered.

## 4. Ticket Explorer (`ticket-explorer.png`)
- **Page:** `/tickets`
- **UI State:** Multi-select filter drawer slightly open, or at least one filter pill active (e.g., "Status: Open"). Ensure the table is populated with at least 8-10 realistic tickets.

## 5. Ticket Detail (Standard) (`ticket-detail-standard.png`)
- **Page:** `/tickets/:id` (Pick a standard software bug ticket)
- **UI State:** Dual-pane view active. "Reply" box focused to show the Rich Text Editor toolbar. Ensure the timeline shows at least one internal note and one public reply.

## 6. Ticket Detail (Email) (`ticket-detail-email.png`)
- **Page:** `/tickets/:id` (Pick an email-originated ticket)
- **UI State:** Show how the system parses raw email blocks into the timeline. Highlight the original sender metadata block.

## 7. Create Ticket Drawer (`create-ticket.png`)
- **Page:** Any page, with the "Create Ticket" slide-out drawer active.
- **UI State:** Drawer open. Form partially filled with a realistic issue (e.g., "VPN Access Failure").

## 8. Tasks (`tasks.png`)
- **Page:** `/tasks`
- **UI State:** "Assigned to Me" tab active. Show linked ticket ID badges clearly on the task rows.

## 9. Internal Users (`internal-users.png`)
- **Page:** `/settings/users`
- **UI State:** Table of employees visible. Status badges (Active/Inactive) and Role badges (Admin/Agent) clearly displayed.

## 10. User Management Drawer (`user-management.png`)
- **Page:** `/settings/users`
- **UI State:** "Add User" drawer open on the right side. Form showing role selection dropdown.

## 11. Settings (`settings.png`)
- **Page:** `/settings`
- **UI State:** General settings view showing active tabs.

## 12. Responsive Tablet (`responsive-tablet.png`)
- **Resolution:** **768x1024** (iPad Portrait).
- **Page:** `/dashboard`
- **UI State:** Sidebar collapsed into icons. Grid adapting to 2 columns.

## 13. Responsive Mobile (`responsive-mobile.png`)
- **Resolution:** **390x844** (iPhone 14).
- **Page:** `/tickets/:id`
- **UI State:** Show the mobile-stacked view of the ticket detail. Sidebar completely hidden (hamburger menu visible).
