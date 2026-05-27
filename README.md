# Farlabs Frontend Test Task

Responsive implementation of the `API keys` page from the provided Figma design.

## Stack

- React 19
- TypeScript
- Vite
- CSS with design tokens
- MUI icons

## Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## What Is Implemented

- Desktop app shell with sidebar and `API keys` table
- Mobile shell with top header, bottom navigation, and tappable API key cards
- Interactive desktop rows with hover, focus, and selected states
- Interactive mobile cards with expand/collapse behavior
- Context actions for each key: `Edit`, `Disable`, `Delete`
- `Create API key` action backed by a mock repository
- Small bonus `Thinking` indicator preview inspired by the bonus task

## Project Structure

```txt
src/
  features/api-keys/
    api/
    components/
    hooks/
    model/
  pages/
  shared/
    layout/
    lib/
```

## Architecture Notes

- The UI talks to a repository interface instead of hardcoded component-local data fetching.
- Mock data is asynchronous on purpose, so the page already behaves like a backend-backed screen.
- Desktop and mobile views share the same domain model and action handlers.
- Layout primitives such as the sidebar and mobile chrome are separated from feature logic.

## Assumptions

- The task focuses on the `API keys` page itself, not full app routing.
- `Edit` is implemented as a lightweight rename flow to demonstrate a future mutation path.
- The mobile layout uses cards instead of a compressed table, matching the design intent.
- The bonus animation is intentionally small and reusable rather than a full chat screen recreation.

## Potential Next Steps

- Replace the mock repository with real HTTP requests
- Add integration tests for key mutations and responsive behavior
- Add a real create/edit modal flow with validation rules from product requirements
- Introduce routing and persisted navigation state if the rest of the app is in scope
