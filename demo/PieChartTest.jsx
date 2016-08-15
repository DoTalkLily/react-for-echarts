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
                    name:'访问来源',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直达', selected:true},
                        {value:679, name:'营销广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
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
            'pieunselected': this.onPieUnselected,
            'brushSelected': this.onBrushSelected
        };
        return (
            <div>
                <PieChart
                    title="this is a pie chart"
                    subTitle="i am a subtitle"
                    style={{ height: '500px', width: '60%' }}
                    className='pie_chart'
                    opacity={0.5}
                    enableRing={false}
                    //enableBrush={true}
                    data={
                        [
                            {value:335, name:'he'},
                            {value:310, name:'ha'},
                            {value:234, name:'xi'},
                            {value:135, name:'hei'},
                            {value:1548, name:'wa'}
                        ]
                    }
                    //series={}
                    hoverAnimation={false}
                    onChartReady={this.onChartReady}
                    onSelect={this.onPieSelectChanged}
                    onEvents={onEvents}
                />
            </div>
        );
    }
});

export default SimpleChartComponent;
