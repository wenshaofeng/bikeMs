import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import { LoadableLogin } from './asynLoading/loadable';
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
import { BikeMap } from './asynLoading/loadable' //车辆地图
import RichText from './views/rich' // 富文本
import Permission from './views/permission' // 权限控制

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
                    <Switch>
                        {/* 通用详情页 */}
                        <Route path='/common' render={() => (
                            <Common>
                                <Route path='/common/order/detail/:orderId/:user_name/:order_sn' component={OrderDetail} />
                            </Common>
                        )} />
                        <Route path='/login' component={LoadableLogin} />
                        <Route path='/' render={() => (
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home} />
                                    <Route path='/ui/buttons' component={Buttons} />
                                    <Route path='/ui/modals' component={Modals} />
                                    <Route path='/ui/loadings' component={Loadings} />
                                    <Route path='/ui/notification' component={Notices} />
                                    <Route path='/ui/messages' component={Messages} />
                                    <Route path='/ui/tabs' component={Tab} />
                                    <Route path='/ui/gallery' component={Gallery} />
                                    <Route path='/ui/carousel' component={Carousels} />
                                    <Route path='/form/login' component={FormLogin} />
                                    <Route path='/form/reg' component={FormRegister} />
                                    <Route path='/table/basic' component={BasicTable} />
                                    <Route path='/table/high' component={AdvancedTable} />
                                    <Route path='/city' component={City} />
                                    <Route path='/order' component={Order} />
                                    <Route path='/user' component={User} />
                                    <Route path='/bikeMap' component={BikeMap} />
                                    <Route path='/charts/bar' component={Bar} />
                                    <Route path='/charts/pie' component={Pie} />
                                    <Route path='/charts/line' component={Line} />
                                    <Route path='/rich' component={RichText} />
                                    <Route path='/permission' component={Permission} />
                                    <Redirect to="/home" />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        )} />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}

export default IRouter;