import React from 'react';
import ReactDOM from 'react-dom';
import SimpleChartComponent from './SimpleChartComponent.jsx';
require('./demo.css');

ReactDOM.render((
        <SimpleChartComponent/>
    ),
    document.getElementById('wrapper')
);
