import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import StarRating from '../components/StarRating'
import ReviewCard from '../components/ReviewCard'
import Button from '../components/Button'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://dummyjson.com/products/${id}`)

        if (!res.ok) {
          throw new Error('Product not found')
        }

        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return (
    <>
      <Header searchValue="" onSearchChange={() => {}} />

      <div className="p-6">
        <div className="mx-auto max-w-5xl rounded-lg border border-border bg-surface p-8 shadow-sm">
          <Button variant="secondary" className="mb-6 w-auto" onClick={() => navigate(-1)}>
            ← Back
          </Button>

          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && product && (
            <div className="grid grid-cols-[2fr_3fr] gap-10">
              <div className="flex items-start justify-center">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-72 w-auto max-w-full object-contain"
                />
              </div>

              <div>
                <h1 className="mb-2 text-2xl font-bold text-text-primary">{product.title}</h1>

                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xl font-bold text-text-primary">${product.price}</span>
                  <StarRating rating={product.rating} />
                </div>

                <p className="mb-1 text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">Brand:</span> {product.brand}
                </p>
                <p className="mb-4 text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">Category:</span> {product.category}
                </p>

                <div className="mb-6 border-t border-border pt-4">
                  <h2 className="mb-2 text-lg font-bold text-text-primary">Description</h2>
                  <p className="text-sm text-text-secondary">{product.description}</p>
                </div>

                {product.reviews && product.reviews.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <h2 className="mb-2 text-lg font-bold text-text-primary">Reviews</h2>
                    {product.reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductDetail