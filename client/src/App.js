import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { withListData } from './context/BigDataProvider.js'

import './styles.css'

import Login from './components/Login.js'
import SignUp from './components/Signup.js'

import Welcome from './components/Welcome.js'
import Categories from './components/Categories.js'
import PortfolioItems from './components/PortfolioItems.js'
import UserInfo from './components/UserInfo.js'
import Footer from './components/Footer.js'

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
                        {/* {(this.props.isLoggedIn === true) ? <MenuAdmin /> : ``} */}
                        {/* display when (NOT logged in) || (when logged in AND previewMode===true) */}
                        {/* <MenuPortfolio /> */}
                    </header>
                    
                    <Switch>
                    
                        {/* Admin Routes */}
                        <Route exact path='/' component={Welcome} />
                        <Route exact path='/admin' component={Login} />
                        <Route exact path='/admin/signup' component={SignUp}/>
                        <Route path='/:_userid/categories' component={Categories} />
                        <Route path='/:_userid/portfolio' component={PortfolioItems} />
                        <Route path='/:_userid/userinfo' component={UserInfo} />
                        
                        {/* Portfolio Routes */}
                        <Route path='/:_userid' component={UserHomePage} />
                        <Route path='/:_userid/:_categoryid' component={UserCategory} />
                        <Route path='/:_userid/contact' component={UserContact} />
                        
                    </Switch>
                    
                    <footer>
                        <Footer />
                    </footer>

                </article>
        )
    }
}

export default withRouter(withListData(App))