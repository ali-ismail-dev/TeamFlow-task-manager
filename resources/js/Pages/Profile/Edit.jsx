import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="text-2xl font-bold text-[#E6EDF3]">
                        Profile Settings
                    </h2>
                    <p className="text-[#9BA4B0] mt-1">Manage your account settings and preferences</p>
                </div>
            }
        >
            <Head title="Profile Settings" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile Information Card */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                        <div className="border-b border-[#2A2F36] px-6 py-4 bg-[#1E242D]">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#3B82F6]/10 rounded-lg">
                                    <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#E6EDF3]">Profile Information</h3>
                                    <p className="text-sm text-[#9BA4B0]">Update your account's profile information and email address</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Update Password Card */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                        <div className="border-b border-[#2A2F36] px-6 py-4 bg-[#1E242D]">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#10B981]/10 rounded-lg">
                                    <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#E6EDF3]">Update Password</h3>
                                    <p className="text-sm text-[#9BA4B0]">Ensure your account is using a long, random password to stay secure</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <UpdatePasswordForm className="w-full" />
                        </div>
                    </div>

                    {/* Account Deletion Card */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                        <div className="border-b border-[#2A2F36] px-6 py-4 bg-[#1E242D]">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#EF4444]/10 rounded-lg">
                                    <svg className="w-6 h-6 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#E6EDF3]">Delete Account</h3>
                                    <p className="text-sm text-[#9BA4B0]">Permanently delete your account and all of its resources</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <DeleteUserForm className="w-full" />
                        </div>
                    </div>

                    {/* Profile Quick Stats */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">Account Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="text-2xl font-bold text-[#3B82F6]">
                                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="text-[#E6EDF3] font-medium">Tasks</div>
                                <div className="text-[#9BA4B0] text-sm">Active tasks</div>
                            </div>
                            <div className="text-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="text-2xl font-bold text-[#10B981]">
                                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="text-[#E6EDF3] font-medium">Completed</div>
                                <div className="text-[#9BA4B0] text-sm">Tasks done</div>
                            </div>
                            <div className="text-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="text-2xl font-bold text-[#F59E0B]">
                                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                    </svg>
                                </div>
                                <div className="text-[#E6EDF3] font-medium">Projects</div>
                                <div className="text-[#9BA4B0] text-sm">Active projects</div>
                            </div>
                            <div className="text-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="text-2xl font-bold text-[#8B5CF6]">
                                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="text-[#E6EDF3] font-medium">Member</div>
                                <div className="text-[#9BA4B0] text-sm">Since {new Date(auth.user.created_at).getFullYear()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}