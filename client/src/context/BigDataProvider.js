import React, { Component } from 'react'
import axios from 'axios'
import { withRouter} from 'react-router-dom';

const BigDataContext = React.createContext()

class BigDataProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            newUser: '',
            currentUserId: "",
            currentCategoryId: "",
            currentPortfolioItems: [],
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            allUsers: [],
            allCategories: [],
            token: "",
            isLoggedIn: ((localStorage.getItem('isLoggedIn')) === "true") || false,
            isPreview: false
        }
    }
    
    signup = (userInfo) => {
        return axios.post("/auth/signup", userInfo).then(res => {
            const{user, token} = res.data
            localStorage.setItem('token', token);
            localStorage.setItem("user", JSON.stringify(user));
            this.setState({
                user,
                token
            },() => this.props.history.push(`/${this.state.currentUserId}/categories`))
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
            },() => this.props.history.push(`/${this.state.currentUserId}/categories`))
        })
    }


    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    
    // handleLoginSubmit = (event) => {
    //     event.preventDefault()
    //     // redirect to the users admin page
    //     this.login(this.state)
    // }

    // handleSubmit = event => {
    //     event.preventDefault()
    //     this.signup(this.state)
    // }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        this.setState({
            user: {},
            token: ''
        })
    }
    
    // toggleLogin = () => {
    //     // set theme to opposite of previous theme
    //     this.setState(prevState => ({
    //         isLoggedIn: (prevState.isLoggedIn === true) ? false : true
    //     }))
        
    //     // set localStorage theme to new theme
    //     localStorage.setItem("isLoggedIn", !(this.state.isLoggedIn))
    // }
    
    // togglePreview = () => {
    //     // set theme to opposite of previous theme
    //     this.setState(prevState => ({
    //         isPreview: (prevState.isPreview === true) ? false : true
    //     }))
        
    //     // set localStorage theme to new theme
    //     localStorage.setItem("isPreview", !(this.state.isPreview))
    // }
    
    // getUsers = () => {
    //     axios.get("/user/v1").then(response => {      
    //         this.setState({
    //             allUsers: response.data
    //         })
    //     })
    // }

    // addUser = newUser => {
    //     axios.post("/user/v1", newUser).then(response => {
    //         this.setState(prevState => ({
    //             allUsers: [...prevState.allUsers, response.data]
    //         }))
    //     })
    // }

    // deleteUser = _id => {
    //     axios.delete(`/user/v1/${_id}`).then(response => {
    //         this.setState(prevState => ({
    //             allUsers: prevState.allUsers.filter(user => user._id !== _id)
    //         }))
    //     })
    // }

    // updateUser = (_id, updates) => {
    //     axios.put(`/user/v1/${_id}`, updates).then(response => {
    //         this.setState(prevState => ({
    //             allUsers: prevState.allUsers.map(user => user._id === _id ? response.data : user)
    //         }))
    //     })
    // }

    render(){
        return (
            <BigDataContext.Provider
                value={{
                    allUsers: this.state.allUsers,
                    allCategories: this.state.allCategories,
                    currentUserId: this.state.currentUserId,
                    currentCategoryId: this.state.currentCategoryId,
                    currentPortfolioItems: this.state.currentPortfolioItems,
                    handleChange: this.handleChange,
                    // handleLoginSubmit: this.handleLoginSubmit,
                    // toggleLogin: this.toggleLogin,
                    // getUsers: this.getUsers,
                    // addUser: this.addUser,
                    // deleteUser: this.deleteUser,
                    // updateUser: this.updateUser,
                    // isLoggedIn: this.state.isLoggedIn,
                    // isPreview: this.state.isPreview,
                    user: this.state.user,
                    token: this.state.token,
                    singup: this.signup,
                    login: this.login,
                    logout: this.logout,
                }}>
                { this.props.children }
            </BigDataContext.Provider>
        )
    }
}

export default withRouter(BigDataProvider)

export const withListData = C => props => (
    <BigDataContext.Consumer>
        { value => <C {...props} {...value}/> }
    </BigDataContext.Consumer>
)