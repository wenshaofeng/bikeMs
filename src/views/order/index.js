import React, { Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import './../../style/common.less'

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker;

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderConfirmVisible: false,
            orderInfo: {}
        }
        this.params = {
            page: 1
        }
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        let _this = this
        axios
            .get({
                url: '/order/list',
                data: {
                    params: {
                        page: this.params.page
                    }
                }
            })
            .then((res) => {
                let list = res.result.item_list.map((item, index) => {
                    item.key = index
                    return item
                })
                this.setState({
                    list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current
                        _this.requestList()
                    })
                })
            })
    }

    //查询订单
    handleSearch = (info) => {
        console.log(info);
        axios
            .get({
                url: '/order/search',
                data: {
                    params: info
                }
            })
            .then(res => {
                if (res.code === 0) {
                    message.success(`${res.result}`)
                    this.requestList()
                }
            })
    }

    //结束订单-确认车辆信息
    handleConfirm = () => {
        let item = this.state.selectedItem

        if (!item) {
            Modal.info({
                title: '温馨提示',
                content: '请选择需要操作的订单'
            })
            return
        }
        if (item.status === 2) {
            Modal.info({
                title: '温馨提示',
                content: '该订单行程已结束'
            })
            return
        }
        axios
            .get({
                url: '/order/ebike_info',
                data: {
                    params: {
                        orderId: item.id
                    }
                }
            })
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        orderInfo: res.result,
                        orderConfirmVisible: true
                    })
                }
            })
    }

    //结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem
        axios
            .get({
                url: '/order/finish_order',
                data: {
                    params: {
                        orderId: item.id
                    }
                }
            })
            .then((res) => {
                if (res.code === 0) {
                    message.success(`${res.msg}`)
                    this.setState({
                        orderConfirmVisible: false
                    })
                    this.requestList()
                }
            })
    }

    //选择某一行订单
    onRowClick = (record, index) => {
        let selectKey = [index]

        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
        console.log(record);
    }

    //打开订单详情页
	openOrderDetails = () => {
		let item = this.state.selectedItem
		if (!item) {
			Modal.info({
				title: '提示',
				content: '请先选择一条订单'
			})
			return
		}
		window.open(`/#/common/order/detail/${item.id}`, '_blank')
	}

    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                align: 'center',
                dataIndex: 'user_name',
                width: 80
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                align: 'center',
                width: 80,
                render(distance) {
                    return distance / 1000 + ' km'
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                align: 'center',
                width: 100
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 80,
                align: 'center',
                render(status) {
                    return (
                        status === 1 ? '进行中' : '行程结束'
                    );
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                width: 100
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                width: 100
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                align: 'center',
                width: 100
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                width: 100,
                align: 'center'
            }
        ]

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        }
        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        return (
            <div>
                <Card>
                    <FilterForm search={this.handleSearch.bind(this)} />
                </Card>

                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetails} > 订单详情 </Button>
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={this.handleConfirm}>
                        结束订单
					</Button>
                </Card>

                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    />
                </div>

                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisible: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={400}
                >
                    <Form layout="horizontal">
                        <FormItem {...formItemLayout} label="车辆编号">
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem {...formItemLayout} label="剩余电量">
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem {...formItemLayout} label="行程开始时间">
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem {...formItemLayout} label="当前位置">
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

class FilterForm extends Component {
    handleReset = () => {
        this.props.form.resetFields()
    }

    handleSearchClick = () => {
        this.props.search(this.props.form.getFieldsValue())
    }

    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {getFieldDecorator('city_id')(
                        <Select
                            style={{
                                width: 100
                            }}
                            placeholder="全部"
                        >
                            <Option value=""> 全部 </Option>
                            <Option value="1"> 北京市 </Option>
                            <Option value="2"> 天津市 </Option>
                            <Option value="3"> 深圳市 </Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem label="订单时间">
                    {getFieldDecorator('start_time')(
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="选择开始时间"
                            style={{
                                width: 180
                            }} />
                    )}
                    <label style={{ marginLeft: 10 }} >  ~ </label>
                    {getFieldDecorator('end_time')(
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="选择结束时间"
                            style={{ marginLeft: 10, width: 180 }} />
                    )}
                </FormItem>

                <FormItem label="订单状态">
                    {getFieldDecorator('op_mode')(
                        <Select
                            placeholder="全部"
                            style={{
                                width: 120
                            }}
                        >
                            <Option value=""> 全部 </Option>
                            <Option value="1"> 进行中 </Option>
                            <Option value="2"> 行程结束 </Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem>
                    <Button
                        type="primary"
                        style={{
                            margin: '0 20px'
                        }}
                        onClick={this.handleSearchClick}
                    >
                        查询
					</Button>
                    <Button onClick={this.handleReset}> 重置 </Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create({})(FilterForm)
export default Order;