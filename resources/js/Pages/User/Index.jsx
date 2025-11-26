import React from 'react';
import { Link, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, users, queryParams = null }) {
    queryParams = queryParams || {};

    // Normalize users prop: accept either { data: [...], meta: {...} } OR an array [...]
    const usersData = Array.isArray(users)
        ? users
        : (users?.data && Array.isArray(users.data))
            ? users.data
            : [];

    const usersMeta = users && users.meta ? users.meta : {};

    const deleteUser = (user) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('user.destroy', user.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E6EDF3]">
                            Users
                        </h2>
                        <p className="text-[#9BA4B0] mt-1">Manage team members and their access</p>
                    </div>
                    <Link
                        href={route('user.create')}
                        className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-[#2563EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] group"
                    >
                        <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Users Card */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                        <div className="p-6">
                            {/* Table Container */}
                            <div className="overflow-x-auto rounded-xl border border-[#2A2F36]">
                                <table className="min-w-full divide-y divide-[#2A2F36]">
                                    {/* Table Header */}
                                    <thead className="bg-[#1E242D]">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[#9BA4B0] uppercase tracking-wider">
                                                User
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[#9BA4B0] uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[#9BA4B0] uppercase tracking-wider">
                                                Member Since
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[#9BA4B0] uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[#9BA4B0] uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="divide-y divide-[#2A2F36] bg-[#161B22]">
                                        {usersData.map((user) => (
                                            <tr key={user.id} className="hover:bg-[#1E242D] transition-colors duration-300 group">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] flex items-center justify-center text-white font-bold text-sm mr-3">
                                                            {user.name ? user.name.charAt(0).toUpperCase() : ''}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-[#E6EDF3]">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-xs text-[#6E7781]">
                                                                ID: #{user.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-[#E6EDF3]">
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-[#E6EDF3]">
                                                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                                                    </div>
                                                    <div className="text-xs text-[#6E7781]">
                                                        {user.created_at ? new Date(user.created_at).toLocaleTimeString() : ''}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#10B981]">
                                                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-[#10B981]" fill="currentColor" viewBox="0 0 8 8">
                                                            <circle cx="4" cy="4" r="3" />
                                                        </svg>
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            href={route('user.edit', user.id)}
                                                            className="inline-flex items-center text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-300 group"
                                                        >
                                                            <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteUser(user)}
                                                            className="inline-flex items-center text-[#EF4444] hover:text-[#DC2626] transition-colors duration-300 group"
                                                        >
                                                            <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                        {/* Empty State */}
                                        {usersData.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="w-16 h-16 bg-[#1E242D] rounded-full flex items-center justify-center mb-4">
                                                            <svg className="w-8 h-8 text-[#6E7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-[#E6EDF3] mb-2">No users found</h3>
                                                        <p className="text-[#9BA4B0] mb-6">Get started by adding your first team member</p>
                                                        <Link
                                                            href={route('user.create')}
                                                            className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-[#2563EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22]"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                            Add User
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {usersData.length > 0 && usersMeta?.links && (
                                <div className="mt-6">
                                    <Pagination links={usersMeta.links} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-[#161B22] rounded-xl border border-[#2A2F36] p-4 text-center">
                            <div className="text-2xl font-bold text-[#E6EDF3]">{usersMeta?.total ?? usersData.length}</div>
                            <div className="text-[#9BA4B0] text-sm">Total Users</div>
                        </div>
                        <div className="bg-[#161B22] rounded-xl border border-[#2A2F36] p-4 text-center">
                            <div className="text-2xl font-bold text-[#10B981]">{usersData.filter(u => u.email_verified_at).length}</div>
                            <div className="text-[#9BA4B0] text-sm">Verified</div>
                        </div>
                        <div className="bg-[#161B22] rounded-xl border border-[#2A2F36] p-4 text-center">
                            <div className="text-2xl font-bold text-[#3B82F6]">{usersData.filter(u => !u.email_verified_at).length}</div>
                            <div className="text-[#9BA4B0] text-sm">Pending</div>
                        </div>
                        <div className="bg-[#161B22] rounded-xl border border-[#2A2F36] p-4 text-center">
                            <div className="text-2xl font-bold text-[#F59E0B]">0</div>
                            <div className="text-[#9BA4B0] text-sm">Online</div>
                        </div>
                    </div>

                    {/* Team Management Tips */}
                    <div className="mt-6 bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">Team Management Tips</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#3B82F6]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Secure Access</div>
                                    <div className="text-[#9BA4B0] text-sm">Ensure users have strong passwords</div>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#10B981]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Role Management</div>
                                    <div className="text-[#9BA4B0] text-sm">Assign appropriate permissions</div>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Regular Review</div>
                                    <div className="text-[#9BA4B0] text-sm">Periodically audit user access</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
