import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { useEffect } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    // Close on escape key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && closeable) {
                onClose();
            }
        };

        if (show) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [show, closeable, onClose]);

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
    }[maxWidth];

    return (
        <Transition show={show} leave="duration-300 ease-in-out">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
                onClose={close}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div 
                        className="absolute inset-0 transition-opacity backdrop-blur-sm"
                        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                    />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`mb-6 transform overflow-hidden rounded-2xl border shadow-2xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
                        style={{
                            backgroundColor: '#161B22',
                            borderColor: '#2A2F36',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        {/* Accent top border */}
                        <div className="h-1 bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#F59E0B]"></div>
                        
                        <div className="relative">
                            {/* Close button */}
                            {closeable && (
                                <button
                                    onClick={close}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#1E242D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] group"
                                    style={{ color: '#9BA4B0' }}
                                >
                                    <svg 
                                        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#EF4444]" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M6 18L18 6M6 6l12 12" 
                                        />
                                    </svg>
                                </button>
                            )}
                            
                            {/* Modal content */}
                            <div style={{ color: '#E6EDF3' }}>
                                {children}
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}