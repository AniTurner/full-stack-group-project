import React, { Component } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

class BountyProvider extends Component {
    constructor(){
        super()
        this.state = {
            users: [],
            categories: [],
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || ""
        }
    }
    

    signup = (userInfo) => {
        return axios.post("/auth/signup", userInfo).then(res => {
            const{user, token} = res.data
            this.setState({
                user,
                token
            })
        }).then(res => {
            const{user, token} = res.data
            localStorage.setItem('token', token);
            localStorage.setItem("user", JSON.stringify(user));
            this.setState({
                user,
                token
            })
            return res
        })
       
    }

    login = (credentials) => {
        return axios.post('auth/login', credentials).then(res => {
            const {token, user} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            this.setState({
                user, 
                token
            })
            // this.getCategories();
            return res
        })
    }

    handleSubmit = e => {
        e.preventDefault() 
        this.props.signup(this.state).then(() => this.props.history.push("/todos"))
        this.props.login(this.state).then(() => this.props.history.push('/categories'))
    }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        this.setState({
            categories: [],
            user: {},
            token: ''
        })
    }

    render(){
        return (
            <AppContext.Provider
                value={{
                    singup: this.signup,
                    login: this.login,
                    logout: this.logout
                }}>
                { this.props.children }
            </AppContext.Provider>
        )
    }
}

export default AppProvider

export const withApp = C => props => (
    <AppContext.Consumer>
        { value => <C {...props} {...value}/> }
    </AppContext.Consumer>
)