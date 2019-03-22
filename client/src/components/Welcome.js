import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return(
        <div id="welcome-screen">
            <h2>Attaché</h2>
            <span><Link to={"/admin"}>Login</Link></span>
            <span><Link to={"/admin/signup"}>Signup</Link></span>
        </div>
    )
}

export default Welcome