import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import CreateTestingButton from "@/Components/CreateTestingButton.jsx";

export default function Dashboard(auth) {

    return (
        <AuthenticatedLayout
            user={auth.user}

            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Prehľad
                </h2>
            }
            rightHeader={
                <CreateTestingButton user={auth.user} />
            }
        >
            <Head title="Prehľad" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Ste prihlásený!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
