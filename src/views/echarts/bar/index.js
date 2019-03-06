import React, { Component, Fragment } from 'react';
import { Card } from 'antd'
import echartTheme from './../echartTheme'
// 导入所有图表
// import echarts from 'echarts'  
// 按需加载
import echarts from 'echarts/lib/echarts'

// 导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme)
    }
    /*  componentDidMount() {   // 不能放在 componentDidMount 中，经测试放在这个生命周期 主题不能初始化
         echarts.registerTheme('Imooc', echartTheme)
     } */

    getOption1 = () => { //图表一 配置
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
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
                    type: 'bar',
                    data: [1000, 2000, 3000, 5500, 4700, 3500, 900]
                }
            ]
        }
        return option
    }

    getOption2 = () => {//图表二 配置
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['OFO', '摩拜', '小蓝']
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [5000, 2040, 3600, 7500, 8700, 9500, 19000]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [7600, 4300, 5400, 5500, 4700, 7500, 17000]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [4000, 6700, 3400, 8700, 2300, 7800, 12000]
                },
            ]
        }
        return option
    }
    render() {
        return (
            <Fragment>
                <Card title="柱形图：一">
                    <ReactEcharts option={this.getOption1()} theme='Imooc' style={{ height: 500 }} />
                </Card>

                <Card title="柱形图：二" style={{ marginTop: 20 }}>
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{ height: 600 }} />
                </Card>
            </Fragment>
        );
    }
}

export default Bar;