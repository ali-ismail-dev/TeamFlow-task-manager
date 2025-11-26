import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, my_Pending_tasks, total_pending, my_Progress_tasks, my_completed_tasks }) {
    my_Pending_tasks = my_Pending_tasks || 0;
    my_Progress_tasks = my_Progress_tasks || 0;
    my_completed_tasks = my_completed_tasks || 0;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-3">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-amber-500 dark:text-amber-500"> Pending Tasks</h3>
                            <p className="p-2 text-2xl font-semibold text-amber-500 dark:text-amber-500">{my_Pending_tasks}</p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-500"> Progress Tasks</h3>
                            <p className="p-2 text-2xl font-semibold text-blue-500 dark:text-blue-500">{my_Progress_tasks}</p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-green-500 dark:text-green-500"> Completed Tasks</h3>
                            <p className="p-2 text-2xl font-semibold text-green-500 dark:text-green-500">{my_completed_tasks}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
