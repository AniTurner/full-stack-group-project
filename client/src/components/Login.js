import React, { Component } from 'react'
import SelectUserForm from './SelectUserForm.js'
import AddUserLoginForm from './AddUserLoginForm.js'

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
                        <h2>Select User</h2>
                        <SelectUserForm />
                    </div>
    
                    {/* ALWAYS DISPLAY */}
                    <div>
                        <h2>Add New User</h2>
                        <AddUserLoginForm />
                    </div>
                </div>
            </main>
        )
    }

}

export default Login
