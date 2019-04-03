import React, { Component, Fragment } from 'react';
import { Row, Col, Modal } from 'antd'
import moment from 'moment'
import axios from '../../axios'
import { connect } from 'react-redux'
import { handleLogout } from '../../store/actionCreator'
import MenuConfig from './../../config/menuConfig'

import './index.less'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentKey: window.location.hash.replace(/#|\?.*$/g, ''),
            title: ''
        }
    }
    checkTitle = (menus) => {
        menus.map(item => {
            if (item.children) {
                this.checkTitle(item.children)
            }
            if (item.key === this.state.currentKey) {
                this.setState((preState) => ({
                    title: item.title
                }))
            }

        })
    }
    componentWillMount() {
        this.setState({
            userName: '二狗子'
        })
        this.checkTitle(MenuConfig)
        setInterval(() => {
            let sysTime = moment().format('YYYY MM Do,h:mm:ss a')
            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherAPIData()
    }


    getWeatherAPIData() { // 获取百度天气接口
        let city = '深圳'
        axios.jsonp({
            url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        }).then((res) => {
            if (res.status === 'success') {
                let currentCity = res.results[0].currentCity
                let data = res.results[0].weather_data[0]
                this.setState({
                    currentCity: currentCity,
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }

    handleLogout = (type) => { // 退出登陆
        const { dispatch } = this.props
        console.log(typeof type); // String
        let _that = this
        Modal[type]({
            title: '确认？',
            content: '你确定要退出账号吗？',

            //调接口的地方
            onOk() {
                localStorage.removeItem('token')
                dispatch(handleLogout(localStorage.getItem('token')))
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }

    render() {
        const menuType = this.props.menuType
        const menuName = this.props.menuName
        const urlMenuName = this.props.urlMenuName 
        return (
            <div className='header'>
                <Modal
                    title='React'
                    visible={this.state.showLogoutModal}
                    onCancel={() => {
                        this.setState({
                            showLogoutModal: false
                        })
                    }}>
                    <p>确认要退出账号吗?</p>
                </Modal>
                <Row className='header-top'>
                    {menuType ? (
                        <Col span={6} className='logo'>
                            <img src='/assets/logo-ant.svg' alt='' />
                            <span>IMOOC 通用管理系统 </span>
                        </Col>
                    ) : ('')
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a onClick={() => { this.handleLogout('confirm') }}>
                            退出
                            </a>
                    </Col>
                </Row>
                {
                    menuType ? ('') : (<Row className='breadcrumb'>
                        <Col span={4} className='breadcrumb-title'>
                            {urlMenuName ? urlMenuName : this.state.title}
                        </Col>
                        <Col span={20} className='weather'>
                            <span className='date'>{this.state.sysTime}</span>
                            <span className='weather-detail'>
                                {this.state.currentCity}
                            </span>
                            <span className='weather-img'>
                                <img src={this.state.dayPictureUrl} alt='' />
                            </span>
                            <span className='weather-detail'>
                                {this.state.weather}
                            </span>
                        </Col>
                    </Row>
                    )
                }

            </div>
        )
    }
}

const mapState = (state) => ({
    menuName: state.menuName,
    urlMenuName : state.url
})

export default connect(mapState, null)(Header);