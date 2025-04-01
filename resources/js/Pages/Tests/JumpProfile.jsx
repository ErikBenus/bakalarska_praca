import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx";

export default function JumpProfile({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Skokový profil – Testy
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy" />}
        >
            <Head title="Skokový profil – Testy" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Skokový profil – čo to je a ako funguje?</h2>

                            <p className="mb-4">
                                Skokový profil hodnotí schopnosť klienta vykonávať výbušné skoky a meriame ho pomocou zariadenia **OUTPUT Sports**. Tento test je užitočný na hodnotenie výbušnej sily nôh, čo je kľúčové pre športy ako basketbal, futbal, volejbal a iné, ktoré si vyžadujú rýchle a silné skoky.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Skokový profil – základné parametre</h3>

                            <p className="mb-4">
                                Testy skokového profilu zahŕňajú rôzne skoky, ako napríklad **Counter Movement Jump (CMJ)**, **Squat Jump (SJ)**, a testy skokov do diaľky. Zariadenie OUTPUT Sports zaznamenáva rôzne parametre, ako je **RSI (Reactive Strength Index)**, **GCT (Ground Contact Time)** a **EUR (Explosive Utilization Ratio)**, ktoré nám pomáhajú analyzovať schopnosti klienta v oblasti výbušnej sily.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Parametre a výsledky skokového profilu</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Test</th>
                                    <th className="px-4 py-2">1. Pokus</th>
                                    <th className="px-4 py-2">2. Pokus</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">RSI</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">GCT</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">CMJ (Counter Movement Jump)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">SJ (Squat Jump)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">H (Výška skoku)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">EUR (Explosive Utilization Ratio)</td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Skokový profil – testy podľa nohy</h3>

                            <p className="mb-4">
                                Skokový profil sa testuje aj individuálne pre pravú a ľavú nohu, aby sme získali podrobnejší pohľad na symetriu medzi nohami. Všetky tieto testy poskytujú dôležité informácie o výbušnosti nôh, čo je kľúčové pre zlepšenie výkonu v rôznych športoch.
                            </p>


                            <h3 className="mt-8 mb-4 text-md font-semibold">Výhody skokového profilu</h3>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Presné hodnotenie výbušnej sily</strong> – analýza skokov poskytuje podrobné informácie o výbušnej sile klienta.</li>
                                <li><strong>Symetria medzi nohami</strong> – testy umožňujú porovnať výkony medzi pravou a ľavou nohou, čo pomáha identifikovať nerovnováhu.</li>
                                <li><strong>Prispôsobené športu</strong> – testy sú prispôsobené potrebám konkrétneho športu, aby poskytli najrelevantnejšie údaje pre výkon.</li>
                            </ul>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Čo ďalej?</h3>

                            <p className="mb-4">
                                Na základe výsledkov testov môžeme poskytnúť cielené odporúčania na zlepšenie výbušnej sily a symetrie nôh, ktoré vám pomôžu zlepšiť výkon v športe.
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
