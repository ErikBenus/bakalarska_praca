import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx";

export default function MuscularEnduranceTests({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Svalová vytrvalosť – Testy
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy" />}
        >
            <Head title="Svalová vytrvalosť – Testy" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Svalová vytrvalosť – čo to je a ako funguje?</h2>

                            <p className="mb-4">
                                Testy svalovej vytrvalosti merajú schopnosť svalov vydržať opakované kontrakcie počas dlhšieho časového obdobia. Tieto testy sú určené na hodnotenie fyzickej odolnosti a efektivity svalového systému, čo je dôležité pre športovcov aj pre tých, ktorí sa zameriavajú na zlepšenie svojej celkovej kondície.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Testy na svalovú vytrvalosť</h3>

                            <p className="mb-4">
                                Testy svalovej vytrvalosti zahŕňajú rôzne cvičenia, ktoré hodnotia silu a vytrvalosť svalov. Tieto testy sa vykonávajú v rámci rôznych cvikov, kde sa sleduje čas, ktorý klient vydrží v danej pozícii, alebo počet opakovaní daného cviku.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Cviky na svalovú vytrvalosť</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Cvik</th>
                                    <th className="px-4 py-2">Čas (sekundy)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">Výdrž vo vise nadhmatom</td>
                                    <td className="px-4 py-2">Meria sa čas výdrže</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Výdrž vo vise podhmatom</td>
                                    <td className="px-4 py-2">Meria sa čas výdrže</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Plank vo vystretých rukách</td>
                                    <td className="px-4 py-2">Meria sa čas výdrže</td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Cviky s maximálnym počtom opakovaní</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Cvik (do minúty)</th>
                                    <th className="px-4 py-2">Max. počet opakovaní</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">Kliky</td>
                                    <td className="px-4 py-2">Meria sa počet opakovaní za 1 minútu</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Drep na jednej nohe - Pravá</td>
                                    <td className="px-4 py-2">Meria sa počet opakovaní za 1 minútu</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Drep na jednej nohe - Ľavá</td>
                                    <td className="px-4 py-2">Meria sa počet opakovaní za 1 minútu</td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Výhody testov na svalovú vytrvalosť</h3>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Zlepšenie svalovej vytrvalosti</strong> – testy poskytujú prehľad o schopnosti svalov vykonávať viac opakovaní, čo je dôležité pre rôzne športy a každodennú aktivitu.</li>
                                <li><strong>Monitorovanie pokroku</strong> – pravidelné testovanie pomáha sledovať zlepšenie vytrvalosti a efektívnosti svalov v rôznych cvikoch.</li>
                                <li><strong>Bezpečné a efektívne hodnotenie</strong> – testy umožňujú bezpečne hodnotiť svalovú vytrvalosť bez potreby extrémneho zaťaženia alebo rizika zranenia.</li>
                            </ul>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Čo ďalej?</h3>

                            <p className="mb-4">
                                Na základe výsledkov týchto testov vám môžeme poskytnúť odporúčania na zlepšenie svalovej vytrvalosti a konkrétne cvičenia, ktoré vám pomôžu dosiahnuť lepšie výsledky v tejto oblasti.
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
