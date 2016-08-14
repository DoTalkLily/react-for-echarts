import React from 'react';
import PieChart from '../src/PieChart';
import echarts from 'echarts';

const SimpleChartComponent = React.createClass({
    propTypes: {
    },
    getOtion: function() {
        const option = {
            title : {
                text: 'lingyi test',
                subtext: 'fake',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['lala','hehe','haha','kk','cc']
            },
            series : [
                {
                    // name: '访问来源',
                    type: 'pie',
                    radius : ['40%','55%'],
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'lala'},
                        {value:310, name:'hehe'},
                        {value:234, name:'haha'},
                        {value:135, name:'kk'},
                        {value:1548, name:'cc'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 1)'
                        },
                        normal: {
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    }
                }
            ],
            brush: {
                throttleType: 'debounce',
                throttleDelay: 300
            }

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
                <PieChart
                    option={ this.getOtion() }
                    title="this is a pie chart"
                    subTitle="i am a subtitle"
                    style={{ height: '500px', width: '60%' }}
                    className='pie_chart'
                    opacity={1}
                    enableRing={false}
                    enableBrush={true}
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

export default SimpleChartComponent;
