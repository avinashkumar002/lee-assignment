function Button({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) {
    const baseStyles = 'rounded-xl px-4 py-1.5 font-sm transition-colors w-full cursor-pointer'

    const variants = {
        primary: 'bg-accent text-accent-text hover:bg-accent-hover',
        secondary: 'bg-white text-gray-700 border border-border hover:bg-gray-50',
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button