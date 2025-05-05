import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx"

export default function YBalanceTest({auth}) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Y Balance Test
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy"/>}
        >
            <Head title="Y Balance Test"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Y Balance Test – čo to je a ako vám
                                pomôže?</h2>

                            <p className="mb-4">
                                Y Balance Test je jednoduchý, no veľmi účinný test na hodnotenie vašej rovnováhy,
                                stability a kontroly pohybu.
                                Používa sa najmä v športe a rehabilitácii na identifikáciu asymetrií medzi pravou a
                                ľavou stranou tela, čo môže pomôcť pri prevencii zranení.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Ako test prebieha?</h3>

                            <p className="mb-4">Počas testu stojíte na jednej nohe, zatiaľ čo druhú nohu posúvate do
                                troch rôznych smerov:</p>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Predný smer (anterior)</strong> – dopredu</li>
                                <li><strong>Zadobočný smer (posteromedial)</strong> – šikmo dozadu k stredu</li>
                                <li><strong>Zadolaterálny smer (posterolateral)</strong> – šikmo dozadu von</li>
                            </ul>

                            <p className="mb-4">
                                Cieľom je dosiahnuť čo najväčší rozsah pohybu bez straty stability. Výsledky testu nám
                                umožňujú lepšie pochopiť váš pohybový vzor a identifikovať možné slabé miesta.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Aké sú výhody Y Balance Testu?</h3>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Prevencia zranení</strong> – odhalenie nerovnováhy môže pomôcť predchádzať
                                    problémom s členkom, kolenom alebo bedrom.
                                </li>
                                <li><strong>Zlepšenie výkonu</strong> – športovci môžu test využiť na optimalizáciu
                                    pohybu a zvýšenie stability.
                                </li>
                                <li><strong>Rýchle zotavenie</strong> – po zranení pomáha sledovať pokrok a bezpečný
                                    návrat k aktivitám.
                                </li>
                            </ul>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Hodnotenie výsledkov</h3>

                            <p className="mb-4">
                                Výsledky testu sa hodnotia porovnaním dosiahnutej vzdialenosti medzi pravou a ľavou
                                nohou. Dôležitým ukazovateľom je **asymetria medzi stranami**:
                            </p>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Rozdiel menší ako 4 cm:</strong> Výsledok je v norme, asymetria je
                                    minimálna.
                                </li>
                                <li><strong>Rozdiel 4 cm a viac:</strong> Zvýšené riziko zranenia, odporúčame korekčné
                                    cvičenia.
                                </li>
                            </ul>

                            <p className="mb-4">
                                Ak je rozdiel medzi stranami väčší ako 4 cm, môže to naznačovať slabosť alebo
                                nedostatočnú kontrolu jednej nohy.
                                V takom prípade odporúčame individuálny plán cvičení na vyrovnanie nerovnováhy a
                                zníženie rizika zranení.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Čo ďalej?</h3>

                            <p className="mb-4">
                                Na základe výsledkov vám vieme odporučiť cielené cvičenia na zlepšenie stability a
                                pohybovej kontroly.
                                Ak máte akékoľvek otázky, neváhajte nás kontaktovať – radi vám poradíme!
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy"/>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
