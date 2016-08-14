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
                },
                {
                    name:'访问来源eww',
                    type:'pie',
                    radius: ['40%', '55%'],

                    data:[
                        {value:335, name:'直达'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1048, name:'百度'},
                        {value:251, name:'谷歌'},
                        {value:147, name:'必应'},
                        {value:102, name:'其他'}
                    ]
                },
                {
                    name:'访问来源eww',
                    type:'pie',
                    radius: ['65%', '80%'],

                    data:[
                        {value:335, name:'直达'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1048, name:'百度'},
                        {value:251, name:'谷歌'},
                        {value:147, name:'必应'},
                        {value:102, name:'其他'}
                    ]
                },
                {
                    name:'访问来源eww',
                    type:'pie',
                    radius: ['85%', '100%'],

                    data:[
                        {value:335, name:'直达'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1048, name:'百度'},
                        {value:251, name:'谷歌'},
                        {value:147, name:'必应'},
                        {value:102, name:'其他'}
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
        // data={
        //     [
        //         {value:335, name:'he'},
        //         {value:310, name:'ha'},
        //         {value:234, name:'xi'},
        //         {value:135, name:'hei'},
        //         {value:1548, name:'wa'}
        //     ]
        // };
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
                    //enableBrush={true}
                    //data={data}
                    //series={}
                    onChartReady={this.onChartReady}
                    onSelect={this.onPieSelectChanged}
                    onEvents={onEvents}
                />
            </div>
        );
    }
});

export default SimpleChartComponent;
