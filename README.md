# Product Listing App

An Amazon-style product listing and detail page built with React, React Router, and the [DummyJSON Products API](https://dummyjson.com/docs/products).

## Setup Instructions

```bash
git clone <https://github.com/avinashkumar002/lee-assignment.git>
cd lee-assignment
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Assumptions Made

- The DummyJSON dataset (~194 products) is treated as the full product catalog for this app — no separate seed/mock data used.
- "Rating" in the UI refers to the `rating` field returned per product by the API.
- Reviews shown on the detail page use the `reviews` array returned per product by the DummyJSON API.
- The spec only explicitly requires brand filtering to support single/multi-select; category filtering was also implemented as multi-select (checkboxes) for UI/behavior consistency between the two filter types.
- The header search box filters products by title (case-insensitive substring match) — the spec didn't define search scope explicitly, so title-only matching was chosen as the simplest, most predictable interpretation.
- Empty price inputs are treated as "no constraint" rather than "0" — clicking Apply with both fields empty is a no-op by design, not a bug.
- A minimal landing page (`/`) with a dummy "Login" button was added before the product listing as a UX flourish. It performs no real authentication — clicking it simply navigates to `/products`. This screen is not part of the original two-screen spec.
- Pagination shown in the original detail page mockup was intentionally omitted — a single product page has nothing to paginate through, and it isn't listed as a requirement in the written spec. This is documented here as a deliberate deviation from the visual mockup, not an oversight.

## Architectural Decisions

- **Filtering & pagination — client-side, fetch-once approach:** All products are fetched once (`limit=0`) on load, then category, price, brand, and search filters are applied together in-memory, and pagination slices the already-filtered result set. This was chosen because DummyJSON has no single endpoint supporting combined category + price + brand filtering server-side, and the assessment explicitly requires filters to work together. At this dataset size (~194 products), fetching once is negligible overhead and gives instant, correct combined filtering. At production scale with a much larger catalog, this would move to server-side filtering via a search index (e.g. Elasticsearch/Algolia) rather than REST `limit`/`skip` pagination.

- **Component structure — flat, not atomic design:** Given the app is two-to-three pages with a modest component count, components are organized in a single flat `components/` folder rather than an atoms/molecules/organisms hierarchy. Components are split along actual reuse boundaries (e.g. `StarRating`, `Pagination`, `Button` are reused across multiple views) rather than by visual hierarchy for its own sake. Sub-pieces used only internally by one component (e.g. the price range inputs and category/brand list rendering inside `Filters`) are kept as local sub-components in the same file rather than extracted into separate files.

- **Filter state (including search) lives in the URL, not component state:** Category, brand, price range, search query, and current page are all derived from `useSearchParams` rather than `useState`. This was necessary because React Router unmounts `ProductListing` when navigating to `/product/:id`, which would otherwise wipe local filter state on remount — breaking the requirement that filters persist when returning from the detail page via Back. Using the URL as the single source of truth also makes filtered views shareable/bookmarkable as a side benefit.

- **Search participates in the same combined-filter logic as category/brand/price:** Rather than being a separate, disconnected feature, the search box filters the same `filteredProducts` memo alongside the other filters, so search + category + brand + price all combine with AND logic.

- **Back navigation uses `navigate(-1)` instead of a hardcoded route:** Combined with URL-synced filter state, this ensures returning from the detail page lands the user on the exact same filtered/paginated URL they came from.

- **Local price input state resets via the React `key` pattern, not an effect:** The price filter's Min/Max inputs need to reset to the URL's current values whenever `priceRange` changes externally (e.g. after Back navigation). Rather than syncing this with `useEffect` + `setState` (which triggers an extra render and is flagged by React's `set-state-in-effect` lint rule), the price inputs live in their own small component keyed on `${priceRange.min}-${priceRange.max}` — when that key changes, React remounts the component fresh with the correct initial state, with no synchronization effect needed.

- **Design tokens defined via Tailwind v4's `@theme` in CSS:** Colors, matching an Amazon-inspired palette (`#131921` navy header, `#ffd814` yellow CTA), are defined once in `index.css` rather than hardcoded per component, so the palette can be adjusted globally from a single source.

- **Collapsible filter sidebar behaves differently per breakpoint, deliberately:** Below the `lg` breakpoint, the sidebar is a fixed off-canvas drawer with a backdrop — the standard mobile filter pattern, since an overlay is the right choice when screen width is limited. At `lg` and above, it's an inline sidebar that animates `width` (with `overflow-hidden`) rather than overlaying content, so the product grid reflows smoothly alongside it instead of being hidden underneath a panel — appropriate once there's enough width for both to coexist.

- **Dynamic pagination with truncation:** Rather than rendering all page numbers (which becomes unusable at ~17 pages), pagination shows the first and last page as fixed anchors, with a sliding window of the current page and its immediate neighbors in between, using `...` to indicate skipped ranges. The button row also wraps on narrow screens rather than overflowing.

- **Responsive layout follows Tailwind's standard breakpoint scale throughout:** Product grid steps from 1 → 2 → 3 → 4 columns (`sm`/`lg`/`xl`); the detail page's image/content split collapses to a single stacked column below `md`; the header keeps a fixed hamburger → search → profile order at all widths, with the search input shrinking via `min-w-0` rather than wrapping or reordering.

## Improvements With More Time

- Add debounced live-typing for search and price min/max instead of filtering on every keystroke — cheap at ~194 products, but would matter at a larger dataset size.
- Add unit tests for the filtering logic (`filteredProducts` memo) and pagination window calculation.
