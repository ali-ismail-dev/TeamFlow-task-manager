import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <DangerButton onClick={confirmUserDeletion} className="w-full justify-center py-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className="p-6">
                    {/* Modal Header */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-[#EF4444]/10 rounded-lg">
                            <svg className="w-6 h-6 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#E6EDF3]">
                                Delete Your Account
                            </h2>
                            <p className="text-[#9BA4B0] text-sm mt-1">
                                This action cannot be undone
                            </p>
                        </div>
                    </div>

                    <form onSubmit={deleteUser} className="space-y-6">
                        {/* Warning Message */}
                        <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <div>
                                    <h3 className="text-[#EF4444] font-semibold text-sm mb-1">Irreversible Action</h3>
                                    <p className="text-[#9BA4B0] text-sm">
                                        Once your account is deleted, all of your data including tasks, projects, and personal information will be permanently removed. This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Password Confirmation */}
                        <div className="space-y-3">
                            <InputLabel
                                htmlFor="password"
                                value="Confirm Password"
                                className="text-[#E6EDF3] font-semibold"
                            />
                            <div className="text-[#9BA4B0] text-sm">
                                Please enter your password to confirm you want to permanently delete your account.
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full"
                                isFocused
                                placeholder="Enter your password to confirm"
                                required
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Additional Warning */}
                        <div className="bg-[#1E242D] rounded-lg p-4 border border-[#2A2F36]">
                            <h4 className="text-[#E6EDF3] font-medium text-sm mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Before you proceed
                            </h4>
                            <ul className="text-[#9BA4B0] text-sm space-y-1">
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-[#6E7781] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Export any data you wish to keep
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-[#6E7781] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Cancel any active subscriptions
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-[#6E7781] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Inform your team members if needed
                                </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#2A2F36]">
                            <SecondaryButton 
                                onClick={closeModal} 
                                className="px-6 py-2"
                                type="button"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                            </SecondaryButton>

                            <DangerButton 
                                className="px-6 py-2" 
                                disabled={processing}
                                type="submit"
                            >
                                {processing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deleting...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Account
                                    </span>
                                )}
                            </DangerButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    );
}