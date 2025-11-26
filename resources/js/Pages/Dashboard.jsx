import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, my_Pending_tasks, total_pending, my_Progress_tasks, my_completed_tasks }) {
    my_Pending_tasks = my_Pending_tasks || 0;
    my_Progress_tasks = my_Progress_tasks || 0;
    my_completed_tasks = my_completed_tasks || 0;
    
    const total_tasks = my_Pending_tasks + my_Progress_tasks + my_completed_tasks;
    const completion_rate = total_tasks > 0 ? Math.round((my_completed_tasks / total_tasks) * 100) : 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E6EDF3]">
                            Dashboard
                        </h2>
                        <p className="text-[#9BA4B0] mt-1">Welcome back, {auth.user.name}! Here's your task overview.</p>
                    </div>
                    <Link
                        href={route('task.index')}
                        className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-[#2563EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22]"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        View All Tasks
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Tasks Card */}
                        <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#3A414B]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#9BA4B0] text-sm font-medium">Total Tasks</p>
                                    <p className="text-3xl font-bold text-[#E6EDF3] mt-2">{total_tasks}</p>
                                </div>
                                <div className="p-3 bg-[#3B82F6]/10 rounded-xl">
                                    <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center text-sm text-[#6E7781]">
                                    <span>Completion Rate: {completion_rate}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Pending Tasks Card */}
                        <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#3A414B] group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#9BA4B0] text-sm font-medium">Pending Tasks</p>
                                    <p className="text-3xl font-bold text-[#3B82F6] mt-2">{my_Pending_tasks}</p>
                                </div>
                                <div className="p-3 bg-[#3B82F6]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-[#2A2F36] rounded-full h-2">
                                    <div 
                                        className="bg-[#3B82F6] h-2 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${total_tasks > 0 ? (my_Pending_tasks / total_tasks) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* In Progress Card */}
                        <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#3A414B] group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#9BA4B0] text-sm font-medium">In Progress</p>
                                    <p className="text-3xl font-bold text-[#F59E0B] mt-2">{my_Progress_tasks}</p>
                                </div>
                                <div className="p-3 bg-[#F59E0B]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-[#2A2F36] rounded-full h-2">
                                    <div 
                                        className="bg-[#F59E0B] h-2 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${total_tasks > 0 ? (my_Progress_tasks / total_tasks) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Completed Tasks Card */}
                        <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#3A414B] group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#9BA4B0] text-sm font-medium">Completed Tasks</p>
                                    <p className="text-3xl font-bold text-[#10B981] mt-2">{my_completed_tasks}</p>
                                </div>
                                <div className="p-3 bg-[#10B981]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-[#2A2F36] rounded-full h-2">
                                    <div 
                                        className="bg-[#10B981] h-2 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${total_tasks > 0 ? (my_completed_tasks / total_tasks) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Completion Progress */}
                        <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">Task Completion Progress</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#9BA4B0] text-sm">Overall Progress</span>
                                    <span className="text-[#E6EDF3] font-medium">{completion_rate}%</span>
                                </div>
                                <div className="w-full bg-[#2A2F36] rounded-full h-3">
                                    <div 
                                        className="bg-gradient-to-r from-[#3B82F6] via-[#F59E0B] to-[#10B981] h-3 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${completion_rate}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E7781]">
                                    <span>0%</span>
                                    <span>50%</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href={route('task.create')}
                                    className="flex flex-col items-center justify-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36] hover:border-[#3B82F6] hover:bg-[#2A2F36] transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-[#3B82F6]/10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <span className="text-[#E6EDF3] text-sm font-medium">New Task</span>
                                </Link>
                                <Link
                                    href={route('project.index')}
                                    className="flex flex-col items-center justify-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36] hover:border-[#10B981] hover:bg-[#2A2F36] transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-[#10B981]/10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                        </svg>
                                    </div>
                                    <span className="text-[#E6EDF3] text-sm font-medium">Projects</span>
                                </Link>
                                <Link
                                    href={route('task.index', { status: 'pending' })}
                                    className="flex flex-col items-center justify-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36] hover:border-[#3B82F6] hover:bg-[#2A2F36] transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-[#3B82F6]/10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-[#E6EDF3] text-sm font-medium">Pending</span>
                                </Link>
                                <Link
                                    href={route('task.index', { status: 'completed' })}
                                    className="flex flex-col items-center justify-center p-4 bg-[#1E242D] rounded-xl border border-[#2A2F36] hover:border-[#10B981] hover:bg-[#2A2F36] transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-[#10B981]/10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-[#E6EDF3] text-sm font-medium">Completed</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Empty State - If no tasks */}
                    {total_tasks === 0 && (
                        <div className="mt-8 text-center py-12">
                            <div className="bg-[#161B22] rounded-2xl border border-[#2A2F36] p-8">
                                <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-[#E6EDF3] mb-2">No tasks yet</h3>
                                <p className="text-[#9BA4B0] mb-6">Get started by creating your first task</p>
                                <Link
                                    href={route('task.create')}
                                    className="inline-flex items-center px-6 py-3 bg-[#3B82F6] text-white font-medium rounded-lg hover:bg-[#2563EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#161B22]"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create Your First Task
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}