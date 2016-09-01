'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _echarts = require('echarts');

var _echarts2 = _interopRequireDefault(_echarts);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elementResizeEvent = require('element-resize-event');

var _elementResizeEvent2 = _interopRequireDefault(_elementResizeEvent);

var _theme = require('./theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var selectedItemStyle = {
    normal: {
        opacity: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2
    }
};

var BarChart = _react2['default'].createClass({
    displayName: 'BarChart',

    propTypes: {
        option: _react2['default'].PropTypes.object,
        title: _react2['default'].PropTypes.string,
        subTitle: _react2['default'].PropTypes.string,
        style: _react2['default'].PropTypes.object,
        series: _react2['default'].PropTypes.array,
        category: _react2['default'].PropTypes.array,
        opacity: _react2['default'].PropTypes.number,
        className: _react2['default'].PropTypes.string,
        theme: _react2['default'].PropTypes.string,
        enableStack: _react2['default'].PropTypes.bool, //是否允许堆叠
        enableHorizon: _react2['default'].PropTypes.bool, //是否变成水平柱状图
        enableBrush: _react2['default'].PropTypes.bool, //圈选
        showLoading: _react2['default'].PropTypes.bool, //是否展示loading动画
        onChartReady: _react2['default'].PropTypes.func,
        onEvents: _react2['default'].PropTypes.object,
        onSelect: _react2['default'].PropTypes.func,
        onBrushSelect: _react2['default'].PropTypes.func
    },

    getInitialState: function getInitialState() {
        var legend = void 0;
        var itemStyle = {
            normal: {
                opacity: this.props.opacity || 1
            },
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.8)',
                opacity: 1
            }
        };

        if (this.props.series) {
            legend = [];
            this.props.series.forEach(function (value, index) {
                legend.push(value.name);
                value.itemStyle = itemStyle;
            });
        }

        var category = {
            type: 'category',
            data: this.props.category || [],
            axisTick: {
                alignWithLabel: true
            }
        };

        var option = {
            title: {
                text: this.props.title || '',
                subtext: this.props.subtitle || '',
                x: 'center'
            },
            legend: {
                data: legend || [],
                align: 'left',
                left: 10
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [this.props.enableHorizon ? { type: 'value' } : category],
            yAxis: [this.props.enableHorizon ? category : { type: 'value' }],
            series: this.props.series || []
        };

        //enable brush in toolbox
        if (this.props.enableBrush) {
            option.brush = {
                toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                throttleType: 'debounce',
                throttleDelay: 300,
                brushMode: 'multiple',
                inBrush: {
                    opacity: 1
                },
                outBrush: {
                    opacity: 0.4
                }
            };
        }
        if (this.props.enableStack) {
            option.toolbox = {
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    }
                }
            };
        }

        return {
            option: option,
            selectedIndex: {}
        };
    },


    // first add
    componentDidMount: function componentDidMount() {
        var self = this;
        var echartObj = self.renderEchartDom();
        var onEvents = self.props.onEvents || [];
        //regist default theme
        _echarts2['default'].registerTheme(_theme.macarons);

        var _loop = function _loop(eventName) {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
                // binding event
                echartObj.on(eventName, function (param) {
                    onEvents[eventName](param, echartObj);
                });
            }
        };

        for (var eventName in onEvents) {
            _loop(eventName);
        }

        // on chart ready
        if (typeof self.props.onChartReady === 'function') {
            self.props.onChartReady(echartObj);
        }

        // on resize
        (0, _elementResizeEvent2['default'])(self.refs.echartsDom, function () {
            echartObj.resize();
        });

        //on brush select
        echartObj.on('brushselected', function (param) {
            self.onBrushSelect(param, echartObj);
        });
        //on select
        echartObj.on('click', function (param) {
            self.onSelect(param, echartObj);
        });
    },


    // update
    componentDidUpdate: function componentDidUpdate() {
        this.renderEchartDom();
    },


    // remove
    componentWillUnmount: function componentWillUnmount() {
        _echarts2['default'].dispose(this.refs.chart);
    },


    // render the dom
    renderEchartDom: function renderEchartDom() {
        // init the echart object
        var echartObj = this.getEchartsInstance();
        // set the echart option
        echartObj.setOption(this.props.option || this.state.option);
        // set loading mask
        this.props.showLoading ? echartObj.showLoading() : echartObj.hideLoading();

        return echartObj;
    },
    getEchartsInstance: function getEchartsInstance() {
        // return the echart object
        return _echarts2['default'].getInstanceByDom(this.refs.echartsDom) || _echarts2['default'].init(this.refs.echartsDom, this.props.theme || _theme.macarons);
    },
    render: function render() {
        var style = this.props.style || { height: '300px' };
        // for render
        return _react2['default'].createElement('div', { ref: 'echartsDom',
            className: this.props.className,
            style: style });
    },
    onSelect: function onSelect(param, chart) {
        console.log(param);
        var self = this;
        var selectedSeriesIndex = param.seriesIndex;
        var selectedDataIndex = param.dataIndex;

        //if selected , the reset style and make state unselected
        var option = chart.getOption();
        var series = option.series;

        var unselectItemStyle = {
            normal: {
                opacity: self.props.opacity || 1,
                borderWidth: 1
            }
        };

        var newStyle = self.state.selectedIndex[selectedSeriesIndex] ? unselectItemStyle : selectedItemStyle;

        series.forEach(function (value, index) {
            var selectedData = value.data[selectedDataIndex];
            if ((typeof selectedData === 'undefined' ? 'undefined' : _typeof(selectedData)) === 'object') {
                selectedData.itemStyle = newStyle;
            } else {
                value.data[selectedDataIndex] = {
                    name: value.name,
                    value: selectedData,
                    itemStyle: newStyle
                };
            }
        });

        self.state.selectedIndex[selectedSeriesIndex] = !self.state.selectedIndex[selectedSeriesIndex];

        chart.setOption(option);
        typeof self.props.onSelect === 'function' && self.props.onSelect(param, chart);
    },


    //brush select
    onBrushSelect: function onBrushSelect(param, chart) {
        typeof this.props.onBrushSelect === 'function' && this.props.onBrushSelect(param.batch[0].selected, chart);
    }
});
module.exports = BarChart;