import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuPortfolio extends Component {

    render() {
        const { user, token, togglePreview, login, isLoggedIn, allCategories } = this.props
        console.log(token)
        return (
            <div className="center-crop">
                <div role="navigation" id="portfolio-nav">
                    <li className="tab"><Link to={`/${user.username}`}>Home</Link></li>
                    {/* Map out all categories with their links here */}
                    <li className="tab"><Link to={`/${user.username}/contact`}>Contact</Link></li>
                    {
                        allCategories.map(category => 
                            <li className="tab"><Link to={`/${user.username}/cat/${category._id}`}>{category.title}</Link></li>
                        )
                    }
                    {(token) 
                    ? <li className="tab"><Link to={`/${user.username}/userinfo`} onClick={togglePreview}>Admin</Link></li>
                    : <li className="tab"><Link to={"/"} onClick={login}>Log In</Link></li>
                    }
                </div>
            </div>
        )
    }
}

export default withListData(MenuPortfolio)

