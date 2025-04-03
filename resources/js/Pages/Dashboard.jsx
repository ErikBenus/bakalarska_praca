import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import CreateTestingButton from "@/Components/CreateTestingButton.jsx";
import {usePermissions} from "@/Components/UsePermissions.jsx";
import EasyForceResults from "@/Components/TestResults/EasyForceResults.jsx";
import ResultsTestContainer from "@/Components/ResultsTestContainer.jsx";

export default function Dashboard(auth) {

    const { can } = usePermissions();

    if (can('see trainer dashboard')) {
        return (
            <AuthenticatedLayout
                user={auth.user}

                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Prehľad
                    </h2>
                }
                rightHeader={
                    <CreateTestingButton user={auth.user}/>
                }
            >
                <Head title="Prehľad"/>

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

    if (can('see client dashboard')) {
        return (
            <AuthenticatedLayout
                user={auth.user}

                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Prehľad
                    </h2>
                }
            >
                <Head title="Prehľad"/>

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Vitaje, vo svojom prehľade testovaní!
                                </h2>
                                <p className="mb-4">Tu sú vaše testy, ktoré ste vykonali:</p>
                                <ResultsTestContainer title="Easy Force" component={EasyForceResults} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }
}
