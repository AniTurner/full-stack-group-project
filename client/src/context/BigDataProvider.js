import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

const BigDataContext = React.createContext()

class BigDataProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newUsername: '',
            currentUser: {},
            currentUserId: "",
            currentCategory: {},
            currentPortfolioItems: [],
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            allUsers: [],
            allCategories: [],
            newCategory: '',
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
                // currentCategory: res.data[0]
            },() => {
                this.props.history.push(`/${this.state.currentUserId}/userinfo`)
                
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
                    currentUser: this.state.currentUser,
                    currentUserId: this.state.currentUserId,
                    currentCategory: this.state.currentCategory,
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