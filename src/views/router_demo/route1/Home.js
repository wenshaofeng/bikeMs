import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route, Link } from 'react-router-dom'
import Main from './Main'
import Topics from './Topic'
import About from './About'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Main</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={Main} />
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topics} />
                </div>

            </BrowserRouter>
        );
    }
}

export default Home;