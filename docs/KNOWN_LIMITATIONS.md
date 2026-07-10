# Known Limitations

This document tracks current technical constraints and known limitations within the application.

## 1. Mock Data / Stateless Execution
- **Limitation:** The application currently runs entirely on the client-side with mock data arrays. State modifications (like adding a ticket) do not persist across hard browser refreshes.
- **Mitigation Plan:** Awaiting integration with the backend REST API.

## 2. WebSocket Stubbing
- **Limitation:** Real-time updates (e.g., another agent replying to a ticket) are currently simulated or non-functional.
- **Mitigation Plan:** Implement Socket.io or SignalR bindings in the presentation layer.

## 3. Large Dataset Rendering
- **Limitation:** The Ticket Explorer currently renders all items in memory.
- **Mitigation Plan:** Implement server-side pagination and infinite scrolling or windowing (e.g., `react-window`) on the client side for datasets exceeding 1,000 rows.

## 4. Email Thread Parsing
- **Limitation:** The system assumes clean markdown/text for ticket content. Raw email strings with nested HTML quotes are not yet parsed cleanly.
- **Mitigation Plan:** Integrate an email parsing service/library in the backend to sanitize inputs before sending to the frontend.
