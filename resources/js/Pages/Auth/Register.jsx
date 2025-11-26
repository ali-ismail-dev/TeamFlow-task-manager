import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [focusedField, setFocusedField] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
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
            <Head title="Create Your Account" />

            {/* Header Section */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#E6EDF3] mb-2">
                    Join TaskFlow
                </h2>
                <p className="text-[#9BA4B0]">
                    Create your account and boost your productivity
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                    <InputLabel 
                        htmlFor="name" 
                        value="Full Name" 
                        className="text-[#E6EDF3] font-medium"
                    />

                    <div className="relative">
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className={`w-full pl-10 transition-all duration-300 ${
                                focusedField === 'name' 
                                    ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/20' 
                                    : 'border-[#2A2F36]'
                            }`}
                            style={{
                                backgroundColor: '#1E242D',
                                borderColor: focusedField === 'name' ? '#3B82F6' : '#2A2F36',
                                color: '#E6EDF3'
                            }}
                            autoComplete="name"
                            onFocus={() => handleFocus('name')}
                            onBlur={handleBlur}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Enter your full name"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-[#6E7781]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>

                    <InputError message={errors.name} className="mt-1" />
                </div>

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
                    <InputLabel 
                        htmlFor="password" 
                        value="Password" 
                        className="text-[#E6EDF3] font-medium"
                    />

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
                            autoComplete="new-password"
                            onFocus={() => handleFocus('password')}
                            onBlur={handleBlur}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Create a strong password"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-[#6E7781]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-[#E6EDF3] font-medium"
                    />

                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className={`w-full pl-10 transition-all duration-300 ${
                                focusedField === 'password_confirmation' 
                                    ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/20' 
                                    : 'border-[#2A2F36]'
                            }`}
                            style={{
                                backgroundColor: '#1E242D',
                                borderColor: focusedField === 'password_confirmation' ? '#3B82F6' : '#2A2F36',
                                color: '#E6EDF3'
                            }}
                            autoComplete="new-password"
                            onFocus={() => handleFocus('password_confirmation')}
                            onBlur={handleBlur}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            placeholder="Confirm your password"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-[#6E7781]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4">
                    <Link
                        href={route('login')}
                        className="inline-flex items-center text-sm text-[#9BA4B0] hover:text-[#E6EDF3] transition-colors duration-300 group"
                    >
                        <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Already have an account?
                    </Link>

                    <PrimaryButton 
                        className="relative overflow-hidden group px-2 py-2 font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
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
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
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

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-[#1E242D] rounded-lg border border-[#2A2F36]">
                <p className="text-[#9BA4B0] text-sm text-center">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-300">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-300">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </GuestLayout>
    );
}
