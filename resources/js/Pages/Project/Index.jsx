import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function index({ auth, projects, queryParams = null, success }) {
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
        router.get(route("project.index"), queryParams, { preserveState: true });
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

    const deleteProject = (project) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(route('project.destroy', project.id));
        }
    }

    const getStatusColors = (status) => {
        const colors = {
            pending: { bg: 'bg-[#3B82F6]', text: 'text-white' },
            in_progress: { bg: 'bg-[#F59E0B]', text: 'text-white' },
            completed: { bg: 'bg-[#10B981]', text: 'text-white' }
        };
        return colors[status] || { bg: 'bg-[#6E7781]', text: 'text-white' };
    };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
       <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-[#E6EDF3]">
                Projects
            </h2>
            <p className="text-[#9BA4B0] mt-1">Manage and track your projects</p>
         </div>
        <Link 
            href={route('project.create')}
            className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-[#2563EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22] group"
        >
            <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Project
        </Link>
       </div>
      }
    >
        <Head title="Projects" />

        <div className="py-8">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl text-[#10B981] text-sm flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {success}
                    </div>
                )}

                {/* Projects Card */}
                <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] shadow-lg overflow-hidden">
                    <div className="p-6">
                        {/* Table Container */}
                        <div className="overflow-x-auto rounded-xl border border-[#2A2F36]">
                            <table className="min-w-full divide-y divide-[#2A2F36]">
                                {/* Table Header - Sortable */}
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
                                                Project Name
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
                                            className="px-6 py-4 text-left text-sm font-semibold text-[#9BA4B0]"
                                        >
                                            Created By
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-sm font-semibold text-[#9BA4B0]"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                {/* Table Header - Filters */}
                                <thead className="bg-[#1E242D] border-t border-[#2A2F36]">
                                    <tr>
                                        <th className="px-6 py-3"></th>
                                        <th className="px-6 py-3">
                                          <TextInput 
                                                className="w-full" 
                                                placeholder="Search projects..."
                                                defaultValue={queryParams.name || ''}
                                                onChange={e => searchFieldChange('name', e.target.value)}
                                                onBlur={e => searchFieldChange('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)}
                                                />  
                                        </th>
                                        <th className="px-6 py-3">
                                            <SelectInput 
                                                className="w-full"
                                                value={queryParams.status || ''}
                                                onChange={e => searchFieldChange('status', e.target.value)}
                                            >
                                                <option value="">All Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-6 py-3"></th>
                                         <th className="px-6 py-3"></th>
                                        <th className="px-6 py-3"></th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-[#2A2F36] bg-[#161B22]">
                                    {projects.data.map((project) => {
                                        const statusColors = getStatusColors(project.status);
                                        return (
                                            <tr key={project.id} className="hover:bg-[#1E242D] transition-colors duration-300">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-[#6E7781]">
                                                        #{project.id}
                                                    </div>
                                                </td>
                                            
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link 
                                                        href={route('task.index', { project_id: project.id })}
                                                        className="inline-flex items-center text-[#E6EDF3] font-medium hover:text-[#3B82F6] transition-colors duration-300 group"
                                                    >
                                                        <svg className="w-4 h-4 mr-2 text-[#6E7781] group-hover:text-[#3B82F6] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                                        </svg>
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span 
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-[#E6EDF3]">
                                                        {project.created_at}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-[#E6EDF3]">
                                                        {project.due_date}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] flex items-center justify-center text-white text-xs font-bold mr-2">
                                                            {project.createdBy.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="text-sm text-[#E6EDF3]">
                                                            {project.createdBy.name}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <Link 
                                                            href={route('project.edit', project.id)}
                                                            className="inline-flex items-center text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-300 group"
                                                        >
                                                            <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </Link>
                                                        <button 
                                                            onClick={(e) => deleteProject(project)}
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
                                </tbody>
                            </table>

                            {/* Empty State */}
                            {projects.data.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-[#1E242D] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#6E7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#E6EDF3] mb-2">No projects found</h3>
                                    <p className="text-[#9BA4B0] mb-6">Get started by creating your first project</p>
                                    <Link
                                        href={route('project.create')}
                                        className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-[#2563EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22]"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Create Project
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {projects.data.length > 0 && (
                            <div className="mt-6">
                                <Pagination links={projects.meta.links} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  );
}