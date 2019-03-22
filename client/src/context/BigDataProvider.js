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
            newCategory:'',
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
            })
        })
        axios.get("/category/v1/byuserid/" + this.state.currentUserId).then(response => {
            this.setState({
                allCategories: response.data
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
    // handleSubmit for Category
    handleCategorySubmit = event => {
        event.preventDefault()
        const newCategoryObj = {
            "title": this.state.newCategory,
            "userId":this.state.currentUserId
        }

        axios.post(`/category/v1`, newCategoryObj).then(response => {
            console.log(response.data)
            this.setState(prevState => ({
                allCategories: [...prevState.allCategories, response.data]
            }))
        })

        console.log(this.state.newCategory)
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

    //Get All categories per specific user
    getCategories = () => {
        console.log(this.state.currentUserId)
        axios.get(`/category/v1/byuserid/${this.state.currentUserId}`).then(response => {      
            this.setState({
                allCategories: response.data
            })
        })
    }
    
    render(){
        return (
            <BigDataContext.Provider
                value={{
                    newUsername: this.state.newUsername,
                    allUsers: this.state.allUsers,
                    allCategories: this.state.allCategories,
                    currentUserId: this.state.currentUserId,
                    currentCategory: this.state.currentCategory,
                    currentPortfolioItems: this.state.currentPortfolioItems,
                    handleChange: this.handleChange,
                    handleLoginSubmit: this.handleLoginSubmit,
                    handleCategoryChange: this.handleCategoryChange,
                    handleCategorySubmit: this.handleCategorySubmit,
                    toggleLogin: this.toggleLogin,
                    getUsers: this.getUsers,
                    getCategories: this.getCategories,
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