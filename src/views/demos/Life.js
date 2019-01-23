import React from 'react'
import Child from './Child'
import { Button } from 'antd'
// import 'antd/dist/antd.css'
import './index.less'

export default class Life extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleClick = () => {
    this.setState(
      {
        count: this.state.count + 1
      }
    )
  }

  bindHandleClick() {
    this.setState(
      {count: this.state.count + 1}
    )
  }
  render () {
    let style = {
      color: 'red'
    }
    return (
      <div className='container'>
        <p>React</p>
        <Button onClick={this.handleClick} style={style}>click</Button>
        <Button onClick={this.bindHandleClick.bind(this)}>click</Button>
        <p>{this.state.count}</p>
        <Child name={this.state.count} 
          click={this.handleClick}
        />
      </div>
    )
  }
}
