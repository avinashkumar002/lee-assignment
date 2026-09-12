import StarRating from './StarRating'

function ReviewCard({ review }) {
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <div className="mb-1 flex items-center gap-2">
        <span className="font-semibold text-text-primary">{review.reviewerName}</span>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm text-text-secondary">{review.comment}</p>
    </div>
  )
}

export default ReviewCard