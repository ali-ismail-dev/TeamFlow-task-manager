import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { User, Mail, CheckCircle, Shield, Send } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            {/* Header with Icon */}
            <header className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-[#161B22] border border-[#2A2F36]">
                    <User className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-[#E6EDF3]">
                        Profile Information
                    </h2>
                    <p className="mt-1 text-sm text-[#9BA4B0]">
                        Update your account's profile information and email address.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Name Field */}
                <div className="group">
                    <InputLabel 
                        htmlFor="name" 
                        value="Full Name" 
                        className="text-[#9BA4B0] font-medium mb-2 flex items-center gap-2"
                    >
                        <User className="w-4 h-4" />
                    </InputLabel>
                    <TextInput
                        id="name"
                        className="block w-full bg-[#1E242D] border-[#2A2F36] text-[#E6EDF3] placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-all duration-200 px-4 py-3 rounded-lg"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        placeholder="Enter your full name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email Field */}
                <div className="group">
                    <InputLabel 
                        htmlFor="email" 
                        value="Email Address" 
                        className="text-[#9BA4B0] font-medium mb-2 flex items-center gap-2"
                    >
                        <Mail className="w-4 h-4" />
                    </InputLabel>
                    <TextInput
                        id="email"
                        type="email"
                        className="block w-full bg-[#1E242D] border-[#2A2F36] text-[#E6EDF3] placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-all duration-200 px-4 py-3 rounded-lg"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="Enter your email address"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Email Verification Section */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-[#161B22] rounded-lg border border-[#F59E0B]/20">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                                <Shield className="w-5 h-5 text-[#F59E0B]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-[#E6EDF3] mb-1">
                                    Email Verification Required
                                </h3>
                                <p className="text-sm text-[#9BA4B0] mb-3">
                                    Your email address is unverified. Please verify your email to access all features.
                                </p>
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#E6EDF3] bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                    Resend Verification Email
                                </Link>
                            </div>
                        </div>

                        {/* Verification Link Sent Status */}
                        {status === 'verification-link-sent' && (
                            <Transition
                                show={true}
                                enter="transition-all duration-300 ease-out"
                                enterFrom="opacity-0 translate-y-2"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition-all duration-300 ease-in"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-2"
                            >
                                <div className="flex items-center gap-2 mt-3 p-3 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                                    <span className="text-sm font-medium text-[#10B981]">
                                        A new verification link has been sent to your email address.
                                    </span>
                                </div>
                            </Transition>
                        )}
                    </div>
                )}

                {/* Email Verified Badge */}
                {user.email_verified_at && (
                    <div className="flex items-center gap-2 p-3 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-medium text-[#10B981]">
                            Email verified on {new Date(user.email_verified_at).toLocaleDateString()}
                        </span>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-[#3B82F6] hover:bg-[#2563EB] active:bg-[#1D4ED8] text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                    >
                        {processing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Update Profile
                            </>
                        )}
                    </PrimaryButton>

                    {/* Success Message */}
                    <Transition
                        show={recentlySuccessful}
                        enter="transition-all duration-300 ease-out"
                        enterFrom="opacity-0 translate-x-4"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition-all duration-300 ease-in"
                        leaveFrom="opacity-100 translate-x-0"
                        leaveTo="opacity-0 -translate-x-4"
                    >
                        <div className="flex items-center gap-2 text-[#10B981] bg-[#161B22] px-4 py-2 rounded-lg border border-[#10B981]/20">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Profile updated successfully!</span>
                        </div>
                    </Transition>
                </div>
            </form>

            {/* Profile Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#161B22] rounded-lg border border-[#2A2F36]">
                    <div className="text-sm text-[#9BA4B0] mb-1">Member Since</div>
                    <div className="text-sm font-medium text-[#E6EDF3]">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>
                <div className="p-4 bg-[#161B22] rounded-lg border border-[#2A2F36]">
                    <div className="text-sm text-[#9BA4B0] mb-1">Last Updated</div>
                    <div className="text-sm font-medium text-[#E6EDF3]">
                        {new Date(user.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}