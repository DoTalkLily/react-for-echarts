import React from 'react';
import BarChart from '../src/BarChart';
import echarts from 'echarts';

const BarChartComponent = React.createClass({
    propTypes: {
    },
    getOtion: function() {
        const option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

        return option;
    },
    onChartClick: function(param, echart) {
        // console.log(param, echart);
    },
    onChartLegendselectchanged: function(param, echart) {
        console.log(param, echart);
        alert('chart legendselectchanged');
    },
    onPieSelectChanged: function(param,echart){
        console.log('select!');
        console.log(param,echart.getOption());
    },
    onPieUnselected: function(param,echart){
        console.log('unselect!');
        console.log(param,echart);
    },
    onBrushSelected: function(param,echart){
        console.log('brush selected!');
        console.log(param,echart);
    },

    onChartReady: function(chart) {
        // setTimeout(function() {
        //     chart.hideLoading();
        // }, 2000);
        chart.hideLoading();

    },
    registerTheme: function() {
        echarts.registerTheme('my_theme', {
            backgroundColor: '#f4cccc'
        });
    },
    render: function() {
        // this.registerTheme();

        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged,
            // 'pieselectchanged': this.onPieSelectChanged,
            'pieunselected': this.onPieUnselected,
            'brushSelected': this.onBrushSelected
        };
        return (
            <div>
                <BarChart
                    option={ this.getOtion() }
                    title="this is a pie chart"
                    subTitle="i am a subtitle"
                    style={{ height: '500px', width: '60%' }}
                    className='pie_chart'
                    opacity={1}
                    data={
                        [
                            {value:335, name:'jona'},
                            {value:310, name:'why'},
                            {value:234, name:'you donnot'},
                            {value:135, name:'like'},
                            {value:1548, name:'me'}
                        ]
                    }
                    onChartReady={this.onChartReady}
                    onSelect={this.onPieSelectChanged}
                    onEvents={onEvents}
                />
            </div>
        );
    }
});

export default BarChartComponent;
