import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            {/* Main Container */}
            <div className="w-full max-w-md mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-2xl bg-[#161B22] border border-[#2A2F36]">
                            <Shield className="w-8 h-8 text-[#3B82F6]" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#E6EDF3] mb-3">
                        Confirm Your Password
                    </h1>
                    <p className="text-[#9BA4B0] text-sm leading-relaxed">
                        This is a secure area of the application. Please confirm your
                        password before continuing.
                    </p>
                </div>

                {/* Security Notice */}
                <div className="mb-6 p-4 bg-[#161B22] border border-[#2A2F36] rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="p-1 bg-[#3B82F6]/10 rounded">
                            <Lock className="w-4 h-4 text-[#3B82F6]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-[#E6EDF3] mb-1">
                                Security Check
                            </h3>
                            <p className="text-xs text-[#9BA4B0]">
                                For your security, we require you to re-authenticate to access this page.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Password Input */}
                    <div className="space-y-2">
                        <InputLabel 
                            htmlFor="password" 
                            value="Password" 
                            className="text-[#9BA4B0] font-medium flex items-center gap-2"
                        >
                            <Lock className="w-4 h-4" />
                        </InputLabel>
                        
                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                className="block w-full bg-[#1E242D] border-[#2A2F36] text-[#E6EDF3] placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-all duration-200 pl-4 pr-12 py-3 rounded-lg"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password to continue"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E7781] hover:text-[#9BA4B0] transition-colors duration-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        <InputError message={errors.password} className="mt-2" />
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
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Continue
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </PrimaryButton>

                        {/* Help Text */}
                        <p className="text-xs text-center text-[#6E7781]">
                            You'll be redirected to the requested page after verification.
                        </p>
                    </div>
                </form>

                {/* Additional Security Info */}
                <div className="mt-8 p-4 bg-[#161B22] border border-[#2A2F36] rounded-lg">
                    <h3 className="text-sm font-medium text-[#E6EDF3] mb-3 text-center">
                        Why is this required?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 text-xs text-[#9BA4B0]">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                            <span>Protects your sensitive information</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                            <span>Ensures account security</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                            <span>Prevents unauthorized access</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3B82F6]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl"></div>
            </div>
        </GuestLayout>
    );
}