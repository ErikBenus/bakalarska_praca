import React, { useState } from 'react';

const ResultsTestContainer = ({ component: Component, parameters }) => {

    return (
        <Component {...parameters} />
    );
};

export default ResultsTestContainer;
