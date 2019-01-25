import React, { Component } from 'react'
import {Card, Button, notification} from 'antd'

class Notices extends Component {

  openNotification = (type, direction) => {
    if (direction) {
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: '发工资了',
      description: '上个月考勤22天，迟到12天',
    })
  }

  render () {
    return (
      <div>
        <Card title='通知提醒框' className='card-wrap'>
          <Button type='danger' onClick={() => {this.openNotification('success')}}>
            Success
          </Button>
          <Button type='dashed' onClick={() => {this.openNotification('info')}}>
            Info
          </Button>
          <Button type='default' onClick={() => {this.openNotification('warning')}}>
            Warning
          </Button>
          <Button type='primary' onClick={() => {this.openNotification('error')}}>
            Error
          </Button>
        </Card>
        <Card title='通知提醒框' className='card-wrap'>
          <Button type='danger' onClick={() => {this.openNotification('success', 'topLeft')}}>
            左上提醒框
          </Button>
          <Button type='dashed' onClick={() => {this.openNotification('info', 'topRight')}}>
            右上提醒框
          </Button>
          <Button type='default' onClick={() => {this.openNotification('warning', 'bottomLeft')}}>
            左下提醒框
          </Button>
          <Button type='primary' onClick={() => {this.openNotification('error', 'bottomRight')}}>
            右下提醒框
          </Button>
        </Card>
      </div>
    )
  }
}

export default Notices
