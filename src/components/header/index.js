import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd'
import moment from 'moment'
import axios from '../../axios'
import './index.less'

class Header extends Component {
    componentWillMount() {
        this.setState({
            userName: '二狗子'
        })
        setInterval(() => {
            let sysTime = moment().format('YYYY MM Do,h:mm:ss a')
            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherAPIData()
    }
    getWeatherAPIData() {
        let city = '惠州'
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
    render() {
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href='#'>退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        首页
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
            </div>
        );
    }
}

export default Header;