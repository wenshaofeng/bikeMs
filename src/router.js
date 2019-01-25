import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Login from './views/login'
import NoMatch from './views/nomatch'
import Admin from './admin'

import Buttons from './views/ui/button.js'
import Modals from './views/ui/modal.js'
import Loadings from './views/ui/lodings'
import Notices from './views/ui/notification'

class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path='/login' component={Login} />
                    <Route path='/admin' render={() => (
                        <Admin>
                            <Switch>
                                <Route path='/admin/ui/buttons' component={Buttons} />
                                <Route path='/admin/ui/modals' component={Modals} />
                                <Route path='/admin/ui/loadings' component={Loadings} />
                                <Route path='/admin/ui/notification' component={Notices} />
                                {/* <Route path='/admin/ui/messages' component={Messages} />
                                <Route path='/admin/ui/tabs' component={Tab} />
                                <Route path='/admin/ui/gallery' component={Gallery} />
                                <Route path='/admin/ui/carousel' component={Carousels} />
                                <Route path='/admin/form/login' component={FormLogin} />
                                <Route path='/admin/form/reg' component={FormRegister} />
                                <Route path='/admin/table/basic' component={BasicTable} /> */}
                                {/* <Route path='/admin' component={Home} /> */}
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    )} />
                    <Route path='/order/detail' component={Login} />
                </App>
            </HashRouter>
        );
    }
}

export default IRouter;