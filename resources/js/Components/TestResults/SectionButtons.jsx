// SectionButtons.jsx
import React from 'react';

const SectionButtons = ({sections, activeSection, onSectionChange}) => {
    const generateButtons = () => {
        const sectionNames = Object.keys(sections);

        const firstRow = sectionNames.slice(0, 5).map((sectionName, index) => {
            let className = `px-4 py-2 mx-1 ${activeSection === sectionName ? 'bg-blue-500 text-white' : 'bg-gray-200'}`;

            if (index === 0) {
                className += ' rounded-l-md ml-0';
            }
            if (index === 4) {
                className += ' rounded-r-md mr-0';
            }

            return (
                <button
                    key={sectionName}
                    className={className}
                    onClick={() => onSectionChange(sectionName)}
                >
                    {sectionName}
                </button>
            );
        });

        const secondRow = sectionNames.slice(5, 10).map((sectionName, index) => {
            let className = `px-4 py-2 mx-1 ${activeSection === sectionName ? 'bg-blue-500 text-white' : 'bg-gray-200'}`;

            if (index === 0) {
                className += ' rounded-l-md ml-0';
            }
            if (index === 4) {
                className += ' rounded-r-md mr-0';
            }

            return (
                <button
                    key={sectionName}
                    className={className}
                    onClick={() => onSectionChange(sectionName)}
                >
                    {sectionName}
                </button>
            );
        });

        return (
            <div className="my-2">
                <div className="flex justify-center mb-1">{firstRow}</div>
                <div className="flex justify-center">{secondRow}</div>
            </div>
        );
    };

    return generateButtons();
};

export default SectionButtons;
