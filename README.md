# Tentwenty Timesheet

A simplified Timesheet Management application for the Tentwenty front-end developer assessment. The app uses dummy authentication, protected internal API routes, a responsive dashboard table, filters, pagination, and a local add/edit/delete flow for weekly task entries.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth credentials provider
- Formik for login validation
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Demo login:

```text
Email: john@tentwenty.com
Password: password123
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

- `src/app` - App Router pages and route handlers
- `src/components/auth` - Login screen components
- `src/components/dashboard` - Timesheet dashboard, filters, pagination, footer
- `src/components/layout` - Authenticated app shell and navbar
- `src/components/timesheets` - Table, detail page, task rows, menus, entry modal
- `src/components/ui` - Reusable form, modal, button, loader, and table primitives
- `src/hooks` - Client-side data and UI state hooks
- `src/lib` - Auth config, timesheet data/filter/status helpers, validation, UI utilities
- `src/types` - Shared TypeScript contracts

## Assumptions

- Authentication is intentionally dummy-only for the assessment.
- Timesheet list data is served through the internal `/api/timesheets` route.
- Weekly task add/edit/delete actions are local UI mutations. Refreshing restores the seeded data because no persistence API was provided.
- Status is derived from weekly hours: `completed` is 40 or more hours, `incomplete` is 1-39 hours, and `missing` is 0 hours.
- Date filters match any week that overlaps the selected range.

## Time Spent

Approximately 8-10 hours.
