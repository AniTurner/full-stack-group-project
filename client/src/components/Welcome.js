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
        // localStorage.setItem('isLoggedIn', "false")
        // localStorage.setItem('isPreview', "false")
    }
    
    render() {
        return(
            <div id="welcome-screen">
                <h2>Attaché</h2>
                <p><Link to={"/admin"}>Login</Link></p>
                <p><Link to={"/admin/signup"}>Signup</Link></p>

            </div>
        )    
    }
}

export default withListData(Welcome)