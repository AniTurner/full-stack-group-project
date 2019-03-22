import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

const BigDataContext = React.createContext()

class BigDataProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newUsername: '',
            newCategory: '',
            currentUser: {},
            currentUserId: "",
            currentCategory: {},
            currentPortfolioItem: {},
            allUsers: [],
            allCategories: [],
            allPortfolioItems: [],
            token: "",
            isLoggedIn: ((localStorage.getItem('isLoggedIn')) === "true") || false,
            isPreview: false
        }
    }

    handleChange = (event) => {
        // handleChange now caters for checkboxes
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // By choosing any category on dropdown list, will put current category inside currentCategory object
    handleCategoryChange = event => {
        const currentCategoryId = event.target.value
        axios.get(`/category/v1/bycatid/${currentCategoryId}`).then(response => {
            this.setState({
                currentCategory: response.data[0]
            })
        })
    }

    // Get current user
    handleLoginSubmit = (event) => {
        event.preventDefault()
        this.getAllUserData()
    }

    // Get current user
    handleSignupSubmit = (event) => {
        event.preventDefault()
        const UserObj = {
            "username": this.state.newUsername
        }
        axios.post("/user/v1", UserObj).then(response => {
            this.setState(prevState => ({
                currentUser: response.data,
                currentUserId: response.data._id,
                isLoggedIn: true,
                allUsers: [...prevState.allUsers, response.data]
            }), () => this.getAllUserData()
            )
        })
    }

    // Requires UserID and category ID to get all user info
    getAllUserData = () => {
        // get all user's data
        axios.get("/user/v1/" + this.state.currentUserId).then(response => {
            console.log("getAllUserData: get by current user id firing")
            this.setState({
                currentUser: response.data,
                isLoggedIn: true
            })
        })

        // get all user's categories
        axios.get("/category/v1/byuserid/" + this.state.currentUserId).then(response => {
            console.log("firing")
            this.setState({
                allCategories: response.data
            },
                () => {
                    // redirect to the users admin page
                    this.props.history.push(`/${this.state.currentUser.username}/userinfo`)
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
            "userId": this.state.currentUserId
        }

        axios.post(`/category/v1`, newCategoryObj).then(response => {
            console.log(response.data)
            this.setState(prevState => ({
                allCategories: [...prevState.allCategories, response.data]
            }))
        })

        console.log(this.state.newCategory)
    }

    //delete category
    deleteCategory = _id => {
        const answer = prompt(`Are you sure you want to delete ${this.state.currentCategory.title} ? `)
        if(answer === 'yes') {
            axios.delete("/category/v1/" + _id).then(response => {
                console.log(response.data._id)
                this.setState(prevState => ({
                    allCategories: prevState.allCategories.filter(category => category._id !== _id)
                }))
            })
        } else{
            alert("Okey, Just be More Careful Next Time!!")
        }
    }

    toggleLogin = () => {
        // set state logged in to opposite of before
        this.setState(prevState => ({
            isLoggedIn: (prevState.isLoggedIn === true) ? false : true
        }))

        // set localStorage logged in to opposite of before
        localStorage.setItem("isLoggedIn", !(this.state.isLoggedIn))
    }

    togglePreview = () => {
        // set preview mode to opposite of previous preview mode
        this.setState(prevState => ({
            isPreview: (prevState.isPreview === true) ? false : true
        }))

        // set localStorage preview mode
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
    getUser = (_id) => {
        axios.get("/user/v1/" + _id).then(response => {
            this.setState({
                currentUser: response.data
            })
        })
    }

    // add new user
    addUser = (newUsername) => {
        axios.post("/user/v1", newUsername).then(response => {
            this.setState(prevState => ({
                allUsers: [...prevState.allUsers, response.data]

            }))
        })
    }

    // delete user
    deleteUser = _id => {
        axios.delete(`/user/v1/${_id}`).then(response => {
            this.setState(prevState => ({
                allUsers: prevState.allUsers.filter(user => user._id !== _id)
            }))
        })
    }

    // update user
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

    render() {
        return (
            <BigDataContext.Provider
                value={{
                    newUsername: this.state.newUsername,
                    allUsers: this.state.allUsers,
                    allCategories: this.state.allCategories,
                    allPortfolioItems: this.state.allPortfolioItems,
                    currentUser: this.state.currentUser,
                    currentUserId: this.state.currentUserId,
                    currentCategory: this.state.currentCategory,
                    currentPortfolioItem: this.state.currentPortfolioItem,
                    handleChange: this.handleChange,
                    handleLoginSubmit: this.handleLoginSubmit,
                    handleCategoryChange: this.handleCategoryChange,
                    handleCategorySubmit: this.handleCategorySubmit,
                    handleSignupSubmit: this.handleSignupSubmit,
                    toggleLogin: this.toggleLogin,
                    togglePreview: this.togglePreview,
                    getUser: this.getUser,
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