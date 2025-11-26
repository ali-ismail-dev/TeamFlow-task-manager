import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Key, Lock, Eye, EyeOff, CheckCircle, Shield, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Calculate password strength
    useEffect(() => {
        let strength = 0;
        if (data.password.length >= 8) strength += 1;
        if (/[A-Z]/.test(data.password) && /[a-z]/.test(data.password)) strength += 1;
        if (/\d/.test(data.password)) strength += 1;
        if (/[!@#$%^&*]/.test(data.password)) strength += 1;
        setPasswordStrength(strength);
    }, [data.password]);

    const getStrengthColor = () => {
        if (passwordStrength === 0) return '#6E7781';
        if (passwordStrength <= 2) return '#EF4444';
        if (passwordStrength === 3) return '#F59E0B';
        return '#10B981';
    };

    const getStrengthText = () => {
        if (passwordStrength === 0) return 'Enter a password';
        if (passwordStrength <= 2) return 'Weak';
        if (passwordStrength === 3) return 'Good';
        return 'Strong';
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

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
                        Create New Password
                    </h1>
                    <p className="text-[#9BA4B0] text-sm leading-relaxed">
                        Almost done! Enter your new password below to complete the reset process.
                    </p>
                </div>

                {/* Account Info */}
                <div className="mb-6 p-4 bg-[#161B22] border border-[#2A2F36] rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#3B82F6]/10 rounded-lg">
                            <Mail className="w-4 h-4 text-[#3B82F6]" />
                        </div>
                        <div>
                            <div className="text-xs text-[#9BA4B0]">Resetting password for</div>
                            <div className="text-sm font-medium text-[#E6EDF3]">{email}</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Field (hidden but present in form) */}
                    <input type="hidden" name="email" value={data.email} />
                    <input type="hidden" name="token" value={data.token} />

                    {/* Password Strength Indicator */}
                    <div className="p-4 bg-[#161B22] rounded-lg border border-[#2A2F36]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[#E6EDF3]">Password Strength</span>
                            <span className="text-xs font-medium" style={{ color: getStrengthColor() }}>
                                {getStrengthText()}
                            </span>
                        </div>
                        <div className="w-full bg-[#1E242D] rounded-full h-2 mb-3">
                            <div 
                                className="h-2 rounded-full transition-all duration-300"
                                style={{ 
                                    width: `${(passwordStrength / 4) * 100}%`,
                                    backgroundColor: getStrengthColor()
                                }}
                            />
                        </div>
                        
                        {/* Password Requirements */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-[#9BA4B0]">
                            <div className="flex items-center gap-2">
                                <CheckCircle className={`w-3 h-3 ${data.password.length >= 8 ? 'text-[#10B981]' : 'text-[#6E7781]'}`} />
                                <span>8+ characters</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className={`w-3 h-3 ${/[A-Z]/.test(data.password) && /[a-z]/.test(data.password) ? 'text-[#10B981]' : 'text-[#6E7781]'}`} />
                                <span>Upper & lower</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className={`w-3 h-3 ${/\d/.test(data.password) ? 'text-[#10B981]' : 'text-[#6E7781]'}`} />
                                <span>Number</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className={`w-3 h-3 ${/[!@#$%^&*]/.test(data.password) ? 'text-[#10B981]' : 'text-[#6E7781]'}`} />
                                <span>Special char</span>
                            </div>
                        </div>
                    </div>

                    {/* New Password Field */}
                    <div className="space-y-2">
                        <InputLabel 
                            htmlFor="password" 
                            value="New Password" 
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
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your new password"
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

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <InputLabel 
                            htmlFor="password_confirmation" 
                            value="Confirm Password" 
                            className="text-[#9BA4B0] font-medium flex items-center gap-2"
                        >
                            <Lock className="w-4 h-4" />
                        </InputLabel>
                        
                        <div className="relative">
                            <TextInput
                                type={showConfirmPassword ? "text" : "password"}
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full bg-[#1E242D] border-[#2A2F36] text-[#E6EDF3] placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-all duration-200 pl-4 pr-12 py-3 rounded-lg"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E7781] hover:text-[#9BA4B0] transition-colors duration-200"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    {/* Password Match Indicator */}
                    {data.password && data.password_confirmation && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${
                            data.password === data.password_confirmation 
                                ? 'bg-[#10B981]/10 border border-[#10B981]/20' 
                                : 'bg-[#EF4444]/10 border border-[#EF4444]/20'
                        }`}>
                            {data.password === data.password_confirmation ? (
                                <>
                                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                                    <span className="text-sm font-medium text-[#10B981]">Passwords match</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-4 h-4 rounded-full bg-[#EF4444] flex items-center justify-center">
                                        <span className="text-white text-xs">!</span>
                                    </div>
                                    <span className="text-sm font-medium text-[#EF4444]">Passwords don't match</span>
                                </>
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex flex-col space-y-4 pt-4">
                        <PrimaryButton 
                            className="w-full bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            disabled={processing || data.password !== data.password_confirmation || !data.password}
                        >
                            {processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    Reset Password
                                </>
                            )}
                        </PrimaryButton>

                        {/* Help Text */}
                        <p className="text-xs text-center text-[#6E7781]">
                            You'll be automatically signed in after resetting your password.
                        </p>
                    </div>
                </form>

                {/* Security Notice */}
                <div className="mt-8 p-4 bg-[#161B22] border border-[#2A2F36] rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="p-1 bg-[#3B82F6]/10 rounded mt-0.5">
                            <Shield className="w-4 h-4 text-[#3B82F6]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-[#E6EDF3] mb-1">
                                Password Reset Complete
                            </h3>
                            <p className="text-xs text-[#9BA4B0]">
                                Once reset, your old password will no longer work. Make sure to use a strong, unique password that you haven't used elsewhere.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#3B82F6]/5 rounded-full blur-3xl"></div>
            </div>
        </GuestLayout>
    );
}