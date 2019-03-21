import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

const BigDataContext = React.createContext()

let userResp

class BigDataProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newUsername: '',
            currentUser: {},
            currentUserId: "",
            currentCategory: {},
            currentPortfolioItems: [],
            allUsers: [],
            allCategories: [],
            token: "",
            isLoggedIn: ((localStorage.getItem('isLoggedIn')) === "true") || false,
            isPreview: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    // Get current user
    handleLoginSubmit = (event) => {
        event.preventDefault()
        
        axios.get("/user/v1/" + this.state.currentUserId).then(response => {
            this.setState({
                currentUser: response.data,
                isLoggedIn: true
            },
                () => {
                    // redirect to the users admin page
                    this.props.history.push(`/${this.state.currentUser.username}/categories`)
                    // Save users id and logged in status to localStorage
                    localStorage.setItem('currentUserID', this.state.currentUser._id)
                    localStorage.setItem('isLoggedIn', this.state.isLoggedIn)
                })
        })
    }

    handleSignupSubmit = (event) => {
        event.preventDefault()
        // add new user to state
        this.setState({ newUsername: event.target.value })
        // add new user to User DB
        this.addUser(this.state.newUsername)

        if (this.state.currentUser._id) {
            // redirect to the users admin page
            this.props.history.push(`/${this.state.currentUser._id}/categories`)

            // Save users id to localStorage
            localStorage.setItem('currentUserID', this.state.currentUser._id)
        }
    }

    toggleLogin = () => {
        // set theme to opposite of previous theme
        this.setState(prevState => ({
            isLoggedIn: (prevState.isLoggedIn === true) ? false : true
        }))

        // set localStorage theme to new theme
        localStorage.setItem("isLoggedIn", !(this.state.isLoggedIn))
    }

    togglePreview = () => {
        // set theme to opposite of previous theme
        this.setState(prevState => ({
            isPreview: (prevState.isPreview === true) ? false : true
        }))

        // set localStorage theme to new theme
        localStorage.setItem("isPreview", !(this.state.isPreview))
    }

    // Get all users
    getUsers = () => {
        axios.get("/user/v1").then(response => {
            this.setState({
                allUsers: response.data
            })
        })
    }

    // Get current user
    getUser = async (_id) => {
        try {
            userResp = await axios.get("/user/v1/" + _id)
            this.setState({
                currentUser: userResp.data
            })
        } catch (err) {
            // handle error thrown from ANY request in the TRY
        }

    }

    addUser = (newUsername) => {
        axios.post("/user/v1", newUsername).then(response => {
            this.setState(prevState => ({
                allUsers: [...prevState.allUsers, response.data]

            }))
        })
    }

    deleteUser = _id => {
        axios.delete(`/user/v1/${_id}`).then(response => {
            this.setState(prevState => ({
                allUsers: prevState.allUsers.filter(user => user._id !== _id)
            }))
        })
    }

    updateUser = (_id, updates) => {
        axios.put(`/user/v1/${_id}`, updates).then(response => {
            this.setState(prevState => ({
                allUsers: prevState.allUsers.map(user => user._id === _id ? response.data : user)
            }))
        })
    }

    render() {
        console.log(this.state.currentUser)
        return (
            <BigDataContext.Provider
                value={{
                    newUsername: this.state.newUsername,
                    allUsers: this.state.allUsers,
                    allCategories: this.state.allCategories,
                    currentUser: this.state.currentUser,
                    currentCategory: this.state.currentCategory,
                    currentPortfolioItems: this.state.currentPortfolioItems,
                    handleChange: this.handleChange,
                    handleLoginSubmit: this.handleLoginSubmit,
                    handleSignupSubmit: this.handleSignupSubmit,
                    toggleLogin: this.toggleLogin,
                    getUsers: this.getUsers,
                    addUser: this.addUser,
                    deleteUser: this.deleteUser,
                    updateUser: this.updateUser,
                    isLoggedIn: this.state.isLoggedIn,
                    isPreview: this.state.isPreview,
                    user: this.state.user,
                    token: this.state.token
                }}>
                {this.props.children}
            </BigDataContext.Provider>
        )
    }
}

export default withRouter(BigDataProvider)

export const withListData = C => props => (
    <BigDataContext.Consumer>
        {value => <C {...props} {...value} />}
    </BigDataContext.Consumer>
)