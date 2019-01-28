import { Button, Card, Checkbox, DatePicker, Form, Icon, Input, InputNumber, message, Radio, Select, Switch, TimePicker, Upload } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

class FormRegister extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue()
    console.log(JSON.stringify(userInfo))
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        useImg: imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 10
      }
    }
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }
    const rowObject = {
      minRows: 4,
      maxRows: 6
    }

    return (
      <div>
        <Card title='注册表单'>
          <Form>
            <FormItem label='用户名' {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不为空'
                    }
                  ]
                })(<Input placeholder='请输入用户名' />)
              }
            </FormItem>

            <FormItem label='密码' {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [{
                    required: true,
                    message: '密码不为空'
                  }]
                })(<Input type='password' placeholder='请输入密码' />)
              }
            </FormItem>

            <FormItem label='性别' {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1',
                  rules: []
                })(
                  <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>

            <FormItem label='年龄' {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18,
                  rules: []
                })(
                  <InputNumber />
                )
              }
            </FormItem>

            <FormItem label='当前状态' {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '3',
                  rules: []
                })(
                  <Select>
                    <Option value='1'>咸鱼一条</Option>
                    <Option value='2'>风华浪子</Option>
                    <Option value='3'>北大才子</Option>
                    <Option value='4'>百度FE</Option>
                    <Option value='5'>创业者</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem label='爱好' {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['2', '5'],
                  rules: []
                })(
                  <Select mode='multiple'>
                    <Option value='1'>游泳</Option>
                    <Option value='2'>篮球</Option>
                    <Option value='3'>足球</Option>
                    <Option value='4'>跑步</Option>
                    <Option value='5'>爬山</Option>
                    <Option value='6'>爬山1</Option>
                    <Option value='7'>爬山2</Option>
                    <Option value='8'>爬山3</Option>
                    <Option value='9'>爬山4</Option>
                    <Option value='10'>爬山5</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem label='是否已婚' {...formItemLayout}>
              {
                getFieldDecorator('isMarry', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Switch />
                )
              }
            </FormItem>

            <FormItem label='生日' {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2018-08-08')
                })(
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss' />
                )
              }
            </FormItem>

            <FormItem label='联系地址' {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '北京市'
                })(
                  <TextArea
                    autosize={rowObject}
                  />
                )
              }
            </FormItem>

            <FormItem label='早起时间' {...formItemLayout}>
              {
                getFieldDecorator('time')(
                  <TimePicker />
                )
              }
            </FormItem>

            <FormItem label='头像' {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType='picture-card'
                    showUploadList={false}
                    action='//jsonplaceholder.typicode.com/posts/'
                    onChange={this.handleChange}
                  >
                    {this.state.useImg ? <img src={this.state.useImg} alt='' /> : <Icon type='plus' />}
                  </Upload>
                )
              }
            </FormItem>

            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('Agreement')(
                  <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                )
              }
            </FormItem>

            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('register')(
                  <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                )
              }
            </FormItem>

          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormRegister)
