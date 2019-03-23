import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class Welcome extends Component {

    // logs out and reset all fields
    componentDidMount() {
        this.setState({
            newUsername: '',
            currentUser: {},
            currentUserId: "",
            currentCategory: {},
            currentPortfolioItems: [],
            allUsers: [],
            allCategories: [],
            newCategory: '',
            token: "",
            isLoggedIn: false,
            isPreview: false
        })
        // reset locaStorage too
        localStorage.setItem('isLoggedIn', "false")
        localStorage.setItem('isPreview', "false")
    }

    render() {
        return (
            <div id="welcome-screen">
                <div className="outer-div">
                    <div className="inner-div">
                    </div>
                </div>
                <div className="z-content">
                    <div className="vertical-align-parent">
                        <div className="vertical-align-child">
                            <h1>&lt;tt&gt;ché</h1>
                            <p><Link to={"/admin"}>Login / Signup</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withListData(Welcome)