import React from 'react';
import ReactDOM from 'react-dom';
// import Admin from './admin' 
// import Router1 from './views/router_demo/route1/Home'
// import Router2 from './views/router_demo/route2'
import Router from './router'
// import Life from './views/demos/Life'
import { Provider } from 'react-redux'
import store from './store/index'

ReactDOM.render(
    <Provider store={store} >
        <Router />
    </Provider>
    ,
    document.getElementById('root'));


