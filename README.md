# Product Listing App

An Amazon-style product listing and detail page built with React, React Router, and the DummyJSON Products API.

## Setup Instructions

```bash
git clone https://github.com/avinashkumar002/lee-assignment.git
cd lee-assignment
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Assumptions Made

- The DummyJSON dataset (~194 products) is treated as the full product catalog for this app — no separate seed/mock data used.
- "Rating" in the UI refers to the `rating` field returned per product by the API.
- Reviews shown on the detail page use the `reviews` array returned per product by the DummyJSON API.

## Architectural Decisions

- **Filtering & pagination — client-side, fetch-once approach:** All products are fetched once (`limit=0`) on load, then category, price, and brand filters are applied together in-memory, and pagination slices the already-filtered result set. This was chosen because DummyJSON has no single endpoint supporting combined category + price + brand filtering server-side, and the assessment explicitly requires filters to work together. At this dataset size (~194 products), fetching once is negligible overhead and gives instant, correct combined filtering. At production scale with a much larger catalog, this would move to server-side filtering via a search index (e.g. Elasticsearch/Algolia) rather than REST `limit`/`skip` pagination.
- **Component structure — flat, not atomic design:** Given the app is two pages with a modest component count, components are organized in a single flat `components/` folder rather than an atoms/molecules/organisms hierarchy. Components are split along actual reuse boundaries (e.g. `StarRating`, `Pagination`, `Button` are reused across multiple views) rather than by visual hierarchy for its own sake.
