import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);
    const [isFocusedState, setIsFocusedState] = useState(false);

    useImperativeHandle(ref, () => ({
        focus: () => {
            localRef.current?.focus();
            setIsFocusedState(true);
        },
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
            setIsFocusedState(true);
        }
    }, [isFocused]);

    const handleFocus = () => setIsFocusedState(true);
    const handleBlur = () => setIsFocusedState(false);

    return (
        <input
            {...props}
            type={type}
            className={
                `w-full rounded-lg border-[#2A2F36] bg-[#1E242D] text-[#E6EDF3] shadow-sm transition-all duration-300 ease-in-out placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] hover:border-[#3A414B] ${
                    isFocusedState ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/20' : ''
                } ` + className
            }
            ref={localRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
});