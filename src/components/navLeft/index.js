import React, { Component, Fragment } from 'react';
import MenuConfig from './../../config/menuConfig'
import { Menu, Icon } from 'antd' // 获取菜单
import { NavLink } from 'react-router-dom'
import './index.less'

const SubMenu = Menu.SubMenu  // 子菜单
class NavLeft extends Component {
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig)
        this.setState((preState) => ({
            menuTreeNode
        }))
    }
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

    render() {
        return (
            <Fragment>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme='dark'>
                    {this.state.menuTreeNode}
                </Menu>
            </Fragment>
        );
    }
}

export default NavLeft;