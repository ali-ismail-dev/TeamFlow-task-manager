import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Mail, Key, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { useState } from 'react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'), {
            onSuccess: () => setSubmitted(true),
        });
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            {/* Main Container */}
            <div className="w-full max-w-md mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-2xl bg-[#161B22] border border-[#2A2F36]">
                            <Key className="w-8 h-8 text-[#3B82F6]" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#E6EDF3] mb-3">
                        Reset Your Password
                    </h1>
                    <p className="text-[#9BA4B0] text-sm leading-relaxed">
                        Forgot your password? No problem. Just enter your email address and we'll send you a password reset link.
                    </p>
                </div>

                {/* Success State - After Submission */}
                {submitted || status ? (
                    <div className="space-y-6">
                        {/* Success Message */}
                        <div className="p-4 bg-[#161B22] border border-[#10B981]/20 rounded-lg">
                            <div className="flex items-start gap-3">
                                <div className="p-1 bg-[#10B981]/10 rounded-full mt-0.5">
                                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-[#E6EDF3] mb-1">
                                        Check Your Email
                                    </h3>
                                    <p className="text-sm text-[#9BA4B0]">
                                        {status || 'We\'ve sent a password reset link to your email address. Please check your inbox and follow the instructions.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Instructions */}
                        <div className="p-4 bg-[#161B22] border border-[#2A2F36] rounded-lg">
                            <h4 className="text-sm font-medium text-[#E6EDF3] mb-2">What's Next?</h4>
                            <ul className="text-xs text-[#9BA4B0] space-y-2">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></div>
                                    <span>Check your email inbox (and spam folder)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></div>
                                    <span>Click the reset link in the email</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></div>
                                    <span>Create your new password</span>
                                </li>
                            </ul>
                        </div>

                        {/* Resend Option */}
                        <div className="text-center">
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-sm text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-200 font-medium"
                            >
                                Send another reset link
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Form State - Before Submission */
                    <div className="space-y-6">
                        {/* Security Notice */}
                        <div className="p-4 bg-[#161B22] border border-[#2A2F36] rounded-lg">
                            <div className="flex items-start gap-3">
                                <div className="p-1 bg-[#3B82F6]/10 rounded">
                                    <Shield className="w-4 h-4 text-[#3B82F6]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-[#E6EDF3] mb-1">
                                        Secure Password Reset
                                    </h3>
                                    <p className="text-xs text-[#9BA4B0]">
                                        Your reset link will expire in 60 minutes for security reasons.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[#9BA4B0] font-medium text-sm flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full bg-[#1E242D] border-[#2A2F36] text-[#E6EDF3] placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-all duration-200 px-4 py-3 rounded-lg"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email address"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-col space-y-4">
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
                                            Send Reset Link
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </PrimaryButton>

                                {/* Help Text */}
                                <p className="text-xs text-center text-[#6E7781]">
                                    You'll receive an email with instructions to reset your password.
                                </p>
                            </div>
                        </form>
                    </div>
                )}

                {/* Security Features */}
                <div className="mt-8 p-4 bg-[#161B22] border border-[#2A2F36] rounded-lg">
                    <h3 className="text-sm font-medium text-[#E6EDF3] mb-3 text-center">
                        Your Security is Our Priority
                    </h3>
                    <div className="grid grid-cols-1 gap-2 text-xs text-[#9BA4B0]">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                            <span>Encrypted connection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                            <span>One-time use reset links</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                            <span>No password stored in emails</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3B82F6]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-3xl"></div>
            </div>
        </GuestLayout>
    );
}