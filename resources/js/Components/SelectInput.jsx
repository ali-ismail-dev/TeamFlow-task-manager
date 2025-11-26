import { forwardRef, useImperativeHandle, useRef } from 'react';

export default forwardRef(function SelectInput(
    { className = '', children, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    return (
        <div className="relative">
            <select 
                {...props}
                className={
                    `w-full rounded-lg border-[#2A2F36] bg-[#1E242D] text-[#E6EDF3] shadow-sm transition-all duration-300 ease-in-out focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] hover:border-[#3A414B] ${
                        props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    } ` + className
                }
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236E7781' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                    appearance: 'none'
                }}
                ref={localRef}
            >
                {children}
            </select>
            
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg className="h-5 w-5 text-[#6E7781]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
});