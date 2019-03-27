import { SWITCH_MENU } from './actionTypes' //导入事件类型

export const switchMenu = (menuName) => ({//抽离出action的创建，方便管理,提高代码的可维护性
    type: SWITCH_MENU,
    menuName
})





