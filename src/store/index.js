import { createStore } from 'redux' //引入方法
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const enhancer = composeWithDevTools()

const store = createStore(reducer, enhancer);


export default store