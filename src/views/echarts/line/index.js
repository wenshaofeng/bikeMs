import React, { Component, Fragment } from 'react';
import { Card } from 'antd'
import echartTheme from './../echartTheme3'
// import echarts from 'echarts'
// 按需加载
import echarts from 'echarts/lib/echarts'
// 导入折线图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'


class Line extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme)
    }

    getOption1 = () => {
        let option = {
            title: {
                text: '用户骑行菜单',
                x: 'center'
            },
            legend: {
                data: ['订单量'],
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1234, 5536, 7634, 7864, 9875, 4523, 5422]
                }
            ]
        }
        return option
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行菜单'
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['OFO订单量', '摩拜订单量'],
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [1234, 5536, 7634, 7864, 9875, 4523, 5422]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [8546, 6545, 4578, 6523, 1598, 5987, 7841]
                },
            ]
        }
        return option
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行菜单'
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['OFO订单量'],
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [1234, 5536, 7634, 7864, 9875, 4523, 5422],
                    areaStyle: {}
                }
            ]
        }
        return option
    }

    getOption4 = () => {
        let option = {
            title: {
                text: '用户骑行菜单'
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['OFO订单量','摩拜订单量'],
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [1234, 5536, 7634, 7864, 9875, 4523, 5422],
                    areaStyle: {}
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [8546, 6545, 4578, 6523, 1598, 5987, 7841],
                    areaStyle: {}
                }
            ]
        }
        return option
    }

    render() {
        return (
            <Fragment>
                <Card title="折线图：一">
                    <ReactEcharts option={this.getOption1()} theme='Imooc' style={{ height: 400 }} />
                </Card>

                <Card title="折线图：二" style={{ marginTop: 20 }}>
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{ height: 400 }} />
                </Card>

                <Card title="折线图：三" style={{ marginTop: 20 }}>
                    <ReactEcharts option={this.getOption3()} theme='Imooc' style={{ height: 400 }} />
                </Card>

                <Card title="折线图：四" style={{ marginTop: 20 }}>
                    <ReactEcharts option={this.getOption4()} theme='Imooc' style={{ height: 400 }} />
                </Card>
            </Fragment>
        );
    }
}

export default Line;