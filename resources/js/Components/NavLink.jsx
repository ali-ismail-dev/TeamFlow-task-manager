import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                `inline-flex items-center px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#12161C] ${
                    active
                        ? 'bg-[#1E242D] text-[#3B82F6] shadow-lg border border-[#2A2F36]'
                        : 'text-[#9BA4B0] hover:bg-[#1E242D] hover:text-[#E6EDF3] border border-transparent'
                } ` + className
            }
        >
            <span className="flex items-center space-x-2">
                {children}
            </span>
        </Link>
    );
}