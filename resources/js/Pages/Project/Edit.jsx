import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import TextareaInput from '@/Components/TextareaInput';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ auth, project }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: project.name || '',
        description: project.description || '',
        due_date: project.due_date ? new Date(project.due_date).toISOString().split('T')[0] : '',
        status: project.status || 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('project.update', project.id));
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'text-[#3B82F6]',
            in_progress: 'text-[#F59E0B]',
            completed: 'text-[#10B981]',
            cancelled: 'text-[#EF4444]'
        };
        return colors[status] || 'text-[#6E7781]';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E6EDF3]">
                            Edit Project
                        </h2>
                        <p className="text-[#9BA4B0] mt-1">
                            Update project details for "<span className={`font-medium ${getStatusColor(project.status)}`}>{project.name}</span>"
                        </p>
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
            <Head title={`Edit ${project.name}`} />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Project Edit Card */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                        {/* Header with accent border */}
                        <div className="border-b border-[#2A2F36] px-6 py-4 bg-[#1E242D]">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#3B82F6]/10 rounded-lg">
                                    <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#E6EDF3]">Project Information</h3>
                                    <p className="text-sm text-[#9BA4B0]">Update your project details below</p>
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
                                        placeholder="Enter project name"
                                    />
                                    <InputError message={errors.name} className="mt-1" />
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
                                        placeholder="Describe the project goals, requirements, and any important details..."
                                    />
                                    <InputError message={errors.description} className="mt-1" />
                                </div>

                                {/* Due Date and Status */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <InputLabel 
                                            htmlFor="due_date" 
                                            value="Due Date" 
                                            className="text-[#E6EDF3] font-semibold"
                                        />
                                        <div className="relative">
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
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel 
                                            htmlFor="status" 
                                            value="Status" 
                                            className="text-[#E6EDF3] font-semibold"
                                        />
                                        <SelectInput
                                            id="status"
                                            name="status"
                                            className="w-full"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                        >
                                            <option value="pending" className="text-[#3B82F6]">Pending</option>
                                            <option value="in_progress" className="text-[#F59E0B]">In Progress</option>
                                            <option value="completed" className="text-[#10B981]">Completed</option>
                                            <option value="cancelled" className="text-[#EF4444]">Cancelled</option>
                                        </SelectInput>
                                        <InputError message={errors.status} className="mt-1" />
                                    </div>
                                </div>

                                {/* Project Meta Information */}
                                <div className="bg-[#1E242D] rounded-xl p-4 border border-[#2A2F36]">
                                    <h4 className="text-sm font-semibold text-[#E6EDF3] mb-3">Project Details</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-[#9BA4B0]">Project ID:</span>
                                            <div className="text-[#E6EDF3] font-medium">#{project.id}</div>
                                        </div>
                                        <div>
                                            <span className="text-[#9BA4B0]">Created:</span>
                                            <div className="text-[#E6EDF3] font-medium">{project.created_at}</div>
                                        </div>
                                        <div>
                                            <span className="text-[#9BA4B0]">Last Updated:</span>
                                            <div className="text-[#E6EDF3] font-medium">{project.updated_at}</div>
                                        </div>
                                        <div>
                                            <span className="text-[#9BA4B0]">Created By:</span>
                                            <div className="text-[#E6EDF3] font-medium">{project.createdBy?.name || 'N/A'}</div>
                                        </div>
                                    </div>
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
                                                    Updating...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Update Project
                                                </span>
                                            )}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Quick Stats Card */}
                    <div className="mt-6 bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">Project Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                href={route('task.index', { project_id: project.id })}
                                className="flex items-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36] hover:border-[#3B82F6] hover:bg-[#2A2F36] transition-all duration-300 group"
                            >
                                <div className="p-2 bg-[#3B82F6]/10 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">View Tasks</div>
                                    <div className="text-[#9BA4B0] text-sm">Manage project tasks</div>
                                </div>
                            </Link>
                            <Link
                                href={route('task.create', { project_id: project.id })}
                                className="flex items-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36] hover:border-[#10B981] hover:bg-[#2A2F36] transition-all duration-300 group"
                            >
                                <div className="p-2 bg-[#10B981]/10 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Add Task</div>
                                    <div className="text-[#9BA4B0] text-sm">Create new task</div>
                                </div>
                            </Link>
                            <Link
                                href={route('project.index')}
                                className="flex items-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36] hover:border-[#F59E0B] hover:bg-[#2A2F36] transition-all duration-300 group"
                            >
                                <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">All Projects</div>
                                    <div className="text-[#9BA4B0] text-sm">Back to projects list</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}