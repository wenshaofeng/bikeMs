import React, { Component, Fragment } from 'react'
import './index.less'

class NoMatch extends Component {
    render() {
        return (
            <Fragment>
                <div className='c'>
                    <div className='_404'>404</div>
                    <hr />
                    <div className='_1'>THE PAGE</div>
                    <div className='_2'>WAS NOT FOUND</div>
                </div>
            </Fragment>

        )
    }
}

export default NoMatch
