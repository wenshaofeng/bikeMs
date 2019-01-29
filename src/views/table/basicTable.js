import React, { Component } from 'react'
import axios from '../../axios'
import { Card, Table, Modal, Button, message } from 'antd'
import Util from '../../utils/utils'
class BasicTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource2: []
        }
        this.params = {
            page: 1
        }
    }

    componentDidMount() {
        const dataSource = [
            {

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
        dataSource.map((item, index) => {
            item.key = index
        })
        this.setState({ dataSource })
        this.request()
    }

    request = () => {
        let _this = this
        axios.get({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page,
                },
                isShowLoading: true
            },
        }).then(res => {
            console.log(res);
            if (res.code === 0) {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState(() => ({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: [],
                    pagination: Util.pagination(res, (current) => {
                        //todo 
                        _this.params.page = current
                        this.request()
                    })

                }))

            }
        })
    }

    onRowClick = (record, index) => { //record 当前数据 index 索引
        let selectKey = [index] //选中的索引
        this.setState(() => ({
            selectedRowKeys: selectKey, // 当前选中的索引
            selectedItem: record  // 当前选中的某条数据
        }))
        console.log(record);

        Modal.info({
            title: '当前用户信息',
            content: `用户名：${record.userName} 性别:${record.sex === 1 ? "男" : "女"} 生日:${record.birthday}`
        })
    }

    handleDelete = () => {
        let rows = this.state.selectedRows
        let ids = []
        let users = []
        rows.map((item) => {
            ids.push(item.id)
            users.push(item.userName)
        })
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗？ ${ids.join(',')} ${users.join('和')} `,
            onOk: () => {
                message.success('删除成功')
                this.request()
            }
        })
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
        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys);
                console.log(selectedRows);

                this.setState(() => ({
                    selectedRowKeys, //必须要有的，设置了这个，页面上才会显示是否选中的状态
                    selectedRows
                }))
            }
        }

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

                <Card
                    title='Mooc-单选'
                    style={{ margin: '10px 0' }}
                >
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    />
                </Card>

                <Card
                    title='Mooc-多选'
                    style={{ margin: '10px 0' }}
                >
                    <div>
                        <Button onClick={this.handleDelete}
                            style={{ margin: '10px 0' }}
                        >删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card
                    title='Mooc-表格分页'
                    style={{ margin: '10px 0' }}
                >
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}

export default BasicTable
