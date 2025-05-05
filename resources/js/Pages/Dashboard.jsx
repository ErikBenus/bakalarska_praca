import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import {usePermissions} from "@/Components/UsePermissions.jsx";
import EasyForceResults from "@/Components/TestResults/EasyForceResults.jsx";
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
import SectionRenderer from "@/Components/SectionRenderer.jsx";
import SectionButtons from "@/Components/TestResults/SectionButtons.jsx";
import TrainerDashboard from "@/Pages/Trainers/TrainerDashboard.jsx";

export default function Dashboard() {

    const {can} = usePermissions();
    const {auth} = usePage().props;
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

    if (can('see trainer dashboard')) {
        return <TrainerDashboard/>;
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
                                    <SectionButtons
                                        sections={sectionComponents}
                                        activeSection={activeSection}
                                        onSectionChange={handleSectionChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <SectionRenderer
                                sections={sectionComponents}
                                activeSection={activeSection}
                                parameters={{clientId: auth.user.id}}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }
}
