import echarts from 'echarts';
import React from 'react';
import elementResizeEvent from 'element-resize-event';
import { macarons } from './theme';

const selectedItemStyle = {
    normal:{
        opacity:1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2
    }
};

const BarChart = React.createClass({
    propTypes: {
        option: React.PropTypes.object,
        title: React.PropTypes.string,
        subTitle: React.PropTypes.string,
        style: React.PropTypes.object,
        series: React.PropTypes.array,
        category: React.PropTypes.array,
        opacity: React.PropTypes.number,
        className: React.PropTypes.string,
        theme: React.PropTypes.string,
        enableStack: React.PropTypes.bool,    //是否允许堆叠
        enableHorizon: React.PropTypes.bool,  //是否变成水平柱状图
        enableBrush: React.PropTypes.bool,    //圈选
        showLoading: React.PropTypes.bool,    //是否展示loading动画
        onChartReady: React.PropTypes.func,
        onEvents: React.PropTypes.object,
        onSelect: React.PropTypes.func,
        onBrushSelect: React.PropTypes.func
    },

    getInitialState(){
        let legend;
        let itemStyle =  {
            normal: {
                opacity: this.props.opacity || 1,
            },
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.8)',
                opacity:1
            }
        };

        if(this.props.series){
            legend = [];
            this.props.series.forEach(function(value,index){
               legend.push(value.name);
               value.itemStyle = itemStyle;
            });
        }

        let category =  {
            type : 'category',
            data : this.props.category || [],
            axisTick: {
                alignWithLabel: true
            }
        };

        let option = {
            title : {
                text: this.props.title || '',
                subtext: this.props.subtitle || '',
                x:'center'
            },
            legend:{
                data: legend || [],
                align: 'left',
                left: 10
            },
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
                this.props.enableHorizon ? { type : 'value' } : category
            ],
            yAxis : [
                this.props.enableHorizon ? category : { type : 'value' }
            ],
            series : this.props.series || []
        };

        //enable brush in toolbox
        if(this.props.enableBrush){
            option.brush = {
                toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                throttleType: 'debounce',
                throttleDelay: 300,
                brushMode: 'multiple',
                inBrush:{
                    opacity:1
                },
                outBrush:{
                    opacity:0.4
                }
            };
        }
        if(this.props.enableStack){
            option.toolbox={
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    }
                }
            };
        }

        return {
            option : option,
            selectedIndex : {}
        };
    },

    // first add
    componentDidMount() {
        let self = this;
        let echartObj = self.renderEchartDom();
        let onEvents = self.props.onEvents || [];
        //regist default theme
        echarts.registerTheme(macarons);


        for (let eventName in onEvents) {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
                // binding event
                echartObj.on(eventName, function(param) {
                    onEvents[eventName](param, echartObj);
                });
            }
        }

        // on chart ready
        if (typeof self.props.onChartReady === 'function'){
            self.props.onChartReady(echartObj);
        }

        // on resize
        elementResizeEvent(self.refs.echartsDom, function() {
            echartObj.resize();
        });

        //on brush select
        echartObj.on('brushselected',function(param){
            self.onBrushSelect(param,echartObj);
        });
        //on select
        echartObj.on('click',function(param){
             self.onSelect(param,echartObj);
        });
    },

    // update
    componentDidUpdate() {
        this.renderEchartDom()
    },

    // remove
    componentWillUnmount() {
        echarts.dispose(this.refs.chart)
    },

    // render the dom
    renderEchartDom() {
        // init the echart object
        let echartObj = this.getEchartsInstance();
        // set the echart option
        echartObj.setOption(this.props.option || this.state.option);
        // set loading mask
        this.props.showLoading ? echartObj.showLoading() : echartObj.hideLoading();

        return echartObj;
    },

    getEchartsInstance() {
        // return the echart object
        return echarts.getInstanceByDom(this.refs.echartsDom) || echarts.init(this.refs.echartsDom, this.props.theme || macarons);
    },

    render() {
        let style = this.props.style || {height: '300px'};
        // for render
        return (
            <div ref='echartsDom'
                className={this.props.className}
                style={style} />
        );
    },

    onSelect(param,chart){
        console.log(param);
        let self =  this;
        let selectedSeriesIndex = param.seriesIndex;
        let selectedDataIndex = param.dataIndex;

        //if selected , the reset style and make state unselected
        let option = chart.getOption();
        let series = option.series;

        let unselectItemStyle = {
            normal:{
                opacity: self.props.opacity || 1,
                borderWidth: 1
            }
        };

        let newStyle = self.state.selectedIndex[selectedSeriesIndex] ? unselectItemStyle: selectedItemStyle;

        series.forEach(function(value,index){
           let selectedData =  value.data[selectedDataIndex];
           if(typeof selectedData === 'object'){
               selectedData.itemStyle = newStyle;
           }else{
               value.data[selectedDataIndex] = {
                   name: value.name,
                   value: selectedData,
                   itemStyle: newStyle
               };
           }
        });

        self.state.selectedIndex[selectedSeriesIndex] =  ! self.state.selectedIndex[selectedSeriesIndex];

        chart.setOption(option);
        (typeof self.props.onSelect === 'function') && self.props.onSelect(param,chart);
    },

    //brush select
    onBrushSelect(param,chart){
        (typeof this.props.onBrushSelect === 'function') && this.props.onBrushSelect(param.batch[0].selected,chart);
    }
});
module.exports = BarChart;
