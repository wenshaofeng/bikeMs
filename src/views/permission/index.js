import React, { Component, Fragment } from 'react';
import moment from 'moment'
import { Card, Button, Modal, Form, Select, Input, Tree, Transfer, message } from 'antd'
import ETable from './../../components/ETable'
import axios from './../../axios'
import Utils from './../../utils/utils'
import data from './../../config/menuConfig'

const FormItem = Form.Item
const Option = Select.Option
const { TreeNode } = Tree

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
    }

    requestList = () => { // 请求权限列表数据
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

    OpenSettingPermissions = () => { //权限设置弹框
        let item = this.state.selectedItem
        if (!item) {
            Modal.info({
                title: '温馨提示',
                content: '请选择一个角色'
            })
            return
        }
        this.setState(() => ({
            isPermVisible: true,
            detailInfos: item,
            menus: item.menus
        }))
    }

    handleSettingPremission = ()=>{ // 提交权限设置
        let data = this.permForm.props.form.getFieldsValue()
		data.role_id = this.state.selectedItem.id
		data.menus = this.state.menus
		axios
			.get({
				url: '/permission/edit',
				data: {
					params: {
						...data
					}
				}
			})
			.then((res) => {
				if (res.code === 0) {
                    message.success(`${res.result}`)
					this.setState({
						isPermVisible: false
					})
					this.requestList(this, '/role/list', {})
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
                    <Button type="primary" onClick={this.OpenSettingPermissions} style={{ marginLeft: 10, marginRight: 10 }}>
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

                <Modal
                    width={600}
                    title="权限设置"
                    visible={this.state.isPermVisible}
                    onOk={this.handleSettingPremission}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}

                >
                    <PermEditForm
                        detailInfo={this.state.detailInfos}
                        menuInfo={this.state.menus}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState(() => ({
                                menus: checkedKeys
                            }))
                        }}
                        wrappedComponentRef={(inst) => (this.permForm = inst)}
                    />
                </Modal>
            </Fragment>
        );
    }
}

export default Permission;

class RoleForm extends Component { // 创建角色表单子组件
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

class PermEditForm extends Component { // 权限设置表单子组件

    renderTreeNodes = data => data.map((item) => { // 遍历、展开所有树形节点
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        } else {
            return <TreeNode {...item} />
        }
    })

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }
        const { getFieldDecorator } = this.props.form
        const detail_Info = this.props.detailInfo
        const menu_Info = this.props.menuInfo
        return (
            <Fragment>
                <Form layout="horizontal">
                    <FormItem label="角色名称" {...formItemLayout}>
                        <Input type="text" disabled placeholder={detail_Info.role_name} />
                    </FormItem>
                    <FormItem label="状态" {...formItemLayout}>
                        {getFieldDecorator('status', {
                            initialValue: "1"
                        })(
                            <Select >
                                <Option value="1">启用</Option>
                                <Option value="0">停用</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menu_Info}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(data)}
                    </TreeNode>
                </Tree>
            </Fragment>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm)