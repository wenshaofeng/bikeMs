import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './views/login';
import NoMatch from './views/nomatch';
import Admin from './admin';
import Home from './views/home';

//UI菜单下的组件
import Buttons from './views/ui/button.js';
import Modals from './views/ui/modal.js';
import Loadings from './views/ui/lodings';
import Notices from './views/ui/notification';
import Messages from './views/ui/message';
import Tab from './views/ui/tabs';
import Gallery from './views/ui/gallery';
import Carousels from './views/ui/carousel';

//表单组件
import FormLogin from './views/form/login';
import FormRegister from './views/form/register';

//表格组件
import BasicTable from './views/table/basicTable';
import AdvancedTable from './views/table/advancedTable';


import City from './views/city'  //城市管理
import Order from './views/order' //订单管理
import User from './views/user' //员工管理
import BikeMap from './views/bikeMap' //车辆地图

import Common from './common' //通用页面组件
import OrderDetail from './views/order/detail' //订单详情

import Bar from './views/echarts/bar' // 柱形图
import Pie from './views/echarts/pie' // 饼图
import Line from './views/echarts/line' // 折线图

class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route exact path="/" render={() => (
                        <Redirect to="/admin" />
                    )} />
                    <Route path='/login' component={Login} />
                    <Route path='/admin' render={() => (
                        <Admin>
                            <Switch>
                                <Route path='/admin/ui/buttons' component={Buttons} />
                                <Route path='/admin/ui/modals' component={Modals} />
                                <Route path='/admin/ui/loadings' component={Loadings} />
                                <Route path='/admin/ui/notification' component={Notices} />
                                <Route path='/admin/ui/messages' component={Messages} />
                                <Route path='/admin/ui/tabs' component={Tab} />
                                <Route path='/admin/ui/gallery' component={Gallery} />
                                <Route path='/admin/ui/carousel' component={Carousels} />
                                <Route path='/admin/form/login' component={FormLogin} />
                                <Route path='/admin/form/reg' component={FormRegister} />
                                <Route path='/admin/table/basic' component={BasicTable} />
                                <Route path='/admin/table/high' component={AdvancedTable} />
                                <Route path='/admin/city' component={City} />
                                <Route path='/admin/order' component={Order} />
                                <Route path='/admin/user' component={User} />
                                <Route path='/admin/bikeMap' component={BikeMap} />
                                <Route path='/admin/charts/bar' component={Bar} />
                                <Route path='/admin/charts/pie' component={Pie} />
                                <Route path='/admin/charts/line' component={Line} />
                                {/* <Route path='/admin' component={Home} /> */}
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    )} />
                    {/* 通用详情页 */}
                    <Route path='/common' render={() => (
                        <Common>
                            <Route path='/common/order/detail/:orderId/:user_name/:order_sn' component={OrderDetail} />
                        </Common>
                    )} />
                </App>
            </HashRouter>
        );
    }
}

export default IRouter;