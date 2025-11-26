import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between px-4 py-4 border-t border-[#2A2F36] bg-[#161B22] sm:px-6 sm:rounded-b-xl">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-[#9BA4B0]">
                        Showing <span className="font-medium text-[#E6EDF3]">
                            {links[0].label}
                        </span> to <span className="font-medium text-[#E6EDF3]">
                            {links[links.length - 1].label}
                        </span> of{' '}
                        <span className="font-medium text-[#E6EDF3]">
                            {links.length > 2 ? links[links.length - 2].label : '0'}
                        </span> results
                    </p>
                </div>
                
                <div className="flex space-x-1">
                    {links.map((link, index) => (
                        <Link
                            preserveScroll
                            key={index}
                            href={link.url || "#"}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-lg border ${
                                link.active 
                                    ? 'z-10 bg-[#3B82F6] text-white border-[#3B82F6] shadow-lg shadow-[#3B82F6]/25' 
                                    : 'bg-[#1E242D] text-[#E6EDF3] border-[#2A2F36] hover:bg-[#2A2F36] hover:border-[#3A414B]'
                            } ${
                                !link.url ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            {/* Mobile pagination */}
            <div className="flex justify-between flex-1 sm:hidden">
                {links.map((link, index) => (
                    <Link
                        preserveScroll
                        key={index}
                        href={link.url || "#"}
                        className={`relative inline-flex items-center px-3 py-2 text-xs font-medium rounded-md border transition-all duration-300 ${
                            link.active 
                                ? 'z-10 bg-[#3B82F6] text-white border-[#3B82F6] shadow-lg' 
                                : 'bg-[#1E242D] text-[#E6EDF3] border-[#2A2F36] hover:bg-[#2A2F36]'
                        } ${
                            !link.url ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </nav>
    );
}