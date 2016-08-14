import React from 'react';
import BarChart from '../src/BarChart';
import echarts from 'echarts';

const BarChartComponent = React.createClass({
    propTypes: {
    },
    getOtion: function() {
        const option = {
            // color: ['#3398DB'],
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

    onChartLegendSelectChanged: function(param, echart) {
        console.log(param, echart);
        alert('chart legendselectchanged');
    },
    onBrushSelected: function(param,echart){
        console.log('brush selected!');
    },
    onSelect: function(param,echart){

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
            'legendselectchanged': this.onChartLegendSelectChanged
        };

        let category = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        let series = [
            {
                name:'直接访问',
                type:'bar',
                // barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220],
                label: {
                    normal: {
                        show: true,
                        position:'right'
                    }
                }
            },
            {
                name:'间接访问',
                type:'bar',
                // barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220],
                label: {
                    normal: {
                        show: true,
                        position:'right'
                    }
                }
            },
            {
                name:'e',
                type:'bar',
                // barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220],
                label: {
                    normal: {
                        show: true,
                        position:'right'
                    }
                }
            }
        ];
        return (
            <div>
                <BarChart
                    title="this is a bar chart"
                    subTitle="i am a subtitle"
                    style={{ height: '500px', width: '60%' }}
                    className='bar_chart'
                    opacity={1}
                    theme="default"
                    category={category}
                    series={series}  //至少要有name、type、data
                    enableBrush={true}
                    enableStack={true}
                    enableHorizon={true}
                    onChartReady={this.onChartReady}
                    onSelect={this.onSelect}
                    onBrushSelect={this.onBrushSelected}
                    onEvents={onEvents}
                />
            </div>
        );
    }
});

export default BarChartComponent;
