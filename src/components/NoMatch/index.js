import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class index extends Component {
    render() {
        return (
        <div>
            <h1>404! Page not found!</h1>
            <Link to='/'><p>Go back</p></Link>
        </div>
        )
    }
}

export default index

