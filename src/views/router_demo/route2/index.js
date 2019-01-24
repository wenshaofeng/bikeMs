import React, { Component } from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Main from './main'
import About from './about'
import Topic from './topic'
import Home from './home'
class Index extends Component {
  render () {
    return (
      <Router>
        <Home>
          <Route exact path='/' component={Main} />
          <Route path='/about' component={About} />
          <Route path='/topics' component={Topic} />
        </Home>
      </Router>

    )
  }
}

export default Index
