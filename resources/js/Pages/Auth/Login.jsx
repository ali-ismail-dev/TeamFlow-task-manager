import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [focusedField, setFocusedField] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleFocus = (field) => {
        setFocusedField(field);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    return (
        <GuestLayout>
            <Head title="Welcome Back" />

            {/* Header Section */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#E6EDF3] mb-2">
                    Welcome Back
                </h2>
                <p className="text-[#9BA4B0]">
                    Sign in to continue your productivity journey
                </p>
            </div>

            {/* Status Message */}
            {status && (
                <div className="mb-6 p-4 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg text-[#10B981] text-sm">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {status}
                    </div>
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <InputLabel
                        htmlFor="email"
                        value="Email Address"
                        className="text-[#E6EDF3] font-medium"
                    />

                    <div className="relative">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`w-full pl-10 transition-all duration-300 ${
                                focusedField === 'email'
                                    ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/20'
                                    : 'border-[#2A2F36]'
                            }`}
                            style={{
                                backgroundColor: '#1E242D',
                                borderColor: focusedField === 'email' ? '#3B82F6' : '#2A2F36',
                                color: '#E6EDF3'
                            }}
                            autoComplete="username"
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="Enter your email address"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-[#6E7781]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-[#E6EDF3] font-medium"
                        />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-300 font-medium"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="relative">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className={`w-full pl-10 transition-all duration-300 ${
                                focusedField === 'password'
                                    ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/20'
                                    : 'border-[#2A2F36]'
                            }`}
                            style={{
                                backgroundColor: '#1E242D',
                                borderColor: focusedField === 'password' ? '#3B82F6' : '#2A2F36',
                                color: '#E6EDF3'
                            }}
                            autoComplete="current-password"
                            onFocus={() => handleFocus('password')}
                            onBlur={handleBlur}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-[#6E7781]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Remember Me & Actions */}
                <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 border-2 rounded transition-all duration-300 flex items-center justify-center ${
                                data.remember
                                    ? 'bg-[#3B82F6] border-[#3B82F6]'
                                    : 'bg-[#1E242D] border-[#2A2F36] group-hover:border-[#3A414B]'
                            }`}>
                                {data.remember && (
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <span className="text-sm text-[#E6EDF3] group-hover:text-[#9BA4B0] transition-colors duration-300">
                            Remember me
                        </span>
                    </label>

                    <PrimaryButton
                        className="relative overflow-hidden group px-8 py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                        disabled={processing}
                        style={{
                            backgroundColor: processing ? '#374151' : '#3B82F6',
                            color: '#FFFFFF'
                        }}
                    >
                        <span className="relative z-10 flex items-center">
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </span>

                        {/* Button hover effect */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: '#2563EB' }}
                        ></div>
                    </PrimaryButton>
                </div>
            </form>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2A2F36]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#161B22] text-[#6E7781]">
                        New to TaskFlow?
                    </span>
                </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
                <Link
                    href={route('register')}
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-[#E6EDF3] bg-[#1E242D] border border-[#2A2F36] rounded-lg hover:border-[#3A414B] hover:bg-[#2A2F36] transition-all duration-300 group"
                >
                    Create New Account
                    <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </Link>
            </div>

            {/* Quick Demo Access (Optional - can be removed) */}
            <div className="mt-6 p-4 bg-[#1E242D] rounded-lg border border-[#2A2F36]">
                <p className="text-[#9BA4B0] text-sm text-center">
                    Demo Access: <span className="text-[#E6EDF3]">demo@taskflow.com</span> / <span className="text-[#E6EDF3]">password</span>
                </p>
            </div>
        </GuestLayout>
    );
}
