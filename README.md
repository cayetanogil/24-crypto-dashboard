# 24 Crypto Dashboard

A responsive dashboard showcasing cryptocurrency market data with a focus on **clarity**, **interaction**, and **front-end architecture**.

It’s a single-page React application built with Vite, using Redux Toolkit for state management, React Router for navigation, and a Tailwind/Radix-based component system for the UI.

---

## Screenshot

<img width="635" height="400" alt="image" src="https://github.com/user-attachments/assets/33da43ef-efa7-418d-b7d7-8a13fd724ce1" />

<img width="635" height="400" alt="image" src="https://github.com/user-attachments/assets/71518144-c0e9-4cad-8931-cd011c25b210" />

---

## Features

- **Market overview** – High-level view of key assets with price, change, and volume at a glance.
- **Detail views with charts** – Individual asset pages with historical charts powered by Recharts.
- **Watchlist / collection view** – Mark assets as favorites and view them in a dedicated section.
- **Responsive layout** – Designed to work cleanly from desktop down to smaller viewports.
- **Polished UI & interactions** – Built with a Tailwind-based design system and Radix-powered components for dialogs, toasts, tooltips, and sheets.

---

## Tech Stack

- **Framework & tooling**
  - React
  - TypeScript
  - Vite

- **State & data**
  - Redux Toolkit
  - React Redux
  - Axios (API requests)

- **Routing**
  - React Router

- **Charts & visualization**
  - Recharts

- **Styling & components**
  - Tailwind CSS
  - Radix UI primitives (dialogs, selects, scroll areas, toasts, tooltips)

- **Developer experience**
  - TypeScript
  - ESLint
  - Prettier
  
---

## Architecture notes

- The app is structured as a **Vite + React + TypeScript** SPA, with React Router handling client-side navigation.
- **Redux Toolkit** centralizes market data and UI state, keeping data-fetching logic and derived state in one place.
- API access is wrapped behind **Axios** so the UI components receive already-shaped data rather than raw responses.
- The UI is built on **Tailwind CSS**, with a component layer powered by **Radix UI** primitives to keep styling consistent and maintainable.
- **Recharts** handles chart rendering for asset detail views, keeping chart logic separate from layout and state.

---

## Future improvements / ideas

Some directions this dashboard could evolve in:

- More advanced filtering and sorting (e.g. by market cap, sector, volatility).
- Additional chart types and time ranges for deeper analysis.
- User preferences (e.g. currency, theme) persisted across sessions.
- Alternative data sources or aggregation of multiple APIs for redundancy.
