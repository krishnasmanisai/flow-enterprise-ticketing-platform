# Design System

Flow Enterprise Support utilizes a highly structured, utility-first design system powered by Tailwind CSS.

## Typography
- **Primary Font:** Inter (Sans-serif)
  - Used for all general UI, headings, and body copy.
- **Monospace Font:** JetBrains Mono
  - Used for technical data, timestamps, ticket IDs, and code blocks.

## Color Palette
- **Brand/Primary:** `brand-50` to `brand-900` (Indigo/Blue spectrum). `brand-500` is the primary action color.
- **Backgrounds:** `bg-page` (lightest gray), `bg-surface` (pure white for cards/modals).
- **Text:** `text-primary` (near black), `text-secondary` (dark gray), `text-muted` (medium gray).
- **Borders:** `border-subtle`, `border-default`, `border-strong`.
- **Status Colors:** Semantic usage of red (danger/high priority), yellow (warning/medium), green (success/low), blue (info).

## Spacing & Grid
- Adheres to an 8pt grid system.
- Standard padding for cards is `p-4` or `p-6`.
- Gaps between flex items are typically `gap-2` or `gap-4`.

## Components

### Buttons
- **Primary:** Solid brand background, white text.
- **Secondary/Outline:** Transparent background, border default, text primary.
- **Ghost:** Transparent background, no border, hover background surface.

### Inputs & Selects
- 36px height (`h-9`), rounded borders (`rounded-md`), muted placeholder text.
- Focus state applies a subtle ring to indicate active interaction.

### Cards & Tables
- Subtle border (`border-border-default`), rounded corners (`rounded-lg`), very light shadow (`shadow-sm`).
- Tables use `divide-y` to separate rows cleanly without excessive borders.

### Drawers & Dialogs
- **Drawers:** Slide in from the right. Used for complex filters or long-form data entry.
- **Dialogs:** Centered modals with a semi-transparent dark backdrop. Used for quick actions and confirmations.

## Animations
- Kept subtle and purposeful.
- Fade-ins for modals.
- `transition-colors` on all interactive elements (buttons, links, table rows).
