import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'
const FormItem = Form.Item
class FormLogin extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    let userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((error, value) => {
      if (!error) {
        console.log('nice');     
        console.log(value);
        message.success(`${userInfo.userName} 恭喜您通过本次表单学习，当前密码为${userInfo.userPwd}`)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Card
          title='登陆行内表单'
          className='card-wrap'
        >
          <Form layout='inline'>
            <FormItem>
              <Input placeholder='请输入用户名' />
            </FormItem>
            <FormItem>
              <Input placeholder='请输入密码' />
            </FormItem>
            <FormItem>
              <Button type='primary'>登录</Button>
            </FormItem>
          </Form>
        </Card>

        <Card
          title='登陆水平表单'
        >
          <Form style={{ width: 300 }}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不为空'
                    },
                    {
                      min: 5,
                      max: 10,
                      message: '用户名长度不在范围内'
                    },
                    {
                      pattern: new RegExp('^\\w+$', 'g'),
                      message: '用户名必须为字母或者数字'
                    }
                  ]
                })(<Input prefix={<Icon type='user' />} placeholder='请输入用户名' />)
              }

            </FormItem>
            <FormItem>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '密码不为空'
                    }
                  ]
                })(<Input type='password' prefix={<Icon type='lock' />} placeholder='请输入密码' />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
                  rules: []
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="#/admin/form/login" style={{ float: 'right' }}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type='primary' onClick={this.handleSubmit}>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormLogin)
