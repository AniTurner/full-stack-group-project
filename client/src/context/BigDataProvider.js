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
            currentCategory: {},
            currentPortfolioItems: [],
            user: {},
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
    
    handleLoginSubmit = (event) => {
        event.preventDefault()
        
        // redirect to the users admin page
        this.props.history.push(`/${this.state.currentUserId}/categories`)
        // go to /{currentUserId}/category
        
        // submit the query to the db
        // this.props.setSearchType("string", this.state.searchString)

        // // Redirect to the Search Results component
        // this.props.history.push(`/results/cocktails/${this.state.searchString}`)
        
        // Save users id to localStorage
        localStorage.setItem('currentUserId', this.state.currentUserId)
    }

    // handleChange and handleSubmit for Category
    handleCategoryChange = event => {
        const {name,value} = event.target
        this.setState({ [name]: value })
    }

    handleCategorySubmit = event => {
        event.preventDefault()
        this.addCategories();
        // console.log(event.target.value)
        // this.setState(prevState => ({
        //     allCategories: [...prevState.allCategories,this.state.newCategory]
        // }))

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

    getCategories = () => {
        axios.get("/category/v1").then(response => {      
            this.setState({
                allCategories: response.data
            })
        })
    }

    addCategories = () => {
        const newCategoryObj = {
            "title": this.state.newCategory
            // ,"userId":this.state.currentUserId
        }
        
        axios.post(`/category/v1/${this.state.currentUserId}`, newCategoryObj).then(response => {
            console.log(response.data)
            this.setState(prevState => ({
                allCategories: [...prevState.allCategories, response.data]
            }))
        })
        
    }


    render(){
        return (
            <BigDataContext.Provider
                value={{
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

export default withRouter(BigDataProvider)

export const withListData = C => props => (
    <BigDataContext.Consumer>
        { value => <C {...props} {...value}/> }
    </BigDataContext.Consumer>
)