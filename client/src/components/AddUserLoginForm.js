import React from 'react'
import { withListData} from '../context/BigDataProvider.js'

const AddUserLoginForm = (props) => {
    return(
        <form className="add-user-form" onSubmit={props.handleSignupSubmit}>
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