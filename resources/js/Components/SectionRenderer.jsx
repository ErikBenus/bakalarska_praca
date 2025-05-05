// SectionRenderer.jsx
import React from 'react';
import ResultsTestContainer from './ResultsTestContainer';

const SectionRenderer = ({sections, activeSection, parameters}) => {
    const renderSelectedComponent = () => {
        const SelectedComponent = sections[activeSection];
        if (SelectedComponent) {
            return <ResultsTestContainer component={SelectedComponent} parameters={parameters}/>;
        }
        return null;
    };

    return renderSelectedComponent();
};

export default SectionRenderer;
