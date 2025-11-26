import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Edit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('user.update', user.id));
    };

    const deleteUser = () => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
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
                            Edit User
                        </h2>
                        <p className="text-[#9BA4B0] mt-1">
                            Update user details for "<span className="font-medium text-[#3B82F6]">{user.name}</span>"
                        </p>
                    </div>
                    <Link
                        href={route('user.index')}
                        className="inline-flex items-center text-sm text-[#9BA4B0] hover:text-[#E6EDF3] transition-colors duration-300"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Users
                    </Link>
                </div>
            }
        >
            <Head title={`Edit ${user.name}`} />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* User Edit Card */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                        {/* Header with accent border */}
                        <div className="border-b border-[#2A2F36] px-6 py-4 bg-[#1E242D]">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#3B82F6]/10 rounded-lg">
                                    <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#E6EDF3]">User Information</h3>
                                    <p className="text-sm text-[#9BA4B0]">Update user details and password below</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                {/* User Avatar and Basic Info */}
                                <div className="flex items-center space-x-4 p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] flex items-center justify-center text-white font-bold text-xl">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-[#E6EDF3] font-semibold text-lg">{user.name}</div>
                                        <div className="text-[#9BA4B0] text-sm">{user.email}</div>
                                        <div className="text-[#6E7781] text-xs">User ID: #{user.id}</div>
                                    </div>
                                </div>

                                {/* Name Field */}
                                <div className="space-y-2">
                                    <InputLabel 
                                        htmlFor="name" 
                                        value="Full Name" 
                                        className="text-[#E6EDF3] font-semibold"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="Enter user's full name"
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <InputLabel 
                                        htmlFor="email" 
                                        value="Email Address" 
                                        className="text-[#E6EDF3] font-semibold"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="Enter user's email address"
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>

                                {/* Password Fields */}
                                <div className="bg-[#1E242D] rounded-xl p-4 border border-[#2A2F36]">
                                    <h4 className="text-sm font-semibold text-[#E6EDF3] mb-4 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Change Password (Optional)
                                    </h4>
                                    
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <InputLabel 
                                                htmlFor="password" 
                                                value="New Password" 
                                                className="text-[#E6EDF3] font-medium"
                                            />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="w-full"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Leave blank to keep current password"
                                            />
                                            <InputError message={errors.password} className="mt-1" />
                                            <p className="text-xs text-[#6E7781]">
                                                Enter a new password only if you want to change it
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <InputLabel 
                                                htmlFor="password_confirmation" 
                                                value="Confirm New Password" 
                                                className="text-[#E6EDF3] font-medium"
                                            />
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="w-full"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Confirm the new password"
                                            />
                                            <p className="text-xs text-[#6E7781]">
                                                Re-enter the new password to confirm
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* User Meta Information */}
                                <div className="bg-[#1E242D] rounded-xl p-4 border border-[#2A2F36]">
                                    <h4 className="text-sm font-semibold text-[#E6EDF3] mb-3">User Details</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-[#9BA4B0]">User ID:</span>
                                            <div className="text-[#E6EDF3] font-medium">#{user.id}</div>
                                        </div>
                                        <div>
                                            <span className="text-[#9BA4B0]">Member Since:</span>
                                            <div className="text-[#E6EDF3] font-medium">{new Date(user.created_at).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <span className="text-[#9BA4B0]">Last Updated:</span>
                                            <div className="text-[#E6EDF3] font-medium">{new Date(user.updated_at).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <span className="text-[#9BA4B0]">Email Verified:</span>
                                            <div className={`font-medium ${user.email_verified_at ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>
                                                {user.email_verified_at ? 'Verified' : 'Pending'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-6 border-t border-[#2A2F36]">
                                    <DangerButton
                                        type="button"
                                        onClick={deleteUser}
                                        className="px-6 py-2"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete User
                                    </DangerButton>
                                    
                                    <div className="flex items-center space-x-3">
                                        <SecondaryButton
                                            type="button"
                                            onClick={() => window.history.back()}
                                            className="px-6 py-2"
                                        >
                                            Cancel
                                        </SecondaryButton>
                                        <PrimaryButton
                                            type="submit"
                                            className="px-6 py-2"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Updating...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Update User
                                                </span>
                                            )}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* User Management Tips */}
                    <div className="mt-6 bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">User Management Tips</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#3B82F6]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Security First</div>
                                    <div className="text-[#9BA4B0] text-sm">Only change passwords when necessary</div>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#10B981]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Keep Updated</div>
                                    <div className="text-[#9BA4B0] text-sm">Maintain accurate user information</div>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Communicate Changes</div>
                                    <div className="text-[#9BA4B0] text-sm">Notify users of significant updates</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}