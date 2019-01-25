import React, { Component } from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Main from './main'
import About from './about'
import Topic from './topic'
import Home from './home'
import Sub from './sub'
class Index extends Component {
  render () {
    return (
      <Router>
        <Home>
          <Route  path='/main' render={()=>
            <Main>
              <Route path="/main/a" component={Sub} />
            </Main>
          } />
          <Route path='/about' component={About} />
          <Route path='/topics' component={Topic} />
        </Home>
      </Router>

    )
  }
}

export default Index
