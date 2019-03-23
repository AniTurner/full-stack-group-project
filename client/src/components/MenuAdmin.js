import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuAdmin extends Component {

    render() {
        const { currentUser, logout, togglePreview } = this.props

        return (
            <div role="navigation" id="admin-nav">
                <li id="logo"><Link to="/admin" className="title">Attaché Admin:</Link></li>
                <li className="tab"><Link to={`/${currentUser.username}/categories`}><div></div>Categories</Link></li>
                <li className="tab"><Link to={`/${currentUser.username}/portfolio`}><div></div>Portfolio</Link></li>
                <li className="tab"><Link to={`/${currentUser.username}/userinfo`}><div></div>User Info</Link></li>
                <li className="tab"><Link to={`/${currentUser.username}`} onClick={togglePreview}><div></div>Preview</Link></li>
                {this.props.token && <li className="tab"><Link to={"/"} onClick={logout}><div></div>Log Out</Link></li>}
            </div>
        )
    }
}
// {this.props.token && <button onClick={logout}>Logout</button>}
export default withListData(MenuAdmin)