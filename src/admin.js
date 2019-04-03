import React, { Component } from 'react';
import { Row, Col } from "antd";
import Header from './components/header'
import Footer from './components/footer'
import Home from './views/home'
import NavLeft from './components/navLeft'
import { connect } from 'react-redux'
import menuList from './config/menuConfig'
import { switchUrl } from './store/actionCreator'
import { Redirect, withRouter } from 'react-router-dom'

import './style/common.less'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.updateTitle(this.props, menuList)
    }

    componentWillUpdate(nextProps) {
        this.updateTitle(nextProps, menuList)
        
    }

    updateTitle = (props, menuList) => { // 更新网页title , 更新面包屑导航标题
        let _this = this
        menuList.forEach(item => {
            if (item.key === props.location.pathname) {
                document.title = item.title
                const { dispatch } = _this.props
                dispatch(switchUrl(item.title,props.location.pathname))
                return
            }
            if (item.children) {
                _this.updateTitle(props, item.children)
            }
        })
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
export default connect(mapState, null)(withRouter(Admin));