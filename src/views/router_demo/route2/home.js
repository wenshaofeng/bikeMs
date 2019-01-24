import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
    componentDidMount() {
        console.log(this.props.children);
        
    }
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/topics'>Topics</Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}
            </div>

        )
    }
}

export default Home