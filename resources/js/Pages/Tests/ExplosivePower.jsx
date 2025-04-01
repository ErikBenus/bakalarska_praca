import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx";

export default function ExplosiveStrengthTests({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Výbušná sila – Testy
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy" />}
        >
            <Head title="Výbušná sila – Testy" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Výbušná sila – čo to je a ako funguje?</h2>

                            <p className="mb-4">
                                Testovanie výbušnej sily je proces, pri ktorom sa meria schopnosť klienta generovať maximálnu silu v krátkom čase. Tento typ testu je obzvlášť dôležitý pre športy, ktoré vyžadujú rýchlu a silnú reakciu, ako je napríklad futbal, basketbal alebo atletika.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Testy na výbušnú silu</h3>

                            <p className="mb-4">
                                Testy na výbušnú silu sa vykonávajú pomocou medicinbalu a zariadenia **OUTPUT Sports**, ktoré meria rýchlosť hodu a ďalšie parametre, ktoré sú dôležité pri hodnotení výbušnej sily. Na základe výkonu v týchto testoch sa určí vaša schopnosť generovať silu v krátkom čase, čo je kľúčové pre rýchlosť, výbušnosť a celkový výkon v rôznych športoch.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Testy využívajúce medicinbal</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Test</th>
                                    <th className="px-4 py-2">Rýchlosť (m/s)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">Sponad hlavy na stenu</td>
                                    <td className="px-4 py-2">Meria sa rýchlosť hodu medicinbalom</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Hod od hrudníka v stoji</td>
                                    <td className="px-4 py-2">Meria sa rýchlosť hodu medicinbalom</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Hod od hrudníka v sede</td>
                                    <td className="px-4 py-2">Meria sa rýchlosť hodu medicinbalom</td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Prispôsobenie testov športu klienta</h3>

                            <p className="mb-4">
                                Testy na výbušnú silu sa prispôsobujú na základe športu, ktorý klient vykonáva, alebo na základe iných parametrov výkonnosti. Zariadenie OUTPUT Sports analyzuje rýchlosť hodu a ďalšie faktory, ktoré sú relevantné pre konkrétny šport, čím sa poskytuje presnejšie hodnotenie výbušnej sily.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Výhody testovania výbušnej sily</h3>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Presné meranie výbušnej sily</strong> – výpočty sú založené na reálnych výkonoch a rýchlosti hodu, čo poskytuje presný obraz o výbušnej sile.</li>
                                <li><strong>Prispôsobiteľné testy</strong> – testy sa prispôsobujú športu klienta, čím sa optimalizuje hodnotenie jeho výbušnosti v kontexte jeho špecifických potrieb.</li>
                                <li><strong>Optimalizácia výkonu</strong> – na základe výsledkov testov môžeme poskytnúť odporúčania na zlepšenie výbušnej sily a výkonu v športe.</li>
                            </ul>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Čo ďalej?</h3>

                            <p className="mb-4">
                                Na základe výsledkov týchto testov vám môžeme poskytnúť cielené cvičenia na zlepšenie výbušnej sily, ktoré sú špecifické pre váš šport a výkonové ciele.
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
