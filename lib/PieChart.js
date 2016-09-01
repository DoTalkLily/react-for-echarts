'use strict';

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

var PieChart = _react2['default'].createClass({
    displayName: 'PieChart',

    propTypes: {
        option: _react2['default'].PropTypes.object,
        title: _react2['default'].PropTypes.string,
        subTitle: _react2['default'].PropTypes.string,
        style: _react2['default'].PropTypes.object,
        data: _react2['default'].PropTypes.array,
        legend: _react2['default'].PropTypes.array,
        series: _react2['default'].PropTypes.array,
        opacity: _react2['default'].PropTypes.number,
        className: _react2['default'].PropTypes.string,
        theme: _react2['default'].PropTypes.string,
        enableRing: _react2['default'].PropTypes.bool, //变成圆环 设置bool或者内半径(<=0 && <=1)
        showLoading: _react2['default'].PropTypes.bool, //是否展示loading动画
        hoverAnimation: _react2['default'].PropTypes.bool, //是否hover动画
        onChartReady: _react2['default'].PropTypes.func,
        onEvents: _react2['default'].PropTypes.object,
        onSelect: _react2['default'].PropTypes.func
    },

    getInitialState: function getInitialState() {
        var data = this.props.data;
        var legend = void 0,
            singlePieConfig = void 0;
        //single pie chart or just use series
        if (!this.props.series && data) {
            legend = [];

            data.forEach(function (value, index) {
                typeof value.name === 'string' && legend.push(value.name);
            });

            singlePieConfig = [{
                type: 'pie',
                radius: this.props.enableRing ? ['50%', '70%'] : '50%',
                center: ['50%', '50%'],
                data: this.props.data || [],
                itemStyle: {
                    normal: {
                        opacity: this.props.opacity || 1
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.8)',
                        opacity: 1
                    }
                },
                selectedMode: 'multiple',
                selectedOffset: 0,
                hoverAnimation: !!this.props.hoverAnimation
            }];
        }

        var option = {
            title: {
                text: this.props.title || '',
                subtext: this.props.subtitle || '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: this.props.legend || legend || []
            },

            series: this.props.series || singlePieConfig
        };

        return {
            option: option
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

        //on select
        echartObj.on('pieselectchanged', function (param) {
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


    //events
    onSelect: function onSelect(param, chart) {
        var selectedIndex = -1;
        var option = chart.getOption();

        option.series[0].data.forEach(function (obj, index) {
            obj.name === param.name && (selectedIndex = index);
        });

        if (selectedIndex >= 0) {
            param.selected[param.name] ? option.series[0].data[selectedIndex].itemStyle = selectedItemStyle : // if selected
            delete option.series[0].data[selectedIndex].itemStyle; // if unselected
        }

        chart.setOption(option);

        typeof this.props.onSelect === 'function' && this.props.onSelect(param, chart);
    }
});
module.exports = PieChart;