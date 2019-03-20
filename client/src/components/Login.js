import React from 'react'
import ReactDOM from 'react-dom'
import SelectUserForm from './SelectUserForm.js'
import AddUserLoginForm from './AddUserLoginForm.js'

const Login = () => {
    return(
        <div id="login-screen">
            {/* DISPLAY DIV ONLY IF USERS EXIST */}
            <div>
                {SelectUserForm}        
            </div>

            {/* ALWAYS DISPLAY */}
            <div>
                {AddUserLoginForm}
            </div>
        </div>
    )
}

export default Login