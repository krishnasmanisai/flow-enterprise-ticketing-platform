# Decision Log

## Decision: Date Range Filter Implementation
- **Reason:** Users need a consistent way to filter analytical data across the Dashboard and Tasks modules.
- **Alternative Considered:** Individual date pickers per widget.
- **Rejected Because:** Causes inconsistent views and requires repetitive user actions.
- **Outcome:** Implemented a unified `DateRangeDropdown` component that standardizes filtering.

## Decision: Component Styling
- **Reason:** Need rapid development with consistent design patterns.
- **Alternative Considered:** SCSS Modules.
- **Rejected Because:** Slower to write, harder to maintain consistency across a large team compared to utility classes.
- **Outcome:** Adopted **Tailwind CSS**.
