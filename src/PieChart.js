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

const PieChart = React.createClass({
    propTypes: {
        option: React.PropTypes.object,
        title: React.PropTypes.string,
        subTitle: React.PropTypes.string,
        style: React.PropTypes.object,
        data: React.PropTypes.array,
        legend: React.PropTypes.array,
        series: React.PropTypes.array,
        opacity: React.PropTypes.number,
        className: React.PropTypes.string,
        theme: React.PropTypes.string,
        enableBrush: React.PropTypes.bool,    //是否展示圈选控件
        enableRing: React.PropTypes.bool,     //变成圆环 设置bool或者内半径(<=0 && <=1)
        showLoading: React.PropTypes.bool,    //是否展示loading动画
        hoverAnimation: React.PropTypes.bool, //是否hover动画
        onChartReady: React.PropTypes.func,
        onEvents: React.PropTypes.object,
        onSelect: React.PropTypes.func
    },

    getInitialState(){
        let data = this.props.data;
        let legend,singlePieConfig;
        //single pie chart or just use series
        if(!this.props.series && data && data.length === 1){
            data.forEach(function(value,index){
                typeof value.name === 'string' && legend.push(value.name);
            });

            singlePieConfig = [
                {
                    type: 'pie',
                    radius: this.props.enableRing ? ['50%', '70%'] : '50%',
                    center: ['50%', '50%'],
                    data:this.props.data || [],
                    itemStyle: {
                        normal: {
                            opacity: this.props.opacity || 1,
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.8)',
                            opacity:1
                        }
                    },
                    selectedMode:'multiple',
                    selectedOffset: 0,
                    hoverAnimation: !!this.props.hoverAnimation
                }
            ];
        }


        let option = {
            title : {
                text: this.props.title || '',
                subtext: this.props.subtitle || '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: this.props.legend || legend || []
            },
            brush: {
                throttleType: 'debounce',
                throttleDelay: 300,
                brushMode: 'multiple',
                inBrush:{
                    opacity:1
                }
            },
            series : this.props.series || singlePieConfig
        };
        //enable brush in toolbox
        if(this.props.enableBrush){
            option.brush = {
                throttleType: 'debounce',
                throttleDelay: 300,
                brushMode: 'multiple',
                inBrush:{
                    opacity:1
                }
            };
        }

        return {
            option : option
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

        //on select
        echartObj.on('pieselectchanged',function(param){
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
        return echarts.getInstanceByDom(this.refs.echartsDom) || echarts.init(this.refs.echartsDom, this.props.theme|| macarons);
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

    //events
    onSelect(param,chart){
        let selectedIndex = -1;
        let option = chart.getOption();

        option.series[0].data.forEach(function(obj,index){
            (obj.name === param.name) && (selectedIndex = index);
        });

        if( selectedIndex >= 0 ){
            param.selected[param.name] ? (option.series[0].data[selectedIndex].itemStyle = selectedItemStyle)  // if selected
                : (delete option.series[0].data[selectedIndex].itemStyle);            // if unselected
        }

        chart.setOption(option);

        (typeof this.props.onSelect === 'function') && this.props.onSelect(param,chart);
    }
});
module.exports = PieChart;
