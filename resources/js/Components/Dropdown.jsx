import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useState } from 'react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen} className="cursor-pointer">
                {children}
            </div>

            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </>
    );
};

const Content = ({
    align = 'right',
    width = '48',
    contentClasses = 'py-2 bg-[#161B22] border border-[#2A2F36] shadow-2xl',
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    } else if (width === '60') {
        widthClasses = 'w-60';
    }

    return (
        <>
            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95 translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-2"
            >
                <div
                    className={`absolute z-50 mt-2 rounded-xl shadow-2xl backdrop-blur-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className={
                            `rounded-xl ring-1 ring-[#2A2F36] overflow-hidden ` +
                            contentClasses
                        }
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out border-b border-[#2A2F36] last:border-b-0 text-[#E6EDF3] hover:bg-[#1E242D] hover:text-[#3B82F6] focus:bg-[#1E242D] focus:text-[#3B82F6] focus:outline-none group ' +
                className
            }
        >
            <span className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
                {children}
            </span>
        </Link>
    );
};

const DropdownButton = ({ className = '', children, ...props }) => {
    return (
        <button
            {...props}
            className={
                'block w-full px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out border-b border-[#2A2F36] last:border-b-0 text-[#E6EDF3] hover:bg-[#1E242D] hover:text-[#EF4444] focus:bg-[#1E242D] focus:text-[#EF4444] focus:outline-none group ' +
                className
            }
        >
            <span className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
                {children}
            </span>
        </button>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Button = DropdownButton;

export default Dropdown;