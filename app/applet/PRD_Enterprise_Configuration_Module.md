# Product Requirements Document (PRD)

## 1. Document Information
- **Title:** Enterprise Configuration Platform (Metadata-Driven Ticketing)
- **Author:** Senior Product Manager
- **Version:** 1.0
- **Status:** Final / Approved for Implementation
- **Date:** 2026-07-26
- **Module:** Configuration Module (Settings Hub)
- **Approvers:** Head of Product, Lead Architect, VP of Engineering

## 2. Problem Statement

### Current System
Currently, the Enterprise Support Ticketing Platform relies on hardcoded Projects, Request Types, and Forms. Every form is a distinct component in the codebase.

### Current Pain Points
- **Engineering Dependency:** Operations teams cannot independently deploy a new ticketing flow. Even adding a simple dropdown option or modifying a form field label requires an engineering ticket, a PR, QA, and a full deployment cycle.
- **Operational Challenges:** Turnaround time for basic administrative changes takes days to weeks, bottlenecking IT, HR, and Finance operations.
- **Scalability Issues:** As the organization grows, the number of request types scales linearly with engineering maintenance overhead. Duplicate logic across hundreds of forms leads to a bloated codebase.
- **Business Impact:** High total cost of ownership (TCO) and severe lack of agility. Operations teams often bypass the system due to inflexibility, resulting in shadow IT and fragmented processes.

## 3. Objective

### Business Goals
- Eliminate engineering bottlenecks for standard form and ticket configuration.
- Reduce time-to-market for new service desk offerings from weeks to hours.
- Lower platform maintenance costs.

### Product Goals
- Deliver a no-code/low-code metadata-driven configuration engine.
- Ensure all form fields, data sources, and hierarchical relationships are completely modular and reusable across the entire platform.
- Provide a consumer-grade, visually intuitive configuration experience for non-technical operations administrators.

### Operational Goals
- Empower administrators to configure 100% of the intake experience.
- Ensure high data integrity and configuration hygiene via centralized management (e.g., updating a Data Source updates all referencing forms).

### Success Criteria
- Time to create a new Request Type with a 10-field form is < 15 minutes.
- 0 engineering tickets required for form modifications post-launch.
- 80%+ field and data source reusability rate across newly created forms.

### Non-Goals
- Complex back-end workflow logic and automation builders (reserved for future milestones).
- Advanced programmatic API-based datasets (starting with static/CSV-based data sources).
- End-user facing portal redesign (this focuses exclusively on the admin configuration).

## 4. Scope

### In Scope
- Projects Configuration
- Request Types Configuration
- Field Library (Centralized, Reusable Fields)
- Data Sources (Reusable Datasets)
- Relationships (Visual Hierarchy Builder for dependent fields)
- Form Builder (Drag-and-drop canvas, properties panel, layout management)
- Form Templates (Save and import reusable form structures)

### Out of Scope
- Workflow & Approvals Builder
- Dynamic API lookups for Data Sources
- Role-Based Access Control (RBAC) at the field level
- Multi-language/Localization support

### Future Enhancements
- Version Control & Audit Logs for form changes
- Configuration Sandbox & Staging environments
- Complex conditional visibility rules (cross-field logic)

## 5. Existing User Flow

The current ticket creation flow is statically bound:
**Project -> Request Type -> Hardcoded Form Component -> Ticket Creation**

*Why this is difficult to maintain:*
Because the form is a hardcoded component, its schema is statically typed in the frontend and backend. Changing a field requires a database schema migration (if not using EAV/NoSQL), frontend component modification, and backend validation updates.

## 6. Proposed User Flow

The new architecture decouples the definition from the execution. It uses a metadata-driven approach:

**Admin Configuration Flow:**
**Projects -> Request Types -> Form Builder -> Reusable Fields -> Reusable Data Sources -> Relationships -> Conditional Rules -> Generated Request Form Blueprint**

**End-User Execution Flow:**
**End User selects Request Type -> System fetches Form Blueprint -> Renders Dynamic Form -> Submits JSON Payload -> Ticket Created**

*Diagram Illustration (Mental Model):*
```text
[Field Library] \
[Data Sources]   -----> [Form Builder Canvas] -----> [Request Type] -----> [Project]
[Relationships] /
```

## 7. Module Breakdown

### 7.1 Projects
- **Purpose:** Top-level organizational buckets for Request Types (e.g., IT Support, Finance, Marketing).
- **Responsibilities:** Group request types, maintain high-level reporting categorization.
- **User Stories:** As an admin, I want to create a new Project so I can group related Request Types together.
- **Navigation:** Settings -> Projects
- **UI Components:** Grid view of Project cards, "New Project" modal drawer.
- **Validation:** Project name must be unique.
- **Dependencies:** Request Types must belong to a Project.

### 7.2 Request Types
- **Purpose:** Defines the specific category of a ticket and links to a specific intake form.
- **Responsibilities:** Acts as the bridge between the high-level Project and the low-level Form.
- **User Stories:** As an admin, I want to define a Request Type (e.g., "Software Access") and attach a custom form to it.
- **Dependencies:** Belongs to a Project; owns exactly one Form Blueprint.

### 7.3 Field Library
- **Purpose:** A centralized repository of reusable fields.
- **Responsibilities:** Define global fields (e.g., "Cost Center", "Priority") that can be dragged into any form.
- **User Stories:** As an admin, I want to define a "Target Date" field once and reuse it across 50 different forms so that reporting is standardized.
- **Dependencies:** May depend on Data Sources (for dropdowns).
- **Future Scope:** Global field versioning.

### 7.4 Data Sources
- **Purpose:** Centralized repository of reusable list values.
- **Responsibilities:** Store options for Dropdowns, Multi-selects, Radio buttons, etc.
- **User Stories:** As an admin, I want to upload a CSV of 195 countries once, and use it in multiple forms without retyping it.
- **Actions:** Add Row, Remove Row, Update Row, Import CSV, Search, Duplicate, Export.

### 7.5 Relationships
- **Purpose:** Manage dependent dropdowns and hierarchical data visually.
- **Responsibilities:** Provide a visual tree builder to map parent-child relationships (e.g., Region -> Country -> City).
- **User Stories:** As an admin, I want to map "Hardware" as a child of "IT Support" so users only see relevant sub-categories.

### 7.6 Form Builder
- **Purpose:** The visual drag-and-drop canvas where fields are assembled into a functional form.
- **Responsibilities:** Manage layout, field ordering, and form-level field overrides.
- **User Stories:** As an admin, I want to drag a "Priority" field onto the canvas and make it "Required" only for this specific form.
- **UI Components:** Left Toolbox (Field Library, Layouts), Center Canvas, Right Properties Panel.

### 7.7 Form Templates
- **Purpose:** Accelerate form creation.
- **Responsibilities:** Allow admins to save a built form as a template and instantiate it later.

---

## 8. Field Library

The Field Library is strictly for defining *reusable* fields. Fields are entirely decoupled from forms.

### Configurable Properties (Global)
- **Name:** Human-readable label (e.g., "Budget Amount").
- **Internal Key:** Unique identifier used for API and reporting (e.g., `budget_amt`).
- **Category:** Folder grouping (e.g., Finance, HR).
- **Description:** Admin-facing notes.
- **Field Type:** The structural data type.

### Supported Field Types
- **Short Text:** Single line. Properties: Min/Max length, Regex.
- **Long Text:** Multi-line textarea. Properties: Min/Max length.
- **Rich Text:** WYSIWYG editor.
- **Number:** Numeric input.
- **Currency:** Numeric input with currency symbol masking.
- **Percentage:** Numeric input bounded 0-100 (or custom) with % formatting.
- **Email:** Standard email validation.
- **Phone:** Standard phone masking.
- **URL:** Standard URL validation.
- **Dropdown:** Single select. Sourced manually or from a Data Source.
- **Multi Select Dropdown:** Multiple select.
- **Radio Buttons:** Exposed single select.
- **Checkboxes:** Exposed multi select.
- **Toggle:** Boolean true/false.
- **Date:** Calendar picker.
- **Date Time:** Calendar + Time picker.
- **Time:** Time picker.
- **File Upload:** Single file. Properties: Allowed extensions, Max size.
- **Multiple File Upload:** Multi file. Properties: Max files.
- **Image Upload:** Restricts to image MIME types.
- **User Picker:** Autocomplete from organization directory.
- **JSON:** Code editor for JSON payloads.
- **Table:** Grid input.
- **Label:** Simple text display.
- **Divider:** Layout element.
- **Heading:** Layout element.
- **Section:** Layout element.

### Reusable Behavior & Overrides
When a field is dragged onto a form, it establishes a *reference*.
Administrators can *override* certain properties contextually within the Form Builder (e.g., changing the label from "Target Date" to "Expected Delivery Date", or making it Required). The Internal Key remains immutable, ensuring data normalization across the platform.

---

## 9. Data Sources

Rename "Datasets" to "Data Sources". This module stores reusable, flat-list values.

### Core Capabilities
- **Manual Lists:** Admins can manually add, edit, and remove rows.
- **CSV Import:** Bulk upload list values.
- **Search & Duplicate:** Quickly find and clone data sources.
- **Export:** Export values to CSV.
- **Usage Tracking:** Displays exactly which fields utilize the data source.
- **Difference from Fields:** A Field is the *input mechanism* (e.g., "Country Select Dropdown"). A Data Source is the *data payload* (e.g., the list of 195 countries).

---

## 10. Relationships

Creates dependent dropdowns via a Visual Hierarchy Builder, eliminating spreadsheet-based parent/child mapping.

### Key Concepts
- **Hierarchical Relationships:** A structured tree of nodes mapping dependent values.
- **Relationship Levels:** Defined linearly (e.g., `Country -> State -> City`).
- **Visual Builder:** Admins add "Root Nodes" (e.g., USA) and "Child Nodes" (e.g., California -> San Francisco).
- **Interactions:** Expand/Collapse tree nodes, Duplicate, Search, Preview, Validate.

### Examples
**Example 1: IT Service Catalog**
`Request Type -> Sub Request Type -> Service Type`
- Support
  - POS
    - Hardware
  - API
    - OAuth

**Example 2: Location**
`Country -> State -> City`
- USA
  - California
    - San Francisco

Relationships are maintained separately from forms so they can be reused. A single "Location Hierarchy" relationship can be attached to an Onboarding Form, a Hardware Request Form, and an Incident Form simultaneously.

---

## 11. Form Builder

The enterprise-grade visual configuration interface for forms.

### Layout & Canvas
- **Drag & Drop:** Fields can be dragged from the Left Toolbox onto the Center Canvas.
- **Sections:** Group fields logically. Supports collapsible states.
- **Two-Column Grids:** Fields can be set to Full Width, Half Width, One Third, or Two Thirds.
- **Decorative Elements:** Headings, Dividers, Instructional Text.
- **Field Interactions:** Hover states, selection states, drag handles, duplicate, delete, and move tools.

### Properties Panel (Contextual Overrides)
When a field is selected on the canvas, the right-side Properties Panel opens.
Admins can modify:
- **Label Override:** Contextual label for this form.
- **Placeholder & Help Text:** Contextual guidance.
- **Validation Rules:** Required, Min/Max lengths, Regex.
- **Visibility:** Hidden, Read Only.
- **Default Values:** Pre-populated values.

### Preview Mode
- Accurate rendering of the form exactly as the end-user will see it in the Customer Portal.
- Support for Device toggling (Desktop, Tablet, Mobile).
- Active validation execution during preview.
- Testing of conditional rules, visibility, and mandatory field requirements.

---

## 15. User Journeys

### Journey: Build a new "Hardware Request" Form
1. Admin navigates to **Settings -> Projects**. Creates project "IT Support".
2. Navigates to **Request Types**. Creates "Hardware Request" inside "IT Support".
3. Clicks "Continue to Form Builder".
4. Opens **Field Library** left panel. Drags existing fields: "Employee Name", "Cost Center".
5. Realizes they need a "Device Type" field. Clicks "New Field" in the library panel.
6. Configures "Device Type" as a Dropdown, links it to a new **Data Source** ("Device Catalog").
7. Drags "Device Type" onto the canvas.
8. Selects "Cost Center" on the canvas, uses the **Properties Panel** to mark it as Required.
9. Clicks **Preview** to verify the form looks correct on Mobile.
10. Clicks **Save**. The Request Type is now live.

### Journey: Create Relationship for Onboarding
1. Admin navigates to **Settings -> Relationships**. Creates "Department Hierarchy".
2. Adds hierarchy levels: `Division -> Department -> Team`.
3. Adds Root Node "Engineering". Adds Child "Backend". Adds Sub-child "Platform".
4. Previews the dependent dropdowns.
5. Goes to **Form Builder** for "Onboarding Form" and maps a Dropdown to this Relationship.

---

## 16. Functional Requirements

- **FR-001 [Projects]:** The system SHALL allow admins to create, read, update, and deactivate Projects.
- **FR-002 [Request Types]:** The system SHALL allow admins to associate a Request Type with one specific Project and one Form Blueprint.
- **FR-003 [Field Library]:** The system SHALL provide a centralized Field Library supporting all distinct field types listed in Section 8.
- **FR-004 [Data Sources]:** The system SHALL allow admins to create Data Sources via manual entry or CSV upload.
- **FR-005 [Relationships]:** The system SHALL provide a Visual Hierarchy Builder for multi-level dependent dropdowns.
- **FR-006 [Form Builder]:** The system SHALL support drag-and-drop placement of fields onto a visual canvas with layout capabilities (sections, columns).
- **FR-007 [Form Builder]:** The system SHALL allow admins to apply form-specific overrides to global fields without altering the global definition.
- **FR-008 [Usage Tracking]:** The system SHALL display usage counts and linked entity names for all Fields, Data Sources, Templates, and Relationships.
- **FR-009 [Preview]:** The system SHALL provide a preview mode simulating Desktop, Tablet, and Mobile views.

---

## 17. Business Rules

- **BR-001:** A Field cannot be deleted if it is actively used in one or more saved Forms.
- **BR-002:** A Data Source cannot be deleted if it is linked to an active Field.
- **BR-003:** An Internal Key for a Field is immutable once saved. It must conform to `snake_case` alphanumeric standards.
- **BR-004:** Relationship cycles (circular dependencies) are strictly prohibited.
- **BR-005:** Form Overrides strictly supersede Global Field definitions at runtime.
- **BR-006:** A Relationship cannot be deleted while used in published forms.

---

## 18. Validations

- **Field Level:** Regex patterns must be valid JavaScript regex. Min length cannot exceed Max length.
- **Form Level:** A form must contain at least one field before publishing.
- **Relationship Level:** A child node cannot exist without a parent node.
- **Data Source Level:** Options within a single Data Source must be unique (no duplicate strings).
- **Publishing Validations:** Ensures all referenced fields, datasets, and relationships exist and are active.

---

## 19. Error Handling

- **Missing Data Source:** If a Field references a Data Source that has been corrupted or archived, the Form Builder shall display a warning banner, and the field will default to an empty state in the preview.
- **Cyclic Drops:** The Drag-and-Drop system shall visually reject drops that violate layout bounds (e.g., dropping a Section inside a Section if nesting is unsupported).
- **Invalid Relationships:** The system shall flag and highlight any broken relationship links in forms.

---

## 20. Edge Cases

- **Changing Field Type:** If an admin attempts to change a global field's Type (e.g., Short Text to Date) after it has been used in forms, the system must block the action to prevent data corruption. A new field must be created instead.
- **Orphaned Form Overrides:** If a global field's default property is updated, forms that have *overridden* that specific property retain their override. Forms that use the default inherit the new global property.
- **Deep Hierarchies:** Relationships exceeding 5 levels deep may cause UX degradation on mobile forms. The system should warn admins if relationships exceed 5 levels.
- **Deleted Reference Warning:** In the Usage panel, if an associated entity was deleted unexpectedly, display an "Orphaned Reference" tag.

---

## 21. Acceptance Criteria

- **Given** an admin is in the Field Library, **When** they attempt to delete a field used in "Form A", **Then** the system prevents deletion and displays a modal listing "Form A" as the blocker.
- **Given** an admin is building a form, **When** they drag a "Short Text" field into a "Two Column Grid", **Then** the field dynamically resizes to fill exactly 50% of the canvas width.
- **Given** an admin configures a Relationship, **When** they add a child node to "USA", **Then** the child node appears visually nested beneath "USA" in the tree builder.
- **Given** an admin opens the Form Builder Preview, **When** they switch to Mobile view, **Then** the form responds immediately to the 375px breakpoint constraints.

---

## 22. Success Metrics

- **Configuration Time:** Reduce average time to deploy a new Request Type to < 15 minutes.
- **Developer Dependency:** Achieve 0 engineering hours logged for standard form configurations per quarter.
- **Reuse %:** > 80% of fields on new forms are dragged from the Field Library rather than created net-new.
- **Admin Adoption:** DAU/MAU of the Settings Hub by Operational Administrators.
- **Error Rate:** Track form validation and submission errors originating from misconfiguration.

---

## 23. Future Roadmap

- **API-Backed Data Sources:** Connect dropdowns directly to external REST APIs (e.g., fetch Jira Projects, Salesforce Accounts).
- **Workflow & Approval Builder:** Visual node-based builder for defining SLA routing and multi-stage approvals.
- **Localization:** Translate Field Library labels dynamically based on end-user locale.
- **Version Comparison:** Audit trail of form changes with side-by-side diffing.
- **Configuration Sandbox:** Push/Pull configuration changes between a Sandbox and Production environment.
