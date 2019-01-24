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
                版权所有：慕课网&河畔一角（推荐使用谷歌浏览器）
            </div>
        );
    }
}

export default Footer;