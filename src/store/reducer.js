import { SWITCH_MENU } from './actionTypes'
const defaultState = {
    InitialValue: '首页'

}
//reducer 可以接受state ， 但是绝不能更改state
export default (state = defaultState, action) => { //二：根据action.type更改store的值
    if (action.type === SWITCH_MENU) {
        return {
            ...state,
            menuName: action.menuName

        }
    }
    return state
}