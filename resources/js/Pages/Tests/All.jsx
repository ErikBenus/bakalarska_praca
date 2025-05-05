import {Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function All({auth}) {

    const testLinks = [
        {name: 'Y Balance Test', href: route('all-tests.y-balance-test')},
        {name: 'Maximálna sila', href: route('all-tests.maximal-strength')},
        {name: 'Rýchlostné schopnosti', href: route('all-tests.speed-abilities')},
        {name: 'Aeróbna kapacita', href: route('all-tests.aerobic-capacity')},
        {name: 'Svalová vytrvalosť', href: route('all-tests.muscle-endurance')},
        {name: 'Vybušná sila', href: route('all-tests.explosive-power')},
        {name: 'Skokový profil', href: route('all-tests.jump-profile')},
        {name: 'Mobilita a flexibilita', href: route('all-tests.mobility-flexibility')},
        {name: 'Easy Force', href: route('all-tests.easy-force')},
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Štandardné testy
                </h2>
            }
        >
            <Head title="Štandardné testy"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <p className="mb-4">
                                {auth.user.first_name}, v tejto sekcii nájdete zoznam štandardizovaných testov, ktoré sa
                                používajú na hodnotenie
                                výkonnosti klientov. Testy sú rozdelené do kategórií podľa zamerania, aby ste si mohli
                                jednoducho vybrať ten správny. Po výbere konkrétneho testu získate podrobné informácie o
                                jeho vykonávaní a interpretácii výsledkov.
                            </p>

                            <p className="mb-4 font-semibold">
                                Zvoľte si kategóriu:</p>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {testLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

