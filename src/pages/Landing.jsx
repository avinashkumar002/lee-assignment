import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="flex  flex-col gap-3 items-center justify-center p-6 border border-border rounded-lg ">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10"
        >
          <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.5h19.6v-2.5c0-3.3-6.5-4.9-9.8-4.9z" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-text-primary">Welcome, User!</h1>

      <Button onClick={() => navigate('/products')} variant="primary">
        Login
      </Button>
    </div>
    </div>
  )
}

export default Landing;