import { useState } from 'react'
import Button from './Button'

const VISIBLE_LIMIT = 6

function formatLabel(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function FilterSection({ title, items, selected, onChange, formatItem }) {
  const [showAll, setShowAll] = useState(false)
  const visibleItems = showAll ? items : items.slice(0, VISIBLE_LIMIT)
  const hasMore = items.length > VISIBLE_LIMIT

  return (
    <div className="mb-6">
      <h3 className="mb-3 font-semibold text-text-primary">{title}</h3>
      <div className="flex flex-col gap-2">
        {visibleItems.map((item) => (
          <label key={item} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => onChange(item)}
            />
            <span>{formatItem ? formatItem(item) : item}</span>
          </label>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-2 cursor-pointer text-sm font-medium text-accent-text underline"
        >
          {showAll ? 'Show Less' : `View All (${items.length})`}
        </button>
      )}
    </div>
  )
}

function Filters({
  isOpen,
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onPriceApply,
}) {
  const [minPrice, setMinPrice] = useState(priceRange.min ?? '')
  const [maxPrice, setMaxPrice] = useState(priceRange.max ?? '')

  const handleApply = () => {
    onPriceApply({
      min: minPrice ? Number(minPrice) : null,
      max: maxPrice ? Number(maxPrice) : null,
    })
  }

  return (
    <aside
      className={`shrink-0 overflow-hidden rounded-lg bg-surface transition-all max-h-fit duration-300 ease-in-out ${
        isOpen ? 'w-64 border border-border p-4 opacity-100' : 'w-0 border-0 p-0 opacity-0'
      }`}
    >
      <div className="w-56">
        <h2 className="mb-4 text-lg font-bold text-text-primary">Filters</h2>

        <FilterSection
          title="Categories"
          items={categories}
          selected={selectedCategories}
          onChange={onCategoryChange}
          formatItem={formatLabel}
        />

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-text-primary">Price Range</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 rounded-md border border-border px-2 py-1.5 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 rounded-md border border-border px-2 py-1.5 text-sm"
            />
          </div>
          <Button onClick={handleApply} variant="primary" className="mt-3">
            Apply
          </Button>
        </div>

        <FilterSection
          title="Brands"
          items={brands}
          selected={selectedBrands}
          onChange={onBrandChange}
        />
      </div>
    </aside>
  )
}

export default Filters