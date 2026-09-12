function Button({ children, onClick, variant = 'primary', type = 'button', className = '' }) {
    const baseStyles = 'rounded-xl px-4 py-1.5 font-small transition-colors w-full cursor-pointer'

    const variants = {
        primary: 'bg-accent text-accent-text hover:bg-accent-hover',
        secondary: 'bg-white text-gray-700 border border-border hover:bg-gray-50',
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button