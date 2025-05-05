import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx";

export default function MaximalStrength({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Maximálna sila – OUTPUT Testovanie
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy"/>}
        >
            <Head title="Maximálna sila – OUTPUT Testovanie"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Maximálna sila – čo to je a ako
                                funguje?</h2>

                            <p className="mb-4">
                                Testovanie maximálnej sily je proces, pri ktorom sa pomocou zariadenia **OUTPUT Sports**
                                meria rýchlosť dvíhania váhy počas viacerých pokusov. Klient vykonáva cvik s
                                progresívnym zvyšovaním váhy a zariadenie meria rýchlosť vykonania jednotlivých
                                opakovaní.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Ako test prebieha?</h3>

                            <p className="mb-4">
                                Klient vykonáva viacero pokusov s rôznymi váhami, pričom zariadenie OUTPUT Sports
                                sleduje rýchlosť pohybu pri každom pokuse. Na základe týchto údajov sa následne vypočíta
                                jeho skutočná maximálna váha, ktorú dokáže zdvihnúť na jedno opakovanie (1RM).
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Výpočet maximálnej váhy</h3>

                            <p className="mb-4">
                                Ak napríklad klient dvíha váhy v rozsahu od 100 kg do 200 kg s určitými rýchlosťami,
                                zariadenie vypočíta, že jeho skutočná maximálna váha na jedno opakovanie by mohla byť
                                približne 240 kg. Tento výpočet zohľadňuje rôzne faktory, ako je rýchlosť zdvihu a výkon
                                počas pokusov.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Aké sú výhody OUTPUT testovania?</h3>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Presné meranie maximálnej sily</strong> – výpočty sú založené na reálnych
                                    pokusoch s váhami a rýchlosťou, čo poskytuje presnejší odhad maximálnej váhy než
                                    tradičné metódy.
                                </li>
                                <li><strong>Progresívne testovanie</strong> – klient môže vidieť svoj pokrok v reálnom
                                    čase, keď zvyšuje váhy a výkon.
                                </li>
                                <li><strong>Bezpečné testovanie</strong> – zariadenie poskytuje rýchlu analýzu, ktorá
                                    znižuje riziko zranení pri testovaní maximálnej váhy.
                                </li>
                            </ul>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Čo ďalej?</h3>

                            <p className="mb-4">
                                Na základe výsledkov testu vám môžeme poskytnúť odporúčania na zlepšenie sily a výkonu,
                                ako aj cielené cvičenia, ktoré vám pomôžu dosiahnuť vaše ciele.
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy"/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
