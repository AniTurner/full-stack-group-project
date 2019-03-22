import React from 'react'
import { withListData} from '../context/BigDataProvider.js'

const AddUserLoginForm = (props) => {
    return(
        <form className="add-user-form" onSubmit={props.handleSignupSubmit}>
            <h2>Add New User</h2>
            <input
                type="text"
                name="newUsername"
                value=""
                onChange={props.handleChange}
                placeholder="username"
                required />
            <button>Sign Up</button>
        </form>
    )
}

export default withListData(AddUserLoginForm)