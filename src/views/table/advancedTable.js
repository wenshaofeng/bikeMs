import React, { Component } from 'react'
import { Card, Table, Modal, Button, message, Badge } from 'antd'
import axios from './../../axios'
import Utils from '../../utils/utils'

class AdvancedTable extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.params = {
            page: 1
        }
    }

    componentDidMount() {
        this.request()
    }

    request = () => {
        let _this = this
        axios
            .get({
                url: '/table/high/list',
                data: {
                    params: {
                        page: this.params.page
                    },
                    isShowLoading: true
                }
            })
            .then((res) => {
                if (res.code === 0) {
                    res.result.list.map((item, index) => (
                        item.key = index
                    ))
                    this.setState({
                        dataSource: res.result.list,
                        selectedRowKeys: [],
                        selectedRows: null,
                        pagination: Utils.pagination(res, (current) => {
                            // todo
                            _this.params.page = current
                            this.request()
                        })
                    })
                }
            })
    }

    handleChange = (pagination, filters, sorter) => {
        console.log(sorter);
        this.setState({
            sortOrder: sorter.order,
        });
    }

    handleDelete = (item) => {
        let id = item.id
        console.log(id)
        Modal.confirm({
            title: '确认',
            content: '您确定要删除此条数据吗？',
            onOk: () => {
                message.success('删除成功');
                this.request()
            }
        })
    }


    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 60
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 60,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 60
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 60,
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '跑步',
                        '3': '篮球',
                        '4': '足球',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80
            }
        ]

        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 60,
                fixed: 'left'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                fixed: 'left'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 60,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 70
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 90,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 70,
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '跑步',
                        '3': '篮球',
                        '4': '足球',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday2',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday3',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday4',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday5',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday6',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday7',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday8',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday9',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday10',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 190,
                fixed: 'right'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80,
                fixed: 'right'
            }
        ]

        const columns3 = [
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
                title: '年龄',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
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
                        '5': '创业者'
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
                        '8': '麦霸'
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

        const columns4 = [
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
                title: '年龄',
                dataIndex: 'age'
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
                        '5': '创业者'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': <Badge status="success" text="游泳" />,
                        '2': <Badge status="success" text="跑步" />,
                        '3': <Badge status="error" text="篮球" />,
                        '4': <Badge status="success" text="足球" />,
                        '5': <Badge status="default" text="爬山" />,
                        '6': <Badge status="processing" text="骑行" />,
                        '7': <Badge status="error" text="桌球" />,
                        '8': <Badge status="warning" text="麦霸" />
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
            },
            {
                title: '操作',
                render: (text, item) => {
                    return (
                        <Button
                            size="small"
                            onClick={() => {
                                this.handleDelete(item)
                            }}
                        >
                            删除
						</Button>
                    )
                }
            }
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>

                <Card title="左侧固定" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 1840 }}
                    />
                </Card>

                <Card title="年龄排序" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>

                <Card title="操作" style={{ margin: '10px 0' }}>
                    <Table bordered columns={columns4} dataSource={this.state.dataSource} pagination={false} />
                </Card>
            </div>
        )
    }
}

export default AdvancedTable
