import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import CreateTestingButton from "@/Components/CreateTestingButton.jsx";
import {usePermissions} from "@/Components/UsePermissions.jsx";
import EasyForceResults from "@/Components/TestResults/EasyForceResults.jsx";
import ResultsTestContainer from "@/Components/ResultsTestContainer.jsx";
import MaxPowerResults from "@/Components/TestResults/MaxPowerResults.jsx";
import React, {useState} from "react";
import YBalanceTestResults from "@/Components/TestResults/YBalanceTestResults.jsx";
import AerobicCapacityResults from "@/Components/TestResults/AerobicCapacityResults.jsx";
import SpeedAbilityResults from "@/Components/TestResults/SpeedAbilityResults.jsx";
import MuscleEnduranceResults from "@/Components/TestResults/MuscleEnduranceResults.jsx";
import ExplosivePowerResults from "@/Components/TestResults/ExplosivePowerResults.jsx";
import JumpProfileResults from "@/Components/TestResults/JumpProfileResults.jsx";
import MobilityFlexibilityResults from "@/Components/TestResults/MobilityFlexibilityResults.jsx";
import SpecialTestResults from "@/Components/TestResults/SpecialTestResults.jsx";

export default function Dashboard() {

    const { can } = usePermissions();
    const { auth } = usePage().props;
    const [activeSection, setActiveSection] = useState();

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        'Easy Force': EasyForceResults,
        'Maximálna sila': MaxPowerResults,
        'Y Balance Test': YBalanceTestResults,
        'Aeróbna kapacita': AerobicCapacityResults,
        'Rychlostné schopnosti': SpeedAbilityResults,
        'Svalová vytrvalosť': MuscleEnduranceResults,
        'Vybušná sila': ExplosivePowerResults,
        'Skokový profil': JumpProfileResults,
        'Mobilita a flexibilita': MobilityFlexibilityResults,
        'Špeciálne testy': SpecialTestResults,
    };

    // const renderSelectedComponent = () => {
    //     switch (activeSection) {
    //         case 'Easy Force':
    //             return <ResultsTestContainer component={EasyForceResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Maximálna sila':
    //             return <ResultsTestContainer component={MaxPowerResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Y Balance Test':
    //             return <ResultsTestContainer component={YBalanceTestResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Aeróbna kapacita':
    //             return <ResultsTestContainer component={AerobicCapacityResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Rychlostné schopnosti':
    //             return <ResultsTestContainer component={SpeedAbilityResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Svalová vytrvalosť':
    //             return <ResultsTestContainer component={MuscleEnduranceResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Vybušná sila':
    //             return <ResultsTestContainer component={ExplosivePowerResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Skokový profil':
    //             return <ResultsTestContainer component={JumpProfileResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Mobilita a flexibilita':
    //             return <ResultsTestContainer component={MobilityFlexibilityResults} parameters={{ clientId: auth.user.id }} />;
    //         case 'Špeciálne testy':
    //             return <ResultsTestContainer component={SpecialTestResults} parameters={{ clientId: auth.user.id }} />;
    //         default:
    //             return null;
    //     }
    // };

    const generateButtons = () => {
        const sectionNames = Object.keys(sectionComponents);

        const firstRow = sectionNames.slice(0, 5).map((sectionName, index) => {
            let className = `px-4 py-2 mx-1 ${activeSection === sectionName ? 'bg-blue-500 text-white' : 'bg-gray-200'}`;

            if (index === 0) {
                className += ' rounded-l-md ml-0';
            }
            if (index === 4) {
                className += ' rounded-r-md mr-0';
            }

            return (
                <button
                    key={sectionName}
                    className={className}
                    onClick={() => handleSectionChange(sectionName)}
                >
                    {sectionName}
                </button>
            );
        });

        const secondRow = sectionNames.slice(5, 10).map((sectionName, index) => {
            let className = `px-4 py-2 mx-1 ${activeSection === sectionName ? 'bg-blue-500 text-white' : 'bg-gray-200'}`;

            if (index === 0) {
                className += ' rounded-l-md ml-0';
            }
            if (index === 4) {
                className += ' rounded-r-md mr-0';
            }

            return (
                <button
                    key={sectionName}
                    className={className}
                    onClick={() => handleSectionChange(sectionName)}
                >
                    {sectionName}
                </button>
            );
        });

        return (
            <div className="my-2"> {/* Pridali sme my-2 */}
                <div className="flex justify-center mb-1">{firstRow}</div> {/* Pridali sme mb-1 */}
                <div className="flex justify-center">{secondRow}</div>
            </div>
        );
    };

    const renderSelectedComponent = () => {
        const SelectedComponent = sectionComponents[activeSection];
        if (SelectedComponent) {
            return <ResultsTestContainer component={SelectedComponent} parameters={{ clientId: auth.user.id }} />;
        }
        return null;
    };

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

                                <p className="mb-4">Vyberte si kategóriu pre zobrazenie testov:</p>
                                <div className="flex justify-center mb-4">
                                    {generateButtons()}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            {renderSelectedComponent()}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }
}
