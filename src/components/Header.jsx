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

      <div className="flex-1">
        <input
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border-none px-4 py-2 text-text-primary focus:outline-none"
        />
      </div>

      <button className="cursor-pointer" aria-label="Cart">
        {/* svg unchanged */}
      </button>

      <button className="cursor-pointer" aria-label="Profile">
        {/* svg unchanged */}
      </button>
    </header>
  )
}

export default Header