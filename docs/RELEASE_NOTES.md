# Release Notes

## Version 0.8.0 - "Enterprise Documentation Update"

**Date:** July 10, 2026

We are excited to announce version 0.8.0, bringing massive improvements to product documentation, architectural transparency, and global filtering consistency.

### 🌟 New Features
- **Comprehensive Documentation Suite:** A completely new `/docs` directory acting as a living product wiki. Includes PRDs, Feature Catalogs, and Design System guidelines.
- **Product Landing Page:** A fully redesigned `README.md` aimed at technical recruiters and product leaders.

### 🛠 Enhancements
- **Global Date Range Filter:** Standardized the `DateRangeDropdown` component, ensuring it is perfectly integrated into the Dashboard and Tasks modules for accurate analytical context.
- **Mobile Responsiveness:** Enhanced padding and layout structures on mobile viewports for the Settings and Client Configuration pages.

### 🐛 Bug Fixes
- Fixed missing Lucide React imports in `Tasks.tsx` that prevented successful production builds.
- Resolved an issue where mobile tables overflowed horizontally without proper scrolling context.

### 🚧 Known Issues
- Data persistence is still local to the session.
- Real-time notifications are currently disabled pending API integration.
