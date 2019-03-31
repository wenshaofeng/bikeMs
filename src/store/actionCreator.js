import * as actionTypes from './actionTypes' //导入事件类型

export const switchMenu = (menuName) => ({//抽离出action的创建，方便管理,提高代码的可维护性
    type: actionTypes.SWITCH_MENU,
    menuName
})

export const handleLogin = (token)=>({
    type:actionTypes.USER_LOGIN,
    token
})

export const handleLogout = (token)=>({
    type:actionTypes.USER_LOGOUT,
    token
})



