import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuAdmin extends Component {

    render() {
        const { currentUserId, toggleLogin } = this.props

        return (
            <div role="navigation" className="admin-nav">
                <li id="logo"><Link to="/admin">Attaché Admin:</Link></li>
                <li className="tab"><Link to={`/${currentUserId}/categories`}><div></div>Categories</Link></li>
                <li className="tab"><Link to={`/${currentUserId}/portfolio`}><div></div>Portfolio</Link></li>
                <li className="tab"><Link to={`/${currentUserId}/userinfo`}><div></div>User Info</Link></li>
                <li className="tab"><Link to={"/"} onClick={() => toggleLogin}><div></div>Log Out</Link></li>
            </div>
        )
    }
}

export default withListData(MenuAdmin)