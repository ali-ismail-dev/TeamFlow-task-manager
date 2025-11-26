export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] hover:scale-105 active:scale-95 ${
                    disabled 
                        ? 'opacity-50 cursor-not-allowed bg-[#374151] border-[#2A2F36] text-[#6B7280] hover:scale-100' 
                        : 'bg-[#161B22] border-[#2A2F36] text-[#E6EDF3] hover:bg-[#1E242D] hover:border-[#3A414B] shadow-sm hover:shadow-md'
                } ` + className
            }
            disabled={disabled}
        >
            <span className="flex items-center whitespace-nowrap">
                {children}
            </span>
        </button>
    );
}