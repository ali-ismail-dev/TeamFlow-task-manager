import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";


export default function index({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("project.index"), queryParams, { preserveState: true });
    }

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') {
            searchFieldChange(name, e.target.value);
        }
    }

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
        router.get(route("project.index"), queryParams, { preserveState: true });
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
          Projects
        </h2>
        <Link href={route('project.create')}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded"
        >
            Add Project
        </Link>
       </div>

      }
    >
        <Head title="Projects" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-visible bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                       

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
                                            Projects
                                            <SortIndicator field="name" />
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
                                        className={getSortHeaderClass('created_at')}
                                        onClick={() => sortChanged('created_at')}
                                    >
                                        <div className="flex items-center">
                                            Create Date
                                            <SortIndicator field="created_at" />
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
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    >
                                        Created By
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    ></th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    >
                                      <TextInput 
                                            className="w-full" 
                                            placeholder="Project Name"
                                            defaultValue={queryParams.name || ''}
                                            onChange={e => searchFieldChange('name', e.target.value)}
                                            onBlur={e => searchFieldChange('name', e.target.value)}
                                            onKeyPress={e => onKeyPress('name', e)}
                                            />  
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    >
                                        <div className="relative">
                                            <SelectInput 
                                                className="w-full"
                                                value={queryParams.status || ''}

                                                onChange={e => {
                                                    console.log('Selected:', e.target.value);
                                                    searchFieldChange('status', e.target.value);
                                                }}
                                            >
                                                <option value="">All</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    ></th>
                                     <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    ></th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    ></th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {projects.data.map((project) => (
                                    <tr key={project.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-100">
                                                {project.id}
                                            </div>
                                        </td>
                                    
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link 
                                                href={route('task.index', { project_id: project.id })}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span 
                                                className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-100">
                                                {project.created_at}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-100">
                                                {project.due_date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-100">
                                                {project.createdBy.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-100">
                                                <Link href={route('project.edit', project.id)}
                                                    className="p-2 text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                </Link>
                                                <Link 
                                                    href={route('project.destroy', project.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={projects.meta.links} />
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  );
}
