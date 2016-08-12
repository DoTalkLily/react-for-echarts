import React from 'react';
import PieChart from '../src/PieChart';

const SimpleChartComponent = React.createClass({
    propTypes: {
    },
    getOtion: function() {
        const option = {
            title : {
                // text: '某站点用户访问来源',
                // subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    // name: '访问来源',
                    type: 'pie',
                    radius : ['40%','55%'],
                    center: ['50%', '60%'],
                    data:[ 334,222,333,444,555],
                    //     {value:335, name:'直接访问'},
                    //     {value:310, name:'邮件营销'},
                    //     {value:234, name:'联盟广告'},
                    //     {value:135, name:'视频广告'},
                    //     {value:1548, name:'搜索引擎'}
                    // ],
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
        console.log(param,echart.getOption());
    },
    onPieUnselected: function(param,echart){
        console.log(param,echart);
    },
    onBrushSelected: function(param,echart){
        console.log(param,echart);
    },

    onChartReady: function(chart) {
        // setTimeout(function() {
        //     chart.hideLoading();
        // }, 2000);
        chart.hideLoading();

    },
    render: function() {
        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged,
            'pieselectchanged': this.onPieSelectChanged,
            'pieunselected': this.onPieUnselected,
            'brushSelected': this.onBrushSelected
        };
        return (
            <div>
                <PieChart
                    option={ this.getOtion() }
                    style={{ height: '350px', width: '50%' }}
                    className='pie_chart'
                    theme='test'
                    onChartReady={this.onChartReady}
                    onEvents={onEvents}
                />
            </div>
        );
    }
});

export default SimpleChartComponent;