import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'

class Modals extends Component {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }

    handleOpen = (type) => {
        console.log(type);
        this.setState({
            [type]: true
        })
    }

    handleConfirm = (type) => {
        console.log(typeof type); // String


        Modal[type]({
            title: '确认？',
            content: '你确定你学会了React吗？',

            //调接口的地方
            onOk() {
                console.log('OK')
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }

    render() {
        return (
            <div>
                <Card title='基础模态框' className='card-wrap'>
                    <Button type='primary' onClick={() => { this.handleOpen('showModal1') }}>Open</Button>
                    <Button type='primary' onClick={() => { this.handleOpen('showModal2') }}>自定义页脚</Button>
                    <Button type='primary' onClick={() => { this.handleOpen('showModal3') }}>顶部20px弹窗</Button>
                    <Button type='primary' onClick={() => { this.handleOpen('showModal4') }}>水平垂直居中</Button>
                </Card>

                <Card title='信息确认框' className='card-wrap'>
                    <Button type='primary' onClick={() => { this.handleConfirm('confirm') }}>Confirm</Button>
                    <Button type='primary' onClick={() => { this.handleConfirm('info') }}>Info</Button>
                    <Button type='primary' onClick={() => { this.handleConfirm('success') }}>Success</Button>
                    <Button type='primary' onClick={() => { this.handleConfirm('error') }}>error</Button>
                </Card>

                <Modal
                    title='React'
                    visible={this.state.showModal1}
                    onCancel={() => {
                        this.setState({
                            showModal1: false
                        })
                    }}>
                    <p>欢迎学习React</p>
                </Modal>

                <Modal
                    title='React'
                    visible={this.state.showModal2}
                    okText='不学了'
                    cancelText='好的'
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}>
                    <p>欢迎学习React</p>
                </Modal>
                <Modal
                    title='React'
                    visible={this.state.showModal3}
                    style={{ top: 20 }}
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }}>
                    <p>欢迎学习React</p>
                </Modal>
                <Modal
                    title='React'
                    visible={this.state.showModal4}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }}>
                    <p>欢迎学习React</p>
                </Modal>
            </div>
        )
    }
}

export default Modals
