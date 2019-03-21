import React, { Component } from 'react'
import axios from 'axios'

const BigDataContext = React.createContext()

class BigDataProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUserId: "",
            currentCategoryId: "",
            currentPortfolioItems: [],
            user: {},
            allUsers: [],
            allCategories: [],
            token: "",
            isLoggedIn: false,
            isPreview: false
        }
    }
    
    toggleLogin = () => {
        // set theme to opposite of previous theme
        this.setState(prevState => ({
            isLoggedIn: (prevState.isLoggedIn === true) ? false : true
        }))    
        
        // set localStorage theme to new theme
        localStorage.isLoggedIn = this.state.isLoggedIn
    }
    
    getUsers = () => {
        axios.get("/user/v1").then(response => {      
            this.setState({
                allUsers: response.data
            })
        })
    }

    addUser = newUser => {
        axios.post("/user/v1", newUser).then(response => {
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

    render(){
        return (
            <BigDataContext.Provider
                value={{
                    allUsers: this.state.users,
                    allCategories: this.state.allCategories,
                    currentUserId: this.state.currentUserId,
                    currentCategoryId: this.state.currentCategoryId,
                    currentPortfolioItems: this.state.currentPortfolioItems,
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
                { this.props.children }
            </BigDataContext.Provider>
        )
    }
}

export default BigDataProvider

export const withListData = C => props => (
    <BigDataContext.Consumer>
        { value => <C {...props} {...value}/> }
    </BigDataContext.Consumer>
)