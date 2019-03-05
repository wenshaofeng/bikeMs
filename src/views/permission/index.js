import React, { Component, Fragment } from 'react';
import moment from 'moment'
import { Card, Button, Modal, Form, Select, Input, Tree, Transfer, message } from 'antd'
import ETable from './../../components/ETable'
import axios from './../../axios'
import Utils from './../../utils/utils'

const FormItem = Form.Item
const Option = Select.Option

class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRoleVisible: false,
            isPermVisible: false
        }
        this.params = {
            page: 1
        }
    }

    componentDidMount() {
        this.requestList()
        // axios.requestList(this, '/role/list', {})
    }

    requestList = () => {
        axios.requestList(this, '/role/list', {})
    }

    handleCreateRole = () => { // 弹出创建角色Modal框
        this.setState(() => ({
            isRoleVisible: true
        }))
    }

    handleRoleSubmit = () => { // 创建角色表单提交
        let data = this.roleForm.props.form.getFieldsValue()
        axios
            .get({
                url: 'role/create',
                data: {
                    params: data
                }
            })
            .then((res) => {
                if (res.code === 0) {
                    message.success(`${res.result}`)
                    this.setState({
                        isRoleVisible: false
                    })
                    this.roleForm.props.form.resetFields()
                    this.requestList()
                }
            })

    }

    render() {
        const columns = [ // 表头
            {
                title: '角色ID',
                dataIndex: 'id'
            },
            {
                title: '角色名称',
                dataIndex: 'role_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render(create_time) {
                    return moment(create_time).format('YYYY-MM-DD HH:mm:ss')

                }
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    return status === 1 ? '启用' : '停用'
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render() {
                    return moment().format('YYYY-MM-DD HH:mm:ss')
                }

            },
            {
                title: '授权人',
                dataIndex: 'authorize_user_name'
            }
        ]

        return (
            <Fragment>
                <Card>
                    <Button type="primary" onClick={this.handleCreateRole}>
                        创建角色
					</Button>
                    <Button type="primary" style={{ marginLeft: 10, marginRight: 10 }}>
                        设置权限
					</Button>
                    <Button type="primary">
                        用户授权
					</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        dataSource={this.state.list}
                        // pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedIds={this.state.selectedIds}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        rowSelection={'radio'}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields()
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => (this.roleForm = inst)} />
                </Modal>
            </Fragment>
        );
    }
}

export default Permission;



class RoleForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Fragment>
                <Form layout="horizontal">
                    <FormItem label="角色名称" {...formItemLayout}>
                        {getFieldDecorator('role_name')(<Input type="text" placeholder="请输入角色名称" />)}
                    </FormItem>

                    <FormItem label="状态" {...formItemLayout}>
                        {getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>

            </Fragment>
        );
    }
}

RoleForm = Form.create({})(RoleForm)
