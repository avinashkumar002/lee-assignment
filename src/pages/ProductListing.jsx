import { useState, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const PAGE_SIZE = 12

function ProductListing() {
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState({ min: null, max: null })
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(true)

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

      return matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice
    })
  }, [allProducts, selectedCategories, selectedBrands, priceRange])

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, currentPage])

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
    setCurrentPage(1)
  }

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
    setCurrentPage(1)
  }

  const handlePriceApply = (range) => {
    setPriceRange(range)
    setCurrentPage(1)
  }

  return (
    <div>
      <Header onMenuClick={() => setIsFilterOpen((prev) => !prev)} />

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
                  onPageChange={setCurrentPage}
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