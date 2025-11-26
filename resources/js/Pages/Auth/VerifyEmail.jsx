import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Shield, CheckCircle, LogOut, Send, Clock, AlertCircle } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            {/* Main Container */}
            <div className="w-full max-w-md mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-2xl bg-[#161B22] border border-[#2A2F36]">
                            <Mail className="w-8 h-8 text-[#3B82F6]" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#E6EDF3] mb-3">
                        Verify Your Email
                    </h1>
                    <p className="text-[#9BA4B0] text-sm leading-relaxed">
                        Thanks for signing up! Before getting started, we need to verify your email address.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="bg-[#161B22] border border-[#2A2F36] rounded-lg p-6 mb-6">
                    {/* Instructions */}
                    <div className="flex items-start gap-3 mb-6">
                        <div className="p-2 bg-[#3B82F6]/10 rounded-lg mt-0.5">
                            <Shield className="w-5 h-5 text-[#3B82F6]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-[#E6EDF3] mb-2">
                                Check Your Inbox
                            </h3>
                            <p className="text-sm text-[#9BA4B0]">
                                We've sent a verification link to your email address. Click the link in the email to verify your account and get started.
                            </p>
                        </div>
                    </div>

                    {/* Success Message */}
                    {status === 'verification-link-sent' && (
                        <div className="flex items-start gap-3 mb-6 p-4 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-[#10B981] mb-1">
                                    Email Sent Successfully
                                </h4>
                                <p className="text-sm text-[#10B981]/90">
                                    A new verification link has been sent to your email address.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <form onSubmit={submit}>
                            <PrimaryButton 
                                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] active:bg-[#1D4ED8] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Resend Verification Email
                                    </>
                                )}
                            </PrimaryButton>
                        </form>

                        <div className="flex items-center justify-center">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-[#9BA4B0] hover:text-[#E6EDF3] transition-colors duration-200 font-medium"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-[#161B22] border border-[#2A2F36] rounded-lg p-6">
                    <h3 className="text-sm font-medium text-[#E6EDF3] mb-4 text-center">
                        Need Help?
                    </h3>
                    
                    <div className="space-y-4">
                        {/* Check Spam */}
                        <div className="flex items-start gap-3">
                            <div className="p-1 bg-[#F59E0B]/10 rounded mt-0.5">
                                <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#E6EDF3] mb-1">
                                    Can't find the email?
                                </h4>
                                <p className="text-xs text-[#9BA4B0]">
                                    Check your spam or junk folder. Sometimes verification emails end up there by mistake.
                                </p>
                            </div>
                        </div>

                        {/* Wrong Email */}
                        <div className="flex items-start gap-3">
                            <div className="p-1 bg-[#EF4444]/10 rounded mt-0.5">
                                <Mail className="w-4 h-4 text-[#EF4444]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#E6EDF3] mb-1">
                                    Wrong email address?
                                </h4>
                                <p className="text-xs text-[#9BA4B0]">
                                    If you signed up with the wrong email, you'll need to create a new account with the correct address.
                                </p>
                            </div>
                        </div>

                        {/* Link Expiry */}
                        <div className="flex items-start gap-3">
                            <div className="p-1 bg-[#6E7781]/10 rounded mt-0.5">
                                <Clock className="w-4 h-4 text-[#6E7781]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#E6EDF3] mb-1">
                                    Link not working?
                                </h4>
                                <p className="text-xs text-[#9BA4B0]">
                                    Verification links expire after 24 hours. Request a new one if your link has expired.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-[#6E7781]">
                        For security reasons, some features may be limited until your email is verified.
                    </p>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3B82F6]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-3xl"></div>
            </div>

            {/* Verification Steps */}
            <div className="fixed bottom-6 left-6 hidden lg:block">
                <div className="bg-[#161B22] border border-[#2A2F36] rounded-lg p-4">
                    <h4 className="text-xs font-medium text-[#E6EDF3] mb-3 uppercase tracking-wider">
                        Verification Steps
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                            <span className="text-xs text-[#E6EDF3]">Check your email</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#6E7781] rounded-full"></div>
                            <span className="text-xs text-[#9BA4B0]">Click verification link</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#6E7781] rounded-full"></div>
                            <span className="text-xs text-[#9BA4B0]">Start using the app</span>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}