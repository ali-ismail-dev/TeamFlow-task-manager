// resources/js/Pages/Project/Edit.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import TextareaInput from '@/Components/TextareaInput';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Project "{project.name}"
                    </h2>
                </div>
            }
        >
            <Head title="Edit Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Project Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextareaInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="due_date" value="Due Date" />
                                        <TextInput
                                            id="due_date"
                                            type="date"
                                            name="due_date"
                                            value={data.due_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('due_date', e.target.value)}
                                        />
                                        <InputError message={errors.due_date} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="status" value="Status" />
                                        <SelectInput
                                            id="status"
                                            name="status"
                                            className="mt-1 block w-full"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </SelectInput>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('project.index')}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
                                        disabled={processing}
                                    >
                                        {processing ? 'Updating...' : 'Update Project'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}