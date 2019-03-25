import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuPortfolio extends Component {

    render() {
        const { currentUser, isLoggedIn, togglePreview } = this.props

        return (
            <div className="center-crop">
                <div role="navigation" id="portfolio-nav">
                    <li className="tab"><Link to={`/${currentUser.username}`}>Home</Link></li>
                    {/* Map out all categories with their links here */}
                    {/* <Route path='/:_username/cat/:_categoryid' component={UserCategory} /> */}
                    <li className="tab"><Link to={`/${currentUser.username}/contact`}>Contact</Link></li>
                    
                    {(isLoggedIn === true) 
                    ? <li className="tab"><Link to={`/${currentUser.username}/userinfo`} onClick={togglePreview}>Admin</Link></li>
                    : <li className="tab"><Link to={"/"} onClick={togglePreview}>Log In</Link></li>
                    }
                </div>
            </div>
        )
    }
}

export default withListData(MenuPortfolio)

