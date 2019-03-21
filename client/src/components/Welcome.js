import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return(
        <div id="welcome-screen">
            <h2>Attaché</h2>
            <p><Link to={"/admin"}>Login / Signup</Link></p>
        </div>
    )
}

export default Welcome