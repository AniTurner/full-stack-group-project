import React, {Component} from 'react'
import {withListData} from '../context/BigDataProvider.js'

//make it a class
//same for LOGIN component
//give it it's own handlechange and handleSubmit (this.props.signup)
//this.state will have username: '', password: ''
//
class Signup extends Component {
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
        this.props.signup()
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
                <button>Signup</button>
            </div>

        )
    }
}

export default withListData(Signup)