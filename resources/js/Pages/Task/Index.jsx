import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constants";

export default function Index({ auth, tasks, projects = [], queryParams = null }) {
    queryParams = queryParams || {};

    useEffect(() => {
        if (queryParams.project_id && !queryParams.project_id) {
            searchFieldChange('project_id', queryParams.project_id);
        }
    }, []);

    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("task.index"), queryParams, { preserveState: true });
    };

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') {
            searchFieldChange(name, e.target.value);
        }
    };

    const sortChanged = (name) => {
        if (name === queryParams.sortField) {
            if (queryParams.sortDirections === 'asc') {
                queryParams.sortDirections = 'desc';
            } else if (queryParams.sortDirections === 'desc') {
                delete queryParams.sortField;
                delete queryParams.sortDirections;
            } else {
                queryParams.sortDirections = 'asc';
            }
        } else {
            queryParams.sortField = name;
            queryParams.sortDirections = 'asc';
        }
        router.get(route("task.index"), queryParams, { preserveState: true });
    };

    const SortIndicator = ({ field }) => {
        if (queryParams.sortField !== field) return null;
        if (!queryParams.sortDirections) return null;
        
        return (
            <span className="ml-1 text-[#3B82F6]">
                {queryParams.sortDirections === 'asc' ? '▲' : '▼'}
            </span>
        );
    };
    
    const getSortHeaderClass = (field) => {
        return `px-6 py-4 text-left text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#1E242D] ${
            queryParams.sortField === field 
                ? 'text-[#3B82F6]' 
                : 'text-[#9BA4B0]'
        }`;
    };

    const deleteTask = (task) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('task.destroy', task.id));
        }
    };

    const getStatusColors = (status) => {
        const colors = {
            pending: { bg: 'bg-[#3B82F6]', text: 'text-white' },
            in_progress: { bg: 'bg-[#F59E0B]', text: 'text-white' },
            completed: { bg: 'bg-[#10B981]', text: 'text-white' }
        };
        return colors[status] || { bg: 'bg-[#6E7781]', text: 'text-white' };
    };

    const getPriorityColors = (priority) => {
        const colors = {
            low: { bg: 'bg-[#10B981]', text: 'text-white' },
            medium: { bg: 'bg-[#F59E0B]', text: 'text-white' },
            high: { bg: 'bg-[#EF4444]', text: 'text-white' }
        };
        return colors[priority] || { bg: 'bg-[#6E7781]', text: 'text-white' };
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E6EDF3]">
                            Tasks
                        </h2>
                        <p className="text-[#9BA4B0] mt-1">Manage and track all your tasks</p>
                    </div>
                    <Link
                        href={route('task.create')}
                        className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-[#2563EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] group"
                    >
                        <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Task
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Tasks Card */}
                    <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                        <div className="p-6">
                            {/* Filters Section */}
                            <div className="mb-6 space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-[#E6EDF3]">
                                            Search Tasks
                                        </label>
                                        <TextInput
                                            className="w-full"
                                            placeholder="Search tasks by name..."
                                            onKeyPress={(e) => onKeyPress('name', e)}
                                            defaultValue={queryParams.name}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-[#E6EDF3]">
                                            Filter by Project
                                        </label>
                                        <SelectInput
                                            className="w-full"
                                            value={queryParams.project_id || ''}
                                            onChange={(e) => searchFieldChange('project_id', e.target.value)}
                                        >
                                            <option value="">All Projects</option>
                                            {projects.map((project) => (
                                                <option key={project.id} value={project.id}>
                                                    {project.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-[#E6EDF3]">
                                            Filter by Priority
                                        </label>
                                        <SelectInput
                                            className="w-full"
                                            value={queryParams.priority || ''}
                                            onChange={(e) => searchFieldChange('priority', e.target.value)}
                                        >
                                            <option value="">All Priorities</option>
                                            {Object.entries(TASK_PRIORITY_TEXT_MAP).map(([value, label]) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </SelectInput>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-[#E6EDF3]">
                                            Filter by Status
                                        </label>
                                        <SelectInput
                                            className="w-full"
                                            value={queryParams.status || ''}
                                            onChange={(e) => searchFieldChange('status', e.target.value)}
                                        >
                                            <option value="">All Status</option>
                                            {Object.entries(PROJECT_STATUS_TEXT_MAP).map(([value, label]) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </SelectInput>
                                    </div>
                                </div>
                            </div>

                            {/* Table Container */}
                            <div className="overflow-x-auto rounded-xl border border-[#2A2F36]">
                                <table className="min-w-full divide-y divide-[#2A2F36]">
                                    {/* Table Header */}
                                    <thead className="bg-[#1E242D]">
                                        <tr>
                                            <th
                                                scope="col"
                                                className={getSortHeaderClass('id')}
                                                onClick={() => sortChanged('id')}
                                            >
                                                <div className="flex items-center">
                                                    ID
                                                    <SortIndicator field="id" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className={getSortHeaderClass('name')}
                                                onClick={() => sortChanged('name')}
                                            >
                                                <div className="flex items-center">
                                                    Task Name
                                                    <SortIndicator field="name" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className={getSortHeaderClass('project_id')}
                                                onClick={() => sortChanged('project_id')}
                                            >
                                                <div className="flex items-center">
                                                    Project
                                                    <SortIndicator field="project_id" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className={getSortHeaderClass('assigned_user_id')}
                                                onClick={() => sortChanged('assigned_user_id')}
                                            >
                                                <div className="flex items-center">
                                                    Assigned To
                                                    <SortIndicator field="assigned_user_id" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className={getSortHeaderClass('due_date')}
                                                onClick={() => sortChanged('due_date')}
                                            >
                                                <div className="flex items-center">
                                                    Due Date
                                                    <SortIndicator field="due_date" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className={getSortHeaderClass('status')}
                                                onClick={() => sortChanged('status')}
                                            >
                                                <div className="flex items-center">
                                                    Status
                                                    <SortIndicator field="status" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className={getSortHeaderClass('priority')}
                                                onClick={() => sortChanged('priority')}
                                            >
                                                <div className="flex items-center">
                                                    Priority
                                                    <SortIndicator field="priority" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[#9BA4B0]">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="divide-y divide-[#2A2F36] bg-[#161B22]">
                                        {tasks.data.map((task) => {
                                            const statusColors = getStatusColors(task.status);
                                            const priorityColors = getPriorityColors(task.priority);
                                            const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed';
                                            
                                            return (
                                                <tr key={task.id} className="hover:bg-[#1E242D] transition-colors duration-300 group">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-[#6E7781]">
                                                            #{task.id}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 max-w-xs whitespace-normal">
                                                        <Link 
                                                            href={route('task.show', task.id)}
                                                            className="inline-flex items-center text-[#E6EDF3] font-medium hover:text-[#3B82F6] transition-colors duration-300 group-hover:translate-x-1 transition-transform duration-300"
                                                        >
                                                            <svg className="w-4 h-4 mr-2 text-[#6E7781] group-hover:text-[#3B82F6] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                            </svg>
                                                            {task.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-[#E6EDF3]">
                                                            {task.project?.name || 'No Project'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {task.assigned_user ? (
                                                                <>
                                                                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] flex items-center justify-center text-white text-xs font-bold mr-2">
                                                                        {task.assigned_user.name.charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <div className="text-sm text-[#E6EDF3]">
                                                                        {task.assigned_user.name}
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <span className="text-sm text-[#6E7781]">Unassigned</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className={`text-sm ${isOverdue ? 'text-[#EF4444] font-semibold' : 'text-[#E6EDF3]'}`}>
                                                            {task.due_date}
                                                            {isOverdue && (
                                                                <span className="ml-1 text-xs bg-[#EF4444] text-white px-2 py-1 rounded-full">Overdue</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span 
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}
                                                        >
                                                            {PROJECT_STATUS_TEXT_MAP[task.status] || task.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span 
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors.bg} ${priorityColors.text}`}
                                                        >
                                                            {TASK_PRIORITY_TEXT_MAP[task.priority] || task.priority}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-3">
                                                            <Link
                                                                href={route('task.edit', task.id)}
                                                                className="inline-flex items-center text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-300 group"
                                                            >
                                                                <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                Edit
                                                            </Link>
                                                            <button 
                                                                onClick={() => deleteTask(task)}
                                                                className="inline-flex items-center text-[#EF4444] hover:text-[#DC2626] transition-colors duration-300 group"
                                                            >
                                                                <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {/* Empty State */}
                                        {tasks.data.length === 0 && (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="w-16 h-16 bg-[#1E242D] rounded-full flex items-center justify-center mb-4">
                                                            <svg className="w-8 h-8 text-[#6E7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-[#E6EDF3] mb-2">No tasks found</h3>
                                                        <p className="text-[#9BA4B0] mb-6">Get started by creating your first task</p>
                                                        <Link
                                                            href={route('task.create')}
                                                            className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-[#2563EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22]"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                            Create Task
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {tasks.data.length > 0 && tasks.meta?.links && (
                                <div className="mt-6">
                                    <Pagination links={tasks.meta.links} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-[#161B22] rounded-xl border border-[#2A2F36] p-4 text-center">
                            <div className="text-2xl font-bold text-[#E6EDF3]">{tasks.meta?.total || 0}</div>
                            <div className="text-[#9BA4B0] text-sm">Total Tasks</div>
                        </div>
                        <div className="bg-[#161B22] rounded-xl border border-[#2A2F36] p-4 text-center">
                            <div className="text-2xl font-bold text-[#3B82F6]">{tasks.data.filter(t => t.status === 'pending').length}</div>
                            <div className="text-[#9BA4B0] text-sm">Pending</div>
                        </div>
                        <div className="bg-[#161B22] rounded-xl border border-[#2A2F36] p-4 text-center">
                            <div className="text-2xl font-bold text-[#F59E0B]">{tasks.data.filter(t => t.status === 'in_progress').length}</div>
                            <div className="text-[#9BA4B0] text-sm">In Progress</div>
                        </div>
                        <div className="bg-[#161B22] rounded-xl border border-[#2A2F36] p-4 text-center">
                            <div className="text-2xl font-bold text-[#10B981]">{tasks.data.filter(t => t.status === 'completed').length}</div>
                            <div className="text-[#9BA4B0] text-sm">Completed</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}