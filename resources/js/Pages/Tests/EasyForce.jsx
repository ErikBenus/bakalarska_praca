import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx";

export default function EasyForce({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Easy Force – Testovanie
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy"/>}
        >
            <Head title="Easy Force – Testovanie"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Easy Force – čo to je a ako funguje?</h2>

                            <p className="mb-4">
                                Testovanie **Easy Force** hodnotí silu svalov predného a zadného svalového reťazca
                                dolnej končatiny, konkrétne quadriceps (predný sval) a hamstring (zadný sval). Tento
                                test poskytuje podrobné informácie o sile oboch svalov na pravej a ľavej nohe, čo nám
                                pomáha identifikovať prípadné asymetrie alebo nerovnováhu medzi nimi.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Výsledky testu Easy Force</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Testovaný sval</th>
                                    <th className="px-4 py-2">Pravá</th>
                                    <th className="px-4 py-2">Ľavá</th>
                                    <th className="px-4 py-2">Rozdiel</th>
                                    <th className="px-4 py-2">Rozdiel v (%)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">Quadriceps – pokus č. 1</td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Quadriceps – pokus č. 2</td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Hamstring – pokus č. 1</td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Hamstring – pokus č. 2</td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Porovnanie predného a zadného svalového
                                reťazca</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Sval</th>
                                    <th className="px-4 py-2">Pravá</th>
                                    <th className="px-4 py-2">Ľavá</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">Quadriceps</td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Hamstring</td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Výsledky a hodnotenie</h3>

                            <p className="mb-4">
                                Výsledky testu umožňujú detailné porovnanie predného a zadného svalového reťazca dolnej
                                končatiny. Ak je rozdiel medzi svalmi väčší ako 20%, môže to naznačovať slabšie svaly,
                                ktoré si vyžadujú cielené cvičenia a rehabilitáciu.
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy"/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
