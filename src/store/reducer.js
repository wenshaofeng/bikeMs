import * as actionTypes from './actionTypes'

const defaultState = {
    InitialValue: '首页',
    token: localStorage.getItem('token') || '',
    url:''
}
//reducer 可以接受state ， 但是绝不能更改state
export default (state = defaultState, action) => { //二：根据action.type更改store的值
    if (action.type === actionTypes.SWITCH_MENU) { // 切换左侧导航菜单
        return {
            ...state,
            menuName: action.menuName

        }
    }

    if(action.type === actionTypes.SWITCH_URL) { // 改变URL 
        return {
            ...state,
            url:action.url,
            path:action.path
        }
    }

    if (action.type === actionTypes.USER_LOGIN) { // 登录
        return {
            ...state,
            token: action.token
        }
    }

    if (action.type === actionTypes.USER_LOGOUT) { // 登出
        return {
            ...state,
            token: action.token
        }
    }
    
    return state
}