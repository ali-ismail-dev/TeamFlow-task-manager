import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        description: '',
        status: '',
        due_date: ''
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('projects.create'));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Project
                </h2>
            }
        >
            <Head title="Create Project" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form 
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-800 shadow-sm"
                            >
                                <div>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="block w-full mt-1"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}>

                                        </TextInput>
                                </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
        
    );
}