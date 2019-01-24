import React, { Component } from 'react';
import './index.less' ;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='home-wrap'>
                欢迎学习IMooc后台管理系统课程
            </div>
         );
    }
}
 
export default Home;