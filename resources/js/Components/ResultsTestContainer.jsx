import React, { useState } from 'react';

const ResultsTestContainer = ({ title, component: Component }) => {
    const [showComponent, setShowComponent] = useState(false);

    const toggleComponent = () => {
        setShowComponent(!showComponent);
    };

    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className="text-2xl font-semibold mb-4">
                            {title}
                        </h2>

                        <p onClick={toggleComponent} className="cursor-pointer text-blue-500 hover:text-blue-700">
                            {showComponent ? 'Skryť výsledky ↑' : 'Zobraziť výsledky ↓'}
                        </p>

                        {showComponent && <Component/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsTestContainer;
