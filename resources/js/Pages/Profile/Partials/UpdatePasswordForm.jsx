import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Eye, EyeOff, CheckCircle, Lock } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`${className}`}>
            {/* Header with Icon */}
            <header className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-[#161B22] border border-[#2A2F36]">
                    <Lock className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-[#E6EDF3]">
                        Update Password
                    </h2>
                    <p className="mt-1 text-sm text-[#9BA4B0]">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                </div>
            </header>

            {/* Password Strength Indicator */}
            <div className="mb-6 p-4 bg-[#161B22] rounded-lg border border-[#2A2F36]">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#E6EDF3]">Password Strength</span>
                    <span className="text-xs text-[#9BA4B0]">
                        {data.password.length > 0 ? 'Checking...' : 'Enter password'}
                    </span>
                </div>
                <div className="w-full bg-[#1E242D] rounded-full h-2">
                    <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                            data.password.length === 0 ? 'bg-[#374151]' :
                            data.password.length < 6 ? 'bg-[#EF4444]' :
                            data.password.length < 8 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
                        }`}
                        style={{ width: `${Math.min((data.password.length / 12) * 100, 100)}%` }}
                    />
                </div>
            </div>

            <form onSubmit={updatePassword} className="space-y-6">
                {/* Current Password */}
                <div className="group">
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                        className="text-[#9BA4B0] font-medium mb-2"
                    />
                    <div className="relative">
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type={showCurrentPassword ? "text" : "password"}
                            className="block w-full bg-[#1E242D] border-[#2A2F36] text-[#E6EDF3] placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-colors duration-200 pl-4 pr-12 py-3 rounded-lg"
                            autoComplete="current-password"
                            placeholder="Enter your current password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E7781] hover:text-[#9BA4B0] transition-colors duration-200"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                {/* New Password */}
                <div className="group">
                    <InputLabel
                        htmlFor="password"
                        value="New Password"
                        className="text-[#9BA4B0] font-medium mb-2"
                    />
                    <div className="relative">
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type={showNewPassword ? "text" : "password"}
                            className="block w-full bg-[#1E242D] border-[#2A2F36] text-[#E6EDF3] placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-colors duration-200 pl-4 pr-12 py-3 rounded-lg"
                            autoComplete="new-password"
                            placeholder="Create a new password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E7781] hover:text-[#9BA4B0] transition-colors duration-200"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="group">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-[#9BA4B0] font-medium mb-2"
                    />
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type={showConfirmPassword ? "text" : "password"}
                            className="block w-full bg-[#1E242D] border-[#2A2F36] text-[#E6EDF3] placeholder-[#6E7781] focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-colors duration-200 pl-4 pr-12 py-3 rounded-lg"
                            autoComplete="new-password"
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

                {/* Submit Button */}
                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton 
                        disabled={processing} 
                        className="bg-[#3B82F6] hover:bg-[#2563EB] active:bg-[#1D4ED8] text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                    >
                        {processing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Update Password
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
                            <span className="text-sm font-medium">Password updated successfully!</span>
                        </div>
                    </Transition>
                </div>
            </form>

            {/* Password Tips */}
            <div className="mt-8 p-4 bg-[#161B22] rounded-lg border border-[#2A2F36]">
                <h3 className="text-sm font-medium text-[#E6EDF3] mb-2">Password Tips</h3>
                <ul className="text-xs text-[#9BA4B0] space-y-1">
                    <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${data.password.length >= 8 ? 'bg-[#10B981]' : 'bg-[#6E7781]'}`} />
                        At least 8 characters long
                    </li>
                    <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(data.password) && /[a-z]/.test(data.password) ? 'bg-[#10B981]' : 'bg-[#6E7781]'}`} />
                        Mix of uppercase and lowercase letters
                    </li>
                    <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(data.password) ? 'bg-[#10B981]' : 'bg-[#6E7781]'}`} />
                        Include numbers
                    </li>
                    <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${/[!@#$%^&*]/.test(data.password) ? 'bg-[#10B981]' : 'bg-[#6E7781]'}`} />
                        Special characters (!@#$%^&*)
                    </li>
                </ul>
            </div>
        </section>
    );
}