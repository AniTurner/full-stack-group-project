import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from './context/BigDataProvider.js'

class Welcome extends Component {

    // reset all fields
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
            isLoggedIn: ((localStorage.getItem('isLoggedIn')) === "true") || false,
            isPreview: false
        })
    }
    
    render() {
        return(
            <div id="welcome-screen">
                <h2>Attaché</h2>
                <p><Link to={"/admin"}>Login / Signup</Link></p>
            </div>
        )    
    }
}

export default withListData(Welcome)