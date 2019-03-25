import React, {Component} from 'react'
import {withListData} from '../context/BigDataProvider.js'
import { Link } from 'react-router-dom'



class Signup extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            firstName: "",
            lastName: "",
            errorMessage: ""

        }
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            errorMessage: ""
        })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.signup(this.state)
            .then(() => '' )
            .catch(err => {
                this.setState({errorMessage: err.response.data.errMsg})
            })

    }



    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                        type= "text"
                        name="firstName"
                        onChange={this.handleChange} 
                        value={this.state.firstName}
                        placeholder="First Name"
                    />

                <input 
                    type= "text"
                    name="lastName"
                    onChange={this.handleChange} 
                    value={this.state.lastName}
                    placeholder="Last Name"
                />

                <input 
                    type="text"
                    onChange={this.handleChange} 
                    name="username"
                    value={this.state.username}
                    placeholder="username"
                />

                <input 
                    name="password"
                    type="password"
                    onChange={this.handleChange} 
                    value={this.state.password}
                    placeholder="password"
                />


                <button>Signup</button>
                {this.state.errorMessage && <p style={{color: "red"}}>{this.state.errorMessage}</p>}
                
            </form>

        )
    }
}

export default withListData(Signup) 