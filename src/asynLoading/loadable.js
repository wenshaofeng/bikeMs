import React from 'react'
import Loadable from 'react-loadable';
import Loading from './my-loading-component';



const BikeMapLoadableComponent = Loadable({// 异步加载组件 单车地图
  loader: () => import(/* webpackChunkName: "BikeMapPage" */'../views/bikeMap/index'),
  loading: Loading
})

const LoginLoadableComponent = Loadable({// 异步加载组件 登录页
  loader: () => import(/* webpackChunkName: "LoginPage" */'../views/login/index'),
  loading: Loading,
})

export const BikeMap = (props) => {
  return <BikeMapLoadableComponent />;
}

export const LoadableLogin = (props) => {
  return <LoginLoadableComponent />;
}

