# Tentwenty Timesheet

A simplified SaaS-style Timesheet Management application for the Tentwenty front-end developer assessment. It includes dummy NextAuth credentials login, an authenticated dashboard, internal API routing, responsive timesheet table controls, pagination, sorting, and local weekly task add/edit/delete interactions.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- NextAuth with JWT sessions
- React Hook Form and Zod for login validation
- Formik is kept as an installed dependency per project preference
- Lucide React icons
- Vitest and Testing Library

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Demo credentials:

```text
Email: john@tentwenty.com
Password: password123
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Environment Variables

For local development, the app falls back to a development secret. For production, set:

```text
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
```

## Folder Structure

```text
src/
  app/          Next.js routes and API route handlers
  components/   Domain and reusable UI components
  constants/    Static app constants and seeded assessment data
  hooks/        Client-side state and data hooks
  lib/          Auth, API client, and validation infrastructure
  services/     API/service boundaries and local mutation helpers
  types/        Shared TypeScript contracts
  utils/        Pure reusable utility functions
```

Component organization:

```text
components/
  auth/
  dashboard/
  layout/
  timesheets/
  ui/
```

`ui` contains generic reusable components only. Feature-specific behavior stays in the matching domain folder.

## Architecture Notes

- Pages stay thin and preserve the App Router route structure.
- Client components do not call `fetch` directly. Timesheet loading goes through `services/timesheet.service.ts`, which uses the shared API client.
- Auth session access is centralized in `lib/auth/session.ts`.
- Login validation has a single Zod schema in `lib/validations/login.ts`, reused by both the form and credentials authentication.
- Timesheet status and filtering rules are pure utilities, making the business rules easy to test and reuse.
- Weekly task add/edit/delete behavior is intentionally local UI state because no persistence API was provided.

## Assumptions

- `completed` means 40 or more hours.
- `incomplete` means 1-39 hours.
- `missing` means 0 hours.
- Date filters include every week that overlaps the selected date range.
- Refreshing the detail page restores seeded weekly task data.

## Tests

Basic coverage exists for:

- Button
- Modal
- TimesheetTable

Run:

```bash
npm run test
```

## Future Improvements

- Add real persistence endpoints for task add/edit/delete.
- Expand tests around auth validation and timesheet filtering.
- Add optimistic update rollback once real API mutations exist.
- Replace seeded constants with API-backed data when available.
