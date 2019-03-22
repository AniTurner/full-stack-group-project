import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuAdmin extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        this.props.getUser(this.props.currentUserId)
    }

    render() {
        const { currentUser, toggleLogin, togglePreview } = this.props

        return (
            <div role="navigation" id="admin-nav">
                <li id="logo"><Link to="/admin" className="title">Attaché Admin:</Link></li>
                <li className="tab"><Link to={`/${currentUser.username}/categories`}><div></div>Categories</Link></li>
                <li className="tab"><Link to={`/${currentUser.username}/portfolio`}><div></div>Portfolio</Link></li>
                <li className="tab"><Link to={`/${currentUser.username}/userinfo`}><div></div>User Info</Link></li>
                <li className="tab"><Link to={`/${currentUser.username}`} onClick={togglePreview}><div></div>Preview</Link></li>
                <li className="tab"><Link to={"/"} onClick={toggleLogin}><div></div>Log Out</Link></li>
            </div>
        )
    }
}

export default withListData(MenuAdmin)