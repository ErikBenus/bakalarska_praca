import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx";

export default function AerobicCapacityTests({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Aeróbna kapacita – Testy
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy" />}
        >
            <Head title="Aeróbna kapacita – Testy" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Aeróbna kapacita – čo to je a ako fungujú?</h2>

                            <p className="mb-4">
                                Testy na aeróbnu kapacitu slúžia na hodnotenie vytrvalosti a schopnosti organizmu efektívne využívať kyslík počas dlhodobého fyzického zaťaženia. Tieto testy sú kľúčové pre športovcov, ktorí sa zameriavajú na vytrvalostné disciplíny, ako aj pre tých, ktorí chcú zlepšiť svoju celkovú kondíciu.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Beep Test</h3>

                            <p className="mb-4">
                                Beep test, tiež známy ako **Multistage Fitness Test**, je test, ktorý meria vašu vytrvalosť pri behu medzi dvoma bodmi vzdialenými 20 metrov. Test začína pomalým tempom a postupne sa zvyšuje rýchlosť. Tento test je jedným z najpopulárnejších spôsobov hodnotenia aeróbnej kapacity.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Yoyo Test</h3>

                            <p className="mb-4">
                                Yoyo test je podobný Beep testu, ale s väčším dôrazom na opakované šprinty. Tento test meria schopnosť zotaviť sa po šprintoch na krátke vzdialenosti a opäť zvyšuje rýchlosť s každým stupňom.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Cooperov test</h3>

                            <p className="mb-4">
                                Cooperov test je jednoducho povedané, test na meranie vytrvalosti, kde sa behá čo najdlhšie v priebehu 12 minút. Cieľom je zabehnúť čo najväčšiu vzdialenosť. Tento test poskytuje priamy pohľad na vašu aeróbnu kapacitu a je jedným z najbežnejšie používaných testov v športovej praxi.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Výhody testov na aeróbnu kapacitu</h3>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Hodnotenie vytrvalosti</strong> – tieto testy pomáhajú sledovať schopnosť tela efektívne využívať kyslík pri dlhodobom zaťažení.</li>
                                <li><strong>Monitorovanie pokroku</strong> – pravidelné vykonávanie týchto testov umožňuje sledovať zlepšenie vytrvalosti a aeróbnej kapacity počas tréningového obdobia.</li>
                                <li><strong>Zlepšenie fyzickej kondície</strong> – na základe výsledkov testov môžeme vytvoriť prispôsobený tréningový plán na zlepšenie aeróbnej kapacity.</li>
                            </ul>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Testy na aeróbnu kapacitu – vzdialenosti</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Názov testu</th>
                                    <th className="px-4 py-2">Vzdialenosť (metre)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">Beep test</td>
                                    <td className="px-4 py-2">20 m (každý okruh)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Yoyo test</td>
                                    <td className="px-4 py-2">20 m (každý okruh)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Cooperov test</td>
                                    <td className="px-4 py-2">Maximálna vzdialenosť za 12 minút</td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Čo ďalej?</h3>

                            <p className="mb-4">
                                Po vykonaní týchto testov vám môžeme poskytnúť odporúčania na zlepšenie vytrvalosti, ako aj cielené cvičenia na zvýšenie aeróbnej kapacity a zlepšenie celkovej kondície.
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
