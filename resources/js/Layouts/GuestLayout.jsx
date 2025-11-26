import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div 
            className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#0D1117]"
            style={{
                background: 'linear-gradient(135deg, #0D1117 0%, #12161C 100%)'
            }}
        >
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-[#3B82F6]/10 to-[#10B981]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#F59E0B]/10 to-[#EF4444]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Logo with enhanced styling */}
            <div className="relative z-10 mb-8 transform hover:scale-105 transition-transform duration-300">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="p-2 bg-[#161B22] rounded-2xl shadow-2xl border border-[#2A2F36] group-hover:border-[#3B82F6] transition-colors duration-300">
                        <ApplicationLogo className="h-16 w-16 fill-current text-[#3B82F6] drop-shadow-lg" />
                    </div>
                    <div className="text-left">
                        <h1 className="text-2xl font-bold text-[#E6EDF3] tracking-tight">TaskFlow</h1>
                        <p className="text-[#9BA4B0] text-sm">Streamline Your Productivity</p>
                    </div>
                </Link>
            </div>

            {/* Main card with enhanced styling */}
            <div className="relative z-10 w-full max-w-md">
                <div className="relative bg-[#161B22] backdrop-blur-lg border border-[#2A2F36] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#3A414B]">
                    {/* Accent top border */}
                    <div className="h-1 bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#F59E0B]"></div>
                    
                    <div className="p-8">
                        {children}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-8 text-center">
                <p className="text-[#6E7781] text-sm">
                    © 2024 TaskFlow. All rights reserved.
                </p>
            </div>
        </div>
    );
}