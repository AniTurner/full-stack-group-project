import React, {Component} from 'react'
import {withListData} from '../context/BigDataProvider.js'


class Signup extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            errorMessage: ""

        }
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: "",
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
            .then(() => this.clearInputs())
            .catch(err => {
                this.setState({errorMessage: err.response.data.message})
            })
    }



    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    onChange={this.handleChange} 
                    name="username"
                    value={this.state.username}
                />

                <input 
                    name="password"
                    type="password"
                    onChange={this.handleChange} 
                    value={this.state.password}
                />
                {this.state.errorMessage && <p style={{color: "red"}}>{this.state.errorMessage}</p>}

                <button>Signup</button>
            </form>

        )
    }
}

export default withListData(Signup)