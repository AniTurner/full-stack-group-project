import React from 'react'
import SelectUserForm from './SelectUserForm.js'
import AddUserLoginForm from './AddUserLoginForm.js'
import {withContext} from '../AppProvider.js'


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