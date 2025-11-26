import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import TextareaInput from '@/Components/TextareaInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        due_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('project.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E6EDF3]">
                            Create New Project
                        </h2>
                        <p className="text-[#9BA4B0] mt-1">Start a new project to organize your tasks and collaborate with your team</p>
                    </div>
                    <Link
                        href={route('project.index')}
                        className="inline-flex items-center text-sm text-[#9BA4B0] hover:text-[#E6EDF3] transition-colors duration-300"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Projects
                    </Link>
                </div>
            }
        >
            <Head title="Create Project" />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Project Creation Card */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                        {/* Header with accent border */}
                        <div className="border-b border-[#2A2F36] px-6 py-4 bg-[#1E242D]">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#10B981]/10 rounded-lg">
                                    <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#E6EDF3]">Project Details</h3>
                                    <p className="text-sm text-[#9BA4B0]">Fill in the information below to create your new project</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                {/* Project Name */}
                                <div className="space-y-2">
                                    <InputLabel 
                                        htmlFor="name" 
                                        value="Project Name" 
                                        className="text-[#E6EDF3] font-semibold"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="Enter a descriptive project name"
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                    <p className="text-xs text-[#6E7781]">
                                        Choose a clear, descriptive name that your team will recognize
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <InputLabel 
                                        htmlFor="description" 
                                        value="Description" 
                                        className="text-[#E6EDF3] font-semibold"
                                    />
                                    <TextareaInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={5}
                                        placeholder="Describe the project goals, objectives, and any important details for your team..."
                                    />
                                    <InputError message={errors.description} className="mt-1" />
                                    <p className="text-xs text-[#6E7781]">
                                        Provide context about what this project aims to achieve
                                    </p>
                                </div>

                                {/* Due Date */}
                                <div className="space-y-2">
                                    <InputLabel 
                                        htmlFor="due_date" 
                                        value="Due Date" 
                                        className="text-[#E6EDF3] font-semibold"
                                    />
                                    <div className="relative max-w-xs">
                                        <TextInput
                                            id="due_date"
                                            type="date"
                                            name="due_date"
                                            value={data.due_date}
                                            className="w-full"
                                            onChange={(e) => setData('due_date', e.target.value)}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-[#6E7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <InputError message={errors.due_date} className="mt-1" />
                                    <p className="text-xs text-[#6E7781]">
                                        Set a target completion date for the project (optional)
                                    </p>
                                </div>

                                {/* Project Creation Tips */}
                                <div className="bg-[#1E242D] rounded-xl p-4 border border-[#2A2F36]">
                                    <h4 className="text-sm font-semibold text-[#E6EDF3] mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Project Setup Tips
                                    </h4>
                                    <ul className="text-sm text-[#9BA4B0] space-y-2">
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mr-2 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Use clear, specific names that your team will understand</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mr-2 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Include key objectives and success criteria in the description</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mr-2 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Set realistic due dates to keep the project on track</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-6 border-t border-[#2A2F36]">
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('project.index')}
                                            className="inline-flex items-center text-sm text-[#9BA4B0] hover:text-[#E6EDF3] transition-colors duration-300 group"
                                        >
                                            <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back to Projects
                                        </Link>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <SecondaryButton
                                            type="button"
                                            onClick={() => window.history.back()}
                                            className="px-6 py-2"
                                        >
                                            Cancel
                                        </SecondaryButton>
                                        <PrimaryButton
                                            type="submit"
                                            className="px-6 py-2"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Create Project
                                                </span>
                                            )}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Next Steps Card */}
                    <div className="mt-6 bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">What's Next?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#3B82F6]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Add Tasks</div>
                                    <div className="text-[#9BA4B0] text-sm">Break down your project into manageable tasks</div>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Invite Team</div>
                                    <div className="text-[#9BA4B0] text-sm">Collaborate with your team members</div>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#10B981]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Track Progress</div>
                                    <div className="text-[#9BA4B0] text-sm">Monitor project milestones and completion</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}