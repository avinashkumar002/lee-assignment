import { Link } from 'react-router-dom'

function Header({ onMenuClick, searchValue, onSearchChange }) {
  return (
    <header className="flex items-center gap-3 bg-primary px-4 py-3 text-white sm:gap-4 sm:px-6">
      <button className="cursor-pointer shrink-0" aria-label="Menu" onClick={onMenuClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-80 flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md border-none bg-white px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>
      </div>

      <Link to="/" className="flex shrink-0 items-center justify-center">
        <button className="cursor-pointer" aria-label="Profile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.5h19.6v-2.5c0-3.3-6.5-4.9-9.8-4.9z" />
          </svg>
        </button>
      </Link>
    </header>
  )
}

export default Header