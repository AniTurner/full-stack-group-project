import React, { Component } from 'react'
import AuthLogin from '../components/AuthLogin.js'
import Signup from '../components/Signup.js'
import Toggle from '../shared/Toggle.js'

class Login extends Component {

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
            <main>
                <div id="login-screen" className="center-crop">
                    {/* DISPLAY DIV ONLY IF USERS EXIST */}
                    <div>
                        <h2>Login</h2>
                        <AuthLogin />

                    </div>
    
                    {/* ALWAYS DISPLAY */}
                    <div>
                        <h2>Sign up</h2>
                        <Signup />
                    </div>
                    
                </div>
            </main>
        )
    }

}

export default Login