import React, { Component } from 'react'

class child extends Component {
	constructor(props) {
		super(props)
		this.state = {
			count: 0
		}
	}

	componentWillMount() {
		console.log('will mount')
	}
	componentDidMount() {
		console.log('did mount')
	}
	componentWillReceiveProps(nextProps) {
		console.log(`will props ${nextProps.name}`)
	}
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		console.log('should update')
		return true
	}
	componentWillUpdate() {
		console.log('will update')
	}

	render() {
		return (
			<div>
				<p>this is child component</p>
				<p>{this.props.name}</p>
				<button onClick={this.props.click}>click</button>
				<p>{this.state.count}</p>
			</div>
		)
	}
}

export default child
