import React, { Component } from 'react'
import { Form, Input, Select, Button, Checkbox, DatePicker } from 'antd'
import Utils from '../../utils/utils'

const FormItem = Form.Item

class FilterForm extends Component {

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList
        const formItemList = []

        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let label = item.label
                let field = item.field 
                let initialValue = item.initialValue || ''
                let id = item.field
                let placeHolder = item.placeholder
                let width = item.width
                if (item.type === '时间查询') {
                    const DataPicker = (
                        <FormItem label="订单时间" key={field}>
                            {getFieldDecorator('start_time')(
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="开始时间"
                                    style={{
                                        width: 170
                                    }} />
                            )}
                            <label style={{ marginLeft: 10 }} >  ~ </label>
                            {getFieldDecorator('end_time')(
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="结束时间"
                                    style={{ marginLeft: 10, width: 170 }} />
                            )}
                        </FormItem>

                    )
                    formItemList.push(DataPicker)
                }
                else if (item.type === 'INPUT') { //Input框
                    const INPUT = (
                        <FormItem label={label} key={field}>
                            {getFieldDecorator([field], {
                                initialValue: initialValue ,
                                id:id
                            })(<Input type="text" placeholder={placeHolder} />)}
                        </FormItem>
                    )
                    formItemList.push(INPUT)
                } else if (item.type === 'SELECT') { //单选框
                    const SELECT = (
                        <FormItem label={label} key={field}>
                            {getFieldDecorator([field], {
                                initialValue: initialValue,
                                id:id
                            })(
                                <Select                   
                                    style={{
                                        width: width
                                    }}
                                    placeholder={placeHolder}
                                >         
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )}
                        </FormItem>
                    )
                    console.log(SELECT);
                    
                    formItemList.push(SELECT)
                } else if (item.type === 'CHECKBOX') { //复选框
                    const CHECKBOX = (
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field], {
                                    valuePropName: 'checked',
                                    initialValue: initialValue // true | false
                                })(<Checkbox>{label}</Checkbox>)
                            }
                        </FormItem>
                    )
                    formItemList.push(CHECKBOX)
                }
            })
        }
        return formItemList
    }

    handleFilterSubmit = () => { //提交表单
        this.props.filterSubmit(this.props.form.getFieldsValue())
    }

    reset = () => { //重置
        this.props.form.resetFields()
    }

    render() {
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button
                        type="primary"
                        style={{
                            margin: '0 20px'
                        }}
                        onClick={this.handleFilterSubmit}
                    >
                        查询
					</Button>
                    <Button onClick={this.reset}> 重置 </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({})(FilterForm)