import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import TextareaInput from '@/Components/TextareaInput';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create({ auth, projects, users }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        project_id: '',
        assigned_user_id: '',
        due_date: '',
        priority: 'medium',
        status: 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('task.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E6EDF3]">
                            Create New Task
                        </h2>
                        <p className="text-[#9BA4B0] mt-1">Create a new task to track work and assign to team members</p>
                    </div>
                    <Link
                        href={route('task.index')}
                        className="inline-flex items-center text-sm text-[#9BA4B0] hover:text-[#E6EDF3] transition-colors duration-300"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Tasks
                    </Link>
                </div>
            }
        >
            <Head title="Create Task" />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Task Creation Card */}
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
                                    <h3 className="text-lg font-semibold text-[#E6EDF3]">Task Details</h3>
                                    <p className="text-sm text-[#9BA4B0]">Fill in the information below to create your new task</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                {/* Task Name */}
                                <div className="space-y-2">
                                    <InputLabel 
                                        htmlFor="name" 
                                        value="Task Title" 
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
                                        placeholder="Enter a clear and descriptive task title"
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                    <p className="text-xs text-[#6E7781]">
                                        Be specific about what needs to be accomplished
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
                                        placeholder="Describe the task requirements, objectives, acceptance criteria, and any important details..."
                                    />
                                    <InputError message={errors.description} className="mt-1" />
                                    <p className="text-xs text-[#6E7781]">
                                        Provide enough detail for the assignee to understand what needs to be done
                                    </p>
                                </div>

                                {/* Project and Assignee */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <InputLabel 
                                            htmlFor="project_id" 
                                            value="Project" 
                                            className="text-[#E6EDF3] font-semibold"
                                        />
                                        <SelectInput
                                            id="project_id"
                                            name="project_id"
                                            className="w-full"
                                            value={data.project_id}
                                            onChange={(e) => setData('project_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select Project</option>
                                            {projects.map((project) => (
                                                <option key={project.id} value={project.id}>
                                                    {project.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.project_id} className="mt-1" />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel 
                                            htmlFor="assigned_user_id" 
                                            value="Assign To" 
                                            className="text-[#E6EDF3] font-semibold"
                                        />
                                        <SelectInput
                                            id="assigned_user_id"
                                            name="assigned_user_id"
                                            className="w-full"
                                            value={data.assigned_user_id}
                                            onChange={(e) => setData('assigned_user_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select User</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.assigned_user_id} className="mt-1" />
                                    </div>
                                </div>

                                {/* Due Date, Priority, and Status */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full"
                                                onChange={(e) => setData('due_date', e.target.value)}
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-[#6E7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <InputError message={errors.due_date} className="mt-1" />
                                        <p className="text-xs text-[#6E7781]">
                                            Set a realistic deadline for this task
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel 
                                            htmlFor="priority" 
                                            value="Priority" 
                                            className="text-[#E6EDF3] font-semibold"
                                        />
                                        <SelectInput
                                            id="priority"
                                            name="priority"
                                            className="w-full"
                                            value={data.priority}
                                            onChange={(e) => setData('priority', e.target.value)}
                                            required
                                        >
                                            <option value="low" className="text-[#10B981]">Low</option>
                                            <option value="medium" className="text-[#F59E0B]">Medium</option>
                                            <option value="high" className="text-[#EF4444]">High</option>
                                        </SelectInput>
                                        <p className="text-xs text-[#6E7781]">
                                            Set the urgency level for this task
                                        </p>
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
                                            required
                                        >
                                            <option value="pending" className="text-[#3B82F6]">Pending</option>
                                            <option value="in_progress" className="text-[#F59E0B]">In Progress</option>
                                            <option value="completed" className="text-[#10B981]">Completed</option>
                                        </SelectInput>
                                        <p className="text-xs text-[#6E7781]">
                                            Set the initial status for this task
                                        </p>
                                    </div>
                                </div>

                                {/* Task Creation Tips */}
                                <div className="bg-[#1E242D] rounded-xl p-4 border border-[#2A2F36]">
                                    <h4 className="text-sm font-semibold text-[#E6EDF3] mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Task Creation Tips
                                    </h4>
                                    <ul className="text-sm text-[#9BA4B0] space-y-2">
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mr-2 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Use clear, action-oriented titles (e.g., "Design login page" instead of "Login page")</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mr-2 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Include specific acceptance criteria in the description</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-4 h-4 mr-2 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Assign tasks to the most appropriate team member with the required skills</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-6 border-t border-[#2A2F36]">
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('task.index')}
                                            className="inline-flex items-center text-sm text-[#9BA4B0] hover:text-[#E6EDF3] transition-colors duration-300 group"
                                        >
                                            <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back to Tasks
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
                                                    Create Task
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
                                    <div className="text-[#E6EDF3] font-medium">Track Progress</div>
                                    <div className="text-[#9BA4B0] text-sm">Monitor task status and updates</div>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">Add Comments</div>
                                    <div className="text-[#9BA4B0] text-sm">Communicate with your team</div>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36]">
                                <div className="p-2 bg-[#10B981]/10 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[#E6EDF3] font-medium">View Reports</div>
                                    <div className="text-[#9BA4B0] text-sm">Analyze task performance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}