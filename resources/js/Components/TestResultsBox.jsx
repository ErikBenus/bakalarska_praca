import React from 'react';

const TestResultsBox = ({title, children}) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            {children}
        </div>
    );
};

export default TestResultsBox;
