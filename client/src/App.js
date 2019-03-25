import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { withListData } from './context/BigDataProvider.js'

import './styles.css'
import './styles-portfolio.css'

import MenuAdmin from './components/MenuAdmin.js'
import MenuPortfolio from './components/MenuPortfolio.js'
import Footer from './components/Footer.js'

import Welcome from './components/Welcome.js'
import Login from './components/Login.js'
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
        this.props.getUsers()
    }

    render() {
        return (
                <article>
                    <header>
                        {/* display only if logged in */}
                        {(this.props.isLoggedIn === true) ? <MenuAdmin /> : ``}
                        {/* display when (NOT logged in) || (when logged in AND previewMode===true) */}
                        {(this.props.isPreview === true) ? <MenuPortfolio /> : ``}
                    </header>
                    
                            <Switch>
                                {/* Admin Routes */}
                                <Route exact path='/' component={Welcome} />
                                <Route exact path='/admin' component={Login} />
                                <Route path='/:_username/categories' component={Categories} />
                                <Route path='/:_username/portfolio' component={PortfolioItems} />
                                <Route path='/:_username/userinfo' component={UserInfo} />
                                
                                {/* Portfolio Routes */}
                                <Route exact path='/:_username' component={UserHomePage} />
                                <Route exact path='/:_username/contact' component={UserContact} />
                                <Route exact path='/:_username/cat/:_categoryid' component={UserCategory} />
                                                                
                            </Switch>
                    
                    <footer>
                        <Footer />
                    </footer>

                </article>
        )
    }
}

export default withRouter(withListData(App))