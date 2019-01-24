import React, { Component } from 'react';
import { Row, Col } from "antd";
import Header from './components/header'
import Footer from './components/footer'
import Home from './views/home'
import NavLeft from './components/navLeft'
import './style/common.less'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Row className='container'>
                <Col span={4} className='nav-left'>
                    <NavLeft />
                </Col>
                <Col span={20} className='main'>
                    <Header />
                    <Row className='content'>
                        <Home />
                    </Row>
                    <Footer />
                </Col>
            </Row>
        );
    }
}

export default Admin;