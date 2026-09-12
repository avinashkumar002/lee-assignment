import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'

function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mb-3 h-40 w-full object-contain"
      />
      <h3 className="mb-1 truncate font-semibold text-text-primary">{product.title}</h3>
      <div className="mb-1 text-lg font-bold text-text-primary">${product.price}</div>
      <StarRating rating={product.rating} />
    </div>
  )
}

export default ProductCard