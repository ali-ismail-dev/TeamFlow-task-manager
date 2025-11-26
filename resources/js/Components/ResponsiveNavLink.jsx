import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center space-x-3 border-l-4 py-3 pe-4 ps-3 text-base font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#12161C] rounded-r-lg ${
                active
                    ? 'border-[#3B82F6] bg-[#1E242D] text-[#3B82F6] shadow-lg'
                    : 'border-transparent text-[#9BA4B0] hover:border-[#3A414B] hover:bg-[#1E242D] hover:text-[#E6EDF3]'
            } ${className}`}
        >
            {children}
        </Link>
    );
}