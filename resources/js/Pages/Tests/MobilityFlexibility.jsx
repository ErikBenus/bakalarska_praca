import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import BackLink from "@/Components/BackLink.jsx";

export default function MobilityFlexibility({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Mobilita a flexibilita – Testy
                </h2>
            }
            rightHeader={<BackLink routeName="all-tests.index" text="štandardné testy" />}
        >
            <Head title="Mobilita a flexibilita – Testy" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mt-8 mb-4 text-lg font-semibold">Mobilita a flexibilita – čo to je a ako funguje?</h2>

                            <p className="mb-4">
                                Testovanie mobility a flexibility hodnotí schopnosť kĺbov a svalov vykonávať rôzne pohyby. Sledujeme rozsah pohybu (v stupňoch) a rozdiely medzi pravou a ľavou stranou tela. Tieto testy pomáhajú identifikovať obmedzenia, ktoré môžu ovplyvniť výkon alebo zvýšiť riziko zranení.
                            </p>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Testovanie kĺbov a svalov</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Kĺb/sval</th>
                                    <th className="px-4 py-2">Pravá</th>
                                    <th className="px-4 py-2">Ľavá</th>
                                    <th className="px-4 py-2">Rozdiel</th>
                                    <th className="px-4 py-2">Asymetria</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr><td className="px-4 py-2">Illiopsoas</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Rectus femoris</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Piriformis</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Hamstring prox.</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Hamstring dist.</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Gastrocnemius</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Soleus</td><td></td><td></td><td></td><td></td></tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Testovanie pohybového rozsahu kĺbov</h3>

                            <table className="min-w-full bg-white shadow-md border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Test</th>
                                    <th className="px-4 py-2">Pravá</th>
                                    <th className="px-4 py-2">Ľavá</th>
                                    <th className="px-4 py-2">Rozdiel</th>
                                    <th className="px-4 py-2">Asymetria</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr><td className="px-4 py-2">Flexia KK</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Extenzia RK</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Abdukcia</td><td></td><td></td><td></td><td></td></tr>
                                <tr><td className="px-4 py-2">Extenzia v Abdukcii</td><td></td><td></td><td></td><td></td></tr>
                                </tbody>
                            </table>

                            <h3 className="mt-8 mb-4 text-md font-semibold">Výsledky a hodnotenie asymetrie</h3>

                            <p className="mb-4">
                                **Asymetria do 5 %** = Normálny rozsah pohybu.
                                **5 – 15 %** = Mierna asymetria, odporúča sa pravidelná mobilizácia a strečing.
                                **Viac ako 15 %** = Výrazná asymetria, ktorá môže viesť k pohybovým problémom. Je vhodné zahrnúť korekčné cvičenia a diagnostiku u odborníka.
                            </p>

                            <BackLink routeName="all-tests.index" text="štandardné testy" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
