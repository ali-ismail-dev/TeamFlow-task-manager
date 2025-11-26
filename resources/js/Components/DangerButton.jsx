export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-2 focus:ring-offset-[#161B22] hover:scale-105 active:scale-95 ${
                    disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
                } ` + className
            }
            style={{
                backgroundColor: disabled ? '#374151' : '#EF4444',
                backgroundImage: disabled ? 'none' : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            }}
            disabled={disabled}
        >
            <span className="flex items-center whitespace-nowrap">
                {children}
            </span>
        </button>
    );
}