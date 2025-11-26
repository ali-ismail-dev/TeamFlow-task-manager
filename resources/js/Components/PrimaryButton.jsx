export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] hover:scale-105 active:scale-95 ${
                    disabled 
                        ? 'opacity-50 cursor-not-allowed bg-[#374151] hover:scale-100' 
                        : 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] shadow-lg hover:shadow-xl'
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