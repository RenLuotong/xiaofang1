import React, { Component } from 'react';
import { Card, Tag, Tree, Icon, Button } from 'antd';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pictorialBar';
import 'echarts/lib/component/legend';
export default class componentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BarOption: {}
        };
    };

    componentDidMount() {
        let { type, params } = this.props;
        if (type == '器材装备') {
            this.qicaiBar(JSON.parse(params));
        }
    };

    //返回对应数据   
    // item:标签名称
    // labelItem:标签数组
    // data:数据数组
    getDataItem(labelItem, label, data) {
        var dataItem;
        for (var i = 0; i < label.length; i++) {
            if (label[i] == labelItem) {
                dataItem = data[i]
            }
        }
        return dataItem;
    }

    qicaiBar = (params) => {

        //象形柱状图
        var spirit = "background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYxREQwQzI4NzI2QTExRUE5RkRFQTY1QThCNjdGODIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYxREQwQzI5NzI2QTExRUE5RkRFQTY1QThCNjdGODIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjFERDBDMjY3MjZBMTFFQTlGREVBNjVBOEI2N0Y4MjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjFERDBDMjc3MjZBMTFFQTlGREVBNjVBOEI2N0Y4MjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6KvM4GAAAAG0lEQVR42mL8//8/AzpgYsACRgVHBaklCBBgAKFXAzkRMtjgAAAAAElFTkSuQmCC');"

        let option = {
            backgroundColor: params.backgroundColor, //背景色
            xAxis: {
                max: params.maxData,
                splitLine: { show: false },
                offset: 10,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                data: params.label,
                inverse: true,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    margin: 10,
                    color: 'rgb(1,240,252)',
                    fontSize: 16
                }
            },
            grid: {
                top: 'center',
                height: 250,
                left: 70,
                right: 100
            },
            series: [{
                type: 'bar',
                barWidth: 15,
                barGap: "80%",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [
                            { offset: 0, color: "rgb(0,240,255)" },
                            { offset: 1, color: "rgb(253,224,131)" }
                        ]
                        )
                    },
                },
                data: params.data,
                z: 0
            }, {
                type: 'pictorialBar',
                symbol: spirit,
                barGap: "-100%",
                symbolSize: [2.5, 15],
                z: 2,
                symbolMargin: '50%',   //间隔
                itemStyle: { //图形样式
                    normal: {
                        color: params.backgroundColor//’#101634’
                    }
                },
                data: params.data,
                symbolBoundingData: params.maxData,
                symbolRepeat: 'fixed',
                symbolClip: true,
                tooltip: {
                    show: false
                },
            }, {
                // full data
                type: 'pictorialBar',
                itemStyle: {
                    normal: {
                        //柱形图圆角，初始化效果
                        color: "rgba(255,255,255,0.2)",
                    }
                },
                label: {
                    show: true,
                    formatter: function (params) {
                        return `( ${params.value}件 )`
                    },
                    position: 'right',
                    offset: [10, 0],
                    color: 'rgb(1,240,252)',
                    fontSize: 16
                },
                animationDuration: 0,
                symbolRepeat: 'fixed',
                symbolMargin: '50%',
                symbol: 'rect',
                symbolSize: [2.5, 15],
                symbolBoundingData: params.maxData,
                data: params.data,
                z: 1
            }]
        };
        this.setState({
            BarOption: option
        })
    };


    render() {

        return (
            <ReactEchartsCore
                style={this.props.heighttemp == 'auto' ? {} : { height: this.props.heighttemp }}
                echarts={echarts}
                option={this.state.BarOption}
            />
        );
    }
}
