import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuPortfolio extends Component {

    render() {
        const { currentUserId, toggleLogin, isLoggedIn } = this.props

        return (
            <div role="navigation" className="portfolio-nav">
                <li id="logo"><Link to="/admin">Attaché Admin:</Link></li>
                <li className="tab"><Link to={`/${currentUserId}`}><div></div>Home</Link></li>
                {/* Map out all categories with their links here */}
                {/* <li className="tab"><Link to={`/${currentUserId}/${currentCategoryId}`}><div></div>Category Title</Link></li> */}
                <li className="tab"><Link to={`/${currentUserId}/contact`}><div></div>Contact</Link></li>
                <li className="tab"><Link to={"/"} onClick={() => toggleLogin}><div></div>{(isLoggedIn) ? `Log Out` : `Log In`}Log Out</Link></li>
            </div>
        )
    }
}

export default withListData(MenuPortfolio)