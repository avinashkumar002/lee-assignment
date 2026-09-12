function StarRating({ rating, showValue = true }) {
  const clampedRating = Math.max(0, Math.min(5, rating))
  const percentage = (clampedRating / 5) * 100

  return (
    <div className="flex items-center gap-1">
      <div className="relative inline-flex text-lg leading-none">
        <div className="flex text-star-muted">
          <span>★★★★★</span>
        </div>
        <div
          className="absolute top-0 left-0 flex overflow-hidden whitespace-nowrap text-star"
          style={{ width: `${percentage}%` }}
        >
          <span>★★★★★</span>
        </div>
      </div>
      {showValue && (
        <span className="text-sm text-text-secondary">({clampedRating.toFixed(1)})</span>
      )}
    </div>
  )
}

export default StarRating