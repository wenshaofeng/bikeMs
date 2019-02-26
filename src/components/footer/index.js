import React, { Component } from 'react';
import './index.less'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='footer'>
                Welcome To  
                <a href="https://github.com/wenshaofeng" target="_blank"> My Github </a>
            </div>
        );
    }
}

export default Footer;