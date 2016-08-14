import React from 'react';
import ReactDOM from 'react-dom';
import PieChart from './PieChartTest.jsx';
import BarChart from './BarChartTest.jsx';

require('./demo.css');

ReactDOM.render((
       <div>
           <PieChart/>
           <BarChart/>
       </div>
    ),
    document.getElementById('wrapper')
);
