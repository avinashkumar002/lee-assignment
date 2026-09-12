import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const PAGE_SIZE = 12

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const searchQuery = searchParams.get('q') ?? ''

  // Filter state derived directly from the URL 
  const selectedCategories = useMemo(
    () => searchParams.get('category')?.split(',').filter(Boolean) ?? [],
    [searchParams]
  )
  const selectedBrands = useMemo(
    () => searchParams.get('brand')?.split(',').filter(Boolean) ?? [],
    [searchParams]
  )
  const priceRange = useMemo(
    () => ({
      min: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null,
      max: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
    }),
    [searchParams]
  )
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=0'),
          fetch('https://dummyjson.com/products/categories'),
        ])

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setAllProducts(productsData.products)
        setCategories(categoriesData.map((c) => c.slug))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const brands = useMemo(() => {
    const uniqueBrands = new Set(allProducts.map((p) => p.brand).filter(Boolean))
    return Array.from(uniqueBrands).sort()
  }, [allProducts])

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesMinPrice = priceRange.min == null || product.price >= priceRange.min
      const matchesMaxPrice = priceRange.max == null || product.price <= priceRange.max
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.trim().toLowerCase())

      return matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice && matchesSearch
    })
  }, [allProducts, selectedCategories, selectedBrands, priceRange, searchQuery])

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, currentPage])

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        next.delete(key)
      } else {
        next.set(key, Array.isArray(value) ? value.join(',') : value)
      }
    })
    setSearchParams(next)
  }

  const handleCategoryChange = (category) => {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    updateParams({ category: next, page: null })
  }

  const handleBrandChange = (brand) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    updateParams({ brand: next, page: null })
  }

  const handlePriceApply = (range) => {
    updateParams({
      minPrice: range.min != null ? String(range.min) : null,
      maxPrice: range.max != null ? String(range.max) : null,
      page: null,
    })
  }

  const handlePageChange = (page) => {
    updateParams({ page: String(page) })
  }

  const handleSearchChange = (value) => {
    updateParams({ q: value || null, page: null })
  }

  return (
    <div>
      <Header
        onMenuClick={() => setIsFilterOpen((prev) => !prev)}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <div className="flex gap-6 p-6">
        <Filters
          isOpen={isFilterOpen}
          categories={categories}
          brands={brands}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          priceRange={priceRange}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onPriceApply={handlePriceApply}
        />

        <div className="flex-1">
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductListing