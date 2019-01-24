import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                This is Main page 
                <Link to='/a'> 嵌套路由 </Link>
                <hr />
                {this.props.children}
            </Fragment>
        );
    }
}

export default Main;