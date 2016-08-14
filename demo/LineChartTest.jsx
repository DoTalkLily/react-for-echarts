import React from 'react';
import LineChart from '../src/LineChart';
import echarts from 'echarts';

const BarChartComponent = React.createClass({
    propTypes: {
    },
    getOtion: function() {
        const option = {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
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
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
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

        let series = [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                // areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                // areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ];
        return (
            <div>
                <LineChart
                    title="title"
                    style={{ height: '500px', width: '60%' }}
                    className='line_chart'
                    opacity={1}
                    category={['周一','周二','周三','周四','周五','周六','周日']}
                    theme="default"
                    series={series}  //至少要有name、type、data
                    onChartReady={this.onChartReady}
                    onSelect={this.onSelect}
                    onEvents={onEvents}
                />
            </div>
        );
    }
});

export default BarChartComponent;
