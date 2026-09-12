function Header({ onMenuClick, searchValue, onSearchChange }) {
  return (
    <header className="flex items-center gap-4 bg-primary px-6 py-3 text-white">
      <button className="cursor-pointer" aria-label="Menu" onClick={onMenuClick}>
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

      <div className="w-full">
        <div className="flex-1 max-w-80 mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md border-none bg-white px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>
      </div>
      <a href="/" className="flex items-center justify-center">
        <button className="cursor-pointer" aria-label="Profile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.5h19.6v-2.5c0-3.3-6.5-4.9-9.8-4.9z" />
          </svg>
        </button>
      </a>
    </header>
  )
}

export default Header