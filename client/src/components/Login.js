import React, { Component } from 'react'
import SelectUserForm from './SelectUserForm.js'
import AddUserLoginForm from './AddUserLoginForm.js'

class Login extends Component {
    render() {
        return (
            <div id="login-screen">
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
        )
    }

}

export default Login