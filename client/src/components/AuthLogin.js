import React, {Component} from 'react'
import {withListData} from '../context/BigDataProvider.js'


class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.login()
    }

    render(){
        return (
            <div>
        
                    <input 
                        type="text"
                        handleSubmit={this.handleSubmit}
                        onChange={this.handleChange} 
                        name="username"
                        value={this.state.username}
                    />

                    <input 
                        type="text"
                        handleSubmit={this.handleSubmit}
                        onChange={this.handleChange} 
                        value={this.state.password}
                    />
                    <button>Login</button>
            </div>

        )
    }
}

export default withListData(Login)