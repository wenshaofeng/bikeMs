import React, { Component, Fragment } from 'react';
import { Card } from 'antd'
import echartTheme from './../echartTheme2'
// import echarts from 'echarts'
// 按需加载
import echarts from 'echarts/lib/echarts'
// 导入饼图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme)
    }

    getOption1 = () => { // 饼图 1 配置
        let option = {
            title: {
                text: '用户骑行菜单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 8542,
                            name: '周二'
                        },
                        {
                            value: 2654,
                            name: '周三'
                        },
                        {
                            value: 7895,
                            name: '周四'
                        },
                        {
                            value: 7569,
                            name: '周五'
                        },
                        {
                            value: 8976,
                            name: '周六'
                        },
                        {
                            value: 2100,
                            name: '周日'
                        },
                    ]
                }
            ]
        }
        return option
    }

    getOption2 = () => { // 饼图 2 配置
        let option = {
            title: {
                text: '用户骑行菜单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 8542,
                            name: '周二'
                        },
                        {
                            value: 2654,
                            name: '周三'
                        },
                        {
                            value: 7895,
                            name: '周四'
                        },
                        {
                            value: 7569,
                            name: '周五'
                        },
                        {
                            value: 8976,
                            name: '周六'
                        },
                        {
                            value: 2100,
                            name: '周日'
                        },
                    ]
                }
            ]
        }
        return option
    }

    getOption3 = () => { // 饼图 3 配置
        let option = {
            title: {
                text: '用户骑行菜单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',

                    data: [
                        {
                            value: 4500,
                            name: '周一'
                        },
                        {
                            value: 8542,
                            name: '周二'
                        },
                        {
                            value: 6954,
                            name: '周三'
                        },
                        {
                            value: 7895,
                            name: '周四'
                        },
                        {
                            value: 7569,
                            name: '周五'
                        },
                        {
                            value: 8976,
                            name: '周六'
                        },
                        {
                            value: 5600,
                            name: '周日'
                        },
                    ].sort((a, b) => {
                        return a.value - b.value
                    }),
                    roseType: 'radius'
                }
            ]
        }
        return option
    }

    render() {
        return (
            <Fragment>
                <Card title='饼图表一'>
                    <ReactEcharts option={this.getOption1()} theme='Imooc' style={{ height: 400 }} />
                </Card>
                <Card title='饼图表二' style={{ marginTop: 15 }}>
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{ height: 400 }} />
                </Card>
                <Card title='饼图表三' style={{ marginTop: 15 }}>
                    <ReactEcharts option={this.getOption3()} theme='Imooc' style={{ height: 400 }} />
                </Card>
            </Fragment>
        );
    }
}

export default Pie;