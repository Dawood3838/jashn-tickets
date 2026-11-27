# Jashn Tickets

**Topic:** Event Ticketing

Jashn Tickets is a responsive event-discovery and ticket-booking frontend for the Islamabad and Rawalpindi area. It uses a mock event catalogue and in-memory booking records to demonstrate event browsing, ticket selection, booking validation, and confirmation flows.

The project is built with Next.js App Router and TypeScript. It does not use a backend, payment provider, database, or real ticket reservation system.

## Group Members

| Member | Roll Number |
| --- | --- |
| Muhammad Dawood | 24i0045 |
| Bilal Azher | 24i2022 |
| Ahmed Shahzad | 24i2086 |

## Technologies Used

- Next.js 16.4.6 with App Router
- React 19.3.0
- TypeScript 5
- Tailwind CSS 4.3.3
- React Server Components and Client Components
- Next.js Metadata API
- `next/image` and `next/link`
- ESLint 9 with Next.js configuration
- npm and `package-lock.json`

No backend or external state-management library is used.

## Main Features

- Mock catalogue of events in Islamabad and Rawalpindi
- Search across event titles, descriptions, tags, venues, and cities
- Category, city, availability, featured-event, and inclusive date-range filters
- Date and starting-price sorting
- Combined filtering with live result counts and empty-results handling
- Category links that use URL query parameters
- Dynamic event-detail pages with ticket availability
- Ticket quantity selection and validation
- Controlled booking form with attendee information validation
- Correct subtotal and total price calculation
- In-memory booking creation and generated booking references
- Booking confirmation lookup and invalid-reference handling
- Support page FAQ using native expandable details
- Custom loading and 404 routes
- Responsive navigation, cards, forms, grids, and footer
- Typed reusable components and meaningful stable list keys

## Installation and Local Development

Requirements:

- Node.js 20 or newer
- npm

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

Available scripts:

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

`npm run start` requires a completed production build from `npm run build`.

## Available Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage, featured events, categories, and navigation |
| `/events` | Searchable event catalogue and filters |
| `/events/[id]` | Dynamic event detail, ticket availability, and ticket selection |
| `/booking` | Ticket review and attendee information form |
| `/confirmation` | Lookup and display of an in-memory booking |
| `/support` | Support information and FAQ |
| Unmatched URL | Custom 404 page |

Example dynamic routes:

- `/events/echoes-under-the-stars`
- `/events/future-forward-pakistan`
- `/events/capital-cricket-cup`

Unknown event IDs call Next.js `notFound()` and display the custom not-found page.

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    booking/
    confirmation/
    events/
      loading.tsx
      page.tsx
      [id]/page.tsx
    support/
  components/
  data/
  lib/
  types/
public/
  images/
  favicon.ico
```

- `src/app/` contains App Router pages and route-level loading and not-found UI.
- `src/components/` contains typed reusable interface components.
- `src/data/` contains the mock event catalogue and in-memory booking repository.
- `src/lib/` contains discovery, booking, confirmation, and management utilities.
- `src/types/` contains shared event and booking types.

## Development Divisions and Contributions

| Member | Division | Responsibilities |
| --- | --- | --- |
| Muhammad Dawood — 24i0045 | Division 1 | Established the Next.js design system and shared layout; implemented responsive navigation, homepage, event discovery UI, reusable visual components, and the Jashn Tickets visual identity. |
| Bilal Azher — 24i2022 | Division 2 | Established mock event and booking data architecture; implemented event search, filtering and sorting, ticket selection and booking logic, and booking management and confirmation utilities. |
| Ahmed Shahzad — 24i2086 | Division 3 | Integrated event discovery and booking pages and components, including dynamic event details, booking forms, confirmation UI, and final application flow. |

The branch and commit history supports this division allocation: `division-1-frontend`, `division-2-functionality`, and `division-3-integration`.

## Repository

GitHub Repository: [https://github.com/Dawood3838/jashn-tickets](https://github.com/Dawood3838/jashn-tickets)

## Vercel
Vercel Deployment: [https://jashn-tickets-hdo6.vercel.app](https://jashn-tickets-hdo6.vercel.app/)

## Submission Links

- Vercel deployment: **[PLACEHOLDER - add the deployed Vercel URL before submission]**
- Video demonstration: **[PLACEHOLDER - add the recorded demonstration URL before submission]**

## AI Tools Disclosure

AI tools were used as development support for implementation guidance, debugging, code review, documentation, and repository preparation. Final source files and project behavior were verified through repository inspection, linting, TypeScript checking, production builds, and local smoke testing. AI assistance did not replace manual project implementation or submission review.

## Validation and Submission Notes

Before submission, verify that:

- `npm run lint` passes
- `npx tsc --noEmit` passes
- `npm run build` passes
- The 404 page appears for unknown URLs and invalid event IDs
- Booking and confirmation flows remain in-memory and do not represent real transactions
- `node_modules/` and `.next/` are excluded from the submission archive
