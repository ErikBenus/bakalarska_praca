import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx";

export default function SpeedTests({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Rýchlostné schopnosti – Testy
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy" />}
        >
            <Head title="Rýchlostné schopnosti – Testy" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Rýchlostné schopnosti – čo to je a ako fungujú?</h2>

                            <p className="mb-4">
                                Testy rýchlostných schopností slúžia na hodnotenie výkonnosti pri krátkych a intenzívnych pohyboch. Tieto testy sú často využívané športovcami na zlepšenie šprintérskych schopností a reakčného času.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Šprinty</h3>

                            <p className="mb-4">
                                Šprintové testy merajú čas, ktorý je potrebný na prebehnutie stanovených vzdialeností. Tieto testy sú ideálne na sledovanie zlepšení v šprintérskych schopnostiach a rýchlostných reakciách.
                            </p>

                            <h4 className="mt-8 mb-4 text-sm font-semibold">Merané vzdialenosti a časy:</h4>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Metre</th>
                                    <th className="px-4 py-2">Čas</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">5 m</td>
                                    <td className="px-4 py-2">---</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">10 m</td>
                                    <td className="px-4 py-2">---</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">20 m</td>
                                    <td className="px-4 py-2">---</td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Testy na rýchlostné schopnosti</h3>

                            <p className="mb-4">
                                Tieto testy sa vykonávajú v rámci športovej diagnostiky na zistenie výkonnosti pri rôznych šprintérskych situáciách. Pomocou testov môžeme získať komplexný pohľad na rýchlostné a reakčné schopnosti jednotlivca.
                            </p>


                            <h3 className="mt-8 mb-4 text-md font-semibold">5-10-5 Test</h3>

                            <p className="mb-4">
                                Test 5-10-5 je dynamický test rýchlosti a agility, ktorý sa používa na hodnotenie rýchlosti zmien smeru a reakčných schopností. Tento test sa skladá z behu na 5 metrov, potom sa zmení smer a beží sa na 10 metrov, následne sa opäť zmení smer na 5 metrov.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Výhody testov rýchlostných schopností</h3>

                            <ul className="mb-4 list-disc list-inside">
                                <li><strong>Zlepšenie šprintérskych schopností</strong> – tieto testy pomáhajú identifikovať silné a slabé stránky v oblasti rýchlosti.</li>
                                <li><strong>Rýchle zhodnotenie výkonu</strong> – umožňujú rýchlo zmerať pokrok a efektivitu tréningu.</li>
                                <li><strong>Zlepšenie agility a reakčného času</strong> – testy ako 5-10-5 pomáhajú zlepšiť schopnosť rýchlej zmeny smeru a reakcie na podnety.</li>
                            </ul>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Čo ďalej?</h3>

                            <p className="mb-4">
                                Po vykonaní týchto testov vám môžeme poskytnúť odporúčania na zlepšenie vašich rýchlostných schopností, ako aj cielené cvičenia, ktoré vám pomôžu dosiahnuť lepšie výsledky.
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
