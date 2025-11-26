import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function AppLayout({ children, title }) {
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);
    const [flashType, setFlashType] = useState(null);
    const [flashMessage, setFlashMessage] = useState('');

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setFlashType(flash.success ? 'success' : 'error');
            setFlashMessage(flash.success || flash.error);
            setShowFlash(true);

            const timer = setTimeout(() => {
                setShowFlash(false);
                // Clear after animation
                setTimeout(() => {
                    setFlashType(null);
                    setFlashMessage('');
                }, 300);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleDismiss = () => {
        setShowFlash(false);
        setTimeout(() => {
            setFlashType(null);
            setFlashMessage('');
        }, 300);
    };

    const getFlashStyles = () => {
        const baseStyles = "fixed top-4 right-4 z-50 max-w-md w-full rounded-xl shadow-2xl p-4 transition-all duration-300 ease-in-out transform backdrop-blur-lg border";
        
        if (flashType === 'success') {
            return `${baseStyles} bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981]`;
        } else {
            return `${baseStyles} bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]`;
        }
    };

    const getFlashIcon = () => {
        if (flashType === 'success') {
            return (
                <div className="flex-shrink-0 p-2 bg-[#10B981]/20 rounded-lg">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
            );
        } else {
            return (
                <div className="flex-shrink-0 p-2 bg-[#EF4444]/20 rounded-lg">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
            );
        }
    };

    return (
        <div 
            className="min-h-screen bg-[#0D1117] transition-colors duration-300"
            style={{
                background: 'linear-gradient(135deg, #0D1117 0%, #12161C 50%, #0D1117 100%)'
            }}
        >
            <Head title={title} />

            {/* Enhanced Flash Messages */}
            {flashType && (
                <div 
                    className={getFlashStyles()}
                    style={{
                        transform: showFlash ? 'translateX(0) scale(1)' : 'translateX(100%) scale(0.95)',
                        opacity: showFlash ? 1 : 0,
                    }}
                >
                    <div className="flex items-start space-x-3">
                        {getFlashIcon()}
                        
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold">
                                {flashType === 'success' ? 'Success' : 'Error'}
                            </p>
                            <p className="text-sm mt-1 leading-5">
                                {flashMessage}
                            </p>
                        </div>
                        
                        <button
                            type="button"
                            className="flex-shrink-0 p-1 rounded-lg transition-all duration-300 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 focus:ring-offset-transparent"
                            onClick={handleDismiss}
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-current/20 rounded-b-xl overflow-hidden">
                        <div 
                            className="h-full bg-current transition-all duration-5000 ease-linear"
                            style={{
                                width: showFlash ? '0%' : '100%',
                                transition: showFlash ? 'width 5000ms linear' : 'none'
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-[#3B82F6]/5 to-[#10B981]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-[#F59E0B]/5 to-[#EF4444]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10">
                {children}
            </main>

            {/* Global Styles for Smooth Scrolling */}
            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                }
                
                body {
                    background: #0D1117;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 6px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #161B22;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #2A2F36;
                    border-radius: 3px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #3A414B;
                }
            `}</style>
        </div>
    );
}