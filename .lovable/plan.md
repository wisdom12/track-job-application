
# Job Application Tracker

A personal job search management app with local storage, dual view modes, and detailed application tracking.

## Core Features

### 1. Dashboard
- Summary stats at the top: total applications, by status (Applied, Interview, Offer, Rejected)
- Quick "Add Application" button

### 2. Add/Edit Application Form
- Fields: Company name, Role/Title, Status, Date Applied, Salary Range (min/max), Location, Contact Person, Job URL, Deadline, Interview Dates, Notes
- Form opens as a modal/drawer for quick entry

### 3. Kanban Board View
- Four columns: Applied → Interview → Offer → Rejected
- Cards show company, role, and date applied at a glance
- Drag-and-drop to move applications between statuses

### 4. Table/List View
- Sortable and filterable table with all application fields
- Click a row to view/edit details
- Quick status change via dropdown in the table

### 5. View Toggle
- Easy switch between Kanban and Table views, with your preference remembered

### 6. Application Detail View
- Full details panel/modal when clicking an application
- Edit all fields inline
- Notes section for keeping track of conversations, follow-ups, etc.
- Delete application option

### 7. Search & Filter
- Search by company or role name
- Filter by status

### 8. Local Storage Persistence
- All data saved to browser localStorage
- Data persists across page refreshes

## Design
- Clean, modern interface using the existing shadcn/ui component library
- Responsive layout that works on desktop and mobile
- Light color scheme (with dark mode support via existing setup)
