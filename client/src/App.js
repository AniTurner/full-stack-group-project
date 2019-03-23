import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { withListData } from './context/BigDataProvider.js'
import ProtectedRoute from "./components/ProtectedRoute";

import './styles.css'

import MenuAdmin from './components/MenuAdmin.js'
import MenuPortfolio from './components/MenuPortfolio.js'
import Footer from './components/Footer.js'

import AuthLogin from './components/AuthLogin.js'
import SignUp from './components/Signup.js'

import Welcome from './components/Welcome.js'
import Categories from './components/Categories.js'
import PortfolioItems from './components/PortfolioItems.js'
import UserInfo from './components/UserInfo.js'


import UserHomePage from './components/UserHomePage.js'
import UserCategory from './components/UserCategory.js'
import UserContact from './components/UserContact.js'

class App extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props)
    }

    componentDidMount = () => {
        // this.props.getUsers()
    }

    render() {
        return (
                <article>
                    <header>
                        {/* display only if logged in */}
                        {(this.props.isLoggedIn === true) ? <MenuAdmin /> : ``}
                        {/* display when (NOT logged in) || (when logged in AND previewMode===true) */}
                        <MenuPortfolio />
                    </header>
                    
                    <Switch>
                    
                        {/* Admin Routes */}
                        <Route exact path='/' component={Welcome} />
                        <Route exact path='/admin' render={rprops => !this.props.token ? <AuthLogin {...rprops}/> : <Redirect to={`/${this.props.user.username}/userinfo`}/>}/>
                        <Route exact path='/admin/signup' render={rprops => !this.props.token ? <SignUp {...rprops}/> : <Redirect to={`/${this.props.user.username}/userinfo`}/>}/>
                        <ProtectedRoute path="/:_username/categories" component={Categories}/>
                        {/* <Route path='/:_userid/categories' component={Categories} /> */}
                        <ProtectedRoute path='/:_username/portfolio' component={PortfolioItems} />
                        <ProtectedRoute path='/:_username/userinfo' component={UserInfo} />
                        
                        {/* Portfolio Routes */}
                        <Route path='/:_username' component={UserHomePage} />
                        <Route path='/:_username/:_categoryid' component={UserCategory} />
                        <Route path='/:_username/contact' component={UserContact} />
                        
                    </Switch>
                    
                    <footer>
                        <Footer />
                    </footer>

                </article>
        )
    }
}

export default withRouter(withListData(App))