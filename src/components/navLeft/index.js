import React, { Component, Fragment } from 'react';
import MenuConfig from './../../config/menuConfig'
import { Menu, Icon } from 'antd' // 获取菜单
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../store/actionCreator'
import './index.less'

const SubMenu = Menu.SubMenu  // 子菜单
class NavLeft extends Component {
    state = {
        currentKey: ''
    }
    componentDidMount() {

        const menuTreeNode = this.renderMenu(MenuConfig)
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '')

        this.setState((preState) => ({
            menuTreeNode,
            currentKey
        }))

    }

    // componentDidUpdate() {
    //     let currentKey = this.props.location.pathname
    //     this.setState((preState) => ({
    //         currentKey
    //     }))
    // }


    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {  // 递归遍历是否含有子菜单
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>
                        {item.title}
                    </NavLink>
                </Menu.Item>
            )
        })
    }
    //菜单点击切换高亮
    handleChangeMenu = ({ item }) => {
        const { dispatch } = this.props
        dispatch(switchMenu(item.props.title))
       /*  console.log(item);

        this.setState((preState) => ({
            currentKey: item.props.eventKey
        })) */
    }


    render() {
        const { urlCurrentKey } = this.props
        return (
            <Fragment>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu
                    onSelect={this.handleSelectedMenuItem}
                    onClick={this.handleChangeMenu}
                    theme='dark'
                    selectedKeys={[urlCurrentKey]}>
                    {this.state.menuTreeNode}
                </Menu>
            </Fragment>
        );
    }
}

const mapState = (state) => ({
    urlMenuName: state.url,
    urlCurrentKey: state.path
})

export default connect(mapState, null)(withRouter(NavLeft));