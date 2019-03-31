import React, { Component } from 'react';
import { Row, Col } from "antd";
import Header from './components/header'
import Footer from './components/footer'
import Home from './views/home'
import NavLeft from './components/navLeft'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './style/common.less'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        let params = this.props
        console.log(params);
    }
    render() {
        const token = this.props.token
        if (token) {
            return (
                <Row className='container'>
                    <Col span={4} className='nav-left'>
                        <NavLeft />
                    </Col>
                    <Col span={20} className='main'>
                        <Header />
                        <Row className='content'>
                            {/* <Home /> */}
                            {this.props.children}
                        </Row>
                        <Footer />
                    </Col>
                </Row>
            );
        }
        else {
            return <Redirect to='/login'></Redirect>
        }
    }
}

const mapState = (state) => ({
    token: state.token
})
export default connect(mapState, null)(Admin);