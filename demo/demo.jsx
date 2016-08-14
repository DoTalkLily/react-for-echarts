import React from 'react';
import ReactDOM from 'react-dom';
import PieChart from './PieChartTest.jsx';
import BarChart from './BarChartTest.jsx';
import LineChart from './LineChartTest.jsx';

require('./demo.css');

ReactDOM.render((
       <div>
           <LineChart/>
       </div>
    ),
    document.getElementById('wrapper')
);
