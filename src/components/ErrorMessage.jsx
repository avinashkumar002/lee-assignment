function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
      <p className="font-semibold text-red-600">Something went wrong</p>
      <p className="text-sm text-text-secondary">{message}</p>
    </div>
  )
}

export default ErrorMessage