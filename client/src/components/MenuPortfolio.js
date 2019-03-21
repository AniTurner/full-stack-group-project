import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuPortfolio extends Component {

    render() {
        const { currentUserId, isLoggedIn } = this.props

        return (
            <div role="navigation" id="portfolio-nav">
                <li className="tab"><Link to={`/${currentUserId}`}>Home</Link></li>
                {/* Map out all categories with their links here */}
                {/* <li className="tab"><Link to={`/${currentUserId}/${currentCategoryId}`}>Category Title</Link></li> */}
                <li className="tab"><Link to={`/${currentUserId}/contact`}>Contact</Link></li>
                {(isLoggedIn === true) 
                ? <li className="tab"><Link to={"/category"}>Admin</Link></li>
                : <li className="tab"><Link to={"/"}>Log In</Link></li>
                }
            </div>
        )
    }
}

export default withListData(MenuPortfolio)