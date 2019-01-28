import React, { Component } from 'react'
import axios from '../../axios'
import { Card, Table } from 'antd'
class BasicTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource2: []
        }
    }

    componentDidMount() {
        const dataSource = [
            {
                key: '0',
                id: '0',
                userName: 'Jack',
                sex: 1,
                state: 3,
                interest: 1,
                birthday: '2001-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                key: '1',
                id: '1',
                userName: 'Tom',
                sex: 0,
                state: 2,
                interest: 3,
                birthday: '2001-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                key: '2',
                id: '2',
                userName: 'Liny',
                sex: 1,
                state: 1,
                interest: 1,
                birthday: '2001-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            }
        ]
        this.setState({ dataSource })
        this.request()
    }

    request = () => {
        (
            axios.get({
                url: '/table/list',
                data: {
                    paramrs:{
                        page:1,
                    },
                    isShowLoading: true
                },
            }).then(res => {
                console.log(res);
                if (res.code === 0) {
                    this.setState(() => ({
                        dataSource2: res.result
                    }))

                }
            })
        )
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者',
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '跑步',
                        '3': '篮球',
                        '4': '足球',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        return (
            <div>
                <Card
                    title='基础表格'
                >
                    <Table

                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>

                <Card
                    title='动态数据渲染表格-Mooc'
                    style={{ margin: '10px 0' }}
                >
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}

export default BasicTable
