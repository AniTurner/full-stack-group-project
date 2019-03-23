import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuPortfolio extends Component {

    render() {
        const { currentUser, isLoggedIn, togglePreview, login, logout } = this.props

        return (
            <div className="center-crop">
                <div role="navigation" id="portfolio-nav">
                    <li className="tab"><Link to={`/${currentUser.username}`}>Home</Link></li>
                    {/* Map out all categories with their links here */}
                    <li className="tab"><Link to={`/${currentUser.username}/contact`}>Contact</Link></li>
                    {(isLoggedIn === true) 
                    ? <li className="tab"><Link to={`/${currentUser.username}/userinfo`} onClick={togglePreview}>Admin</Link></li>
                    : <li className="tab"><Link to={"/"} onClick={login}>Log In</Link></li>
                    }
                </div>
            </div>
        )
    }
}

export default withListData(MenuPortfolio)