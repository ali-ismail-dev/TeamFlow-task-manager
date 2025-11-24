import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constants";

export default function Index({ auth, tasks, projects = [], queryParams = null }) {
    queryParams = queryParams || {};

    // Handle project_id from URL when component mounts
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
            // Cycle through: asc → desc → none
            if (queryParams.sortDirections === 'asc') {
                queryParams.sortDirections = 'desc';
            } else if (queryParams.sortDirections === 'desc') {
                // Remove sorting for this field
                delete queryParams.sortField;
                delete queryParams.sortDirections;
            } else {
                // This case shouldn't happen, but just in case
                queryParams.sortDirections = 'asc';
            }
        } else {
            // New field, set to asc
            queryParams.sortField = name;
            queryParams.sortDirections = 'asc';
        }
        router.get(route("task.index"), queryParams, { preserveState: true });
    };

    // Helper function to render sort indicator
    const SortIndicator = ({ field }) => {
        if (queryParams.sortField !== field) return null;
        if (!queryParams.sortDirections) return null; // No sort direction = no indicator
        
        return (
            <span className="ml-1">
                {queryParams.sortDirections === 'asc' ? '▲' : '▼'}
            </span>
        );
    };
    
    // Helper function to get sort header class
    const getSortHeaderClass = (field) => {
        return `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider 
            cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
            ${queryParams.sortField === field 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-500 dark:text-gray-400'}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Tasks
                    </h2>
                    <Link
                        href={route('task.create')}
                        className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add New Task
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-visible bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Search by Title
                                        </label>
                                            <TextInput
        className="w-full"
        placeholder="Search tasks by name..."
        onKeyPress={(e) => onKeyPress('name', e)}
        defaultValue={queryParams.name}
    />
                                    </div>
                                       <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                                </div>
                            </div>

                            <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
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
                                                    Name
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {tasks.data.map((task) => (
                                            <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {task.id}
                                                </td>
                                                <td className="px-6 py-4 max-w-xs whitespace-normal break-words text-sm font-medium text-gray-900 dark:text-white">
                                                    <Link 
                                                        href={route('task.show', task.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        {task.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {task.project?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {task.assigned_user?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {task.due_date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span 
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            PROJECT_STATUS_CLASS_MAP[task.status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                        }`}
                                                    >
                                                        {PROJECT_STATUS_TEXT_MAP[task.status] || task.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span 
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            TASK_PRIORITY_CLASS_MAP[task.priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                        }`}
                                                    >
                                                        {TASK_PRIORITY_TEXT_MAP[task.priority] || task.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="space-x-2">
                                                        <Link
                                                            href={route('task.edit', task.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={(e) => {
                                                                if (confirm('Are you sure you want to delete this task?')) {
                                                                    router.delete(route('task.destroy', task.id));
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {tasks.data.length === 0 && (
                                            <tr>
                                                <td 
                                                    colSpan="8" 
                                                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                                >
                                                    No tasks found. Create your first task!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {tasks.links && tasks.links.length > 3 && (
                                <div className="mt-4">
                                    <nav className="flex items-center justify-between" aria-label="Pagination">
                                        <div className="hidden sm:block">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                Showing <span className="font-medium">{tasks.from}</span> to{' '}
                                                <span className="font-medium">{tasks.to}</span> of{' '}
                                                <span className="font-medium">{tasks.total}</span> results
                                            </p>
                                        </div>
                                        <div className="flex-1 flex justify-between sm:justify-end">
                                            {tasks.links.map((link, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        if (link.url) {
                                                            const url = new URL(link.url);
                                                            const params = new URLSearchParams(url.search);
                                                            
                                                            // Preserve all query parameters
                                                            Object.entries(queryParams).forEach(([key, value]) => {
                                                                if (key !== 'page' && value) {
                                                                    params.set(key, value);
                                                                }
                                                            });
                                                            
                                                            router.get(`${url.pathname}?${params.toString()}`);
                                                        }
                                                    }}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                        link.active
                                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-gray-700 dark:text-white'
                                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                                                    } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                        index === tasks.links.length - 1 ? 'rounded-r-md' : ''
                                                    } border`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
