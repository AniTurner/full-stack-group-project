import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Welcome from './components/Welcome.js'
import Login from './components/Login.js'
import Categories from './components/Categories.js'
import PortfolioItems from './components/PortfolioItems.js'
import UserInfo from './components/UserInfo.js'

import UserHomePage from './components/UserHomePage.js'
import UserCategory from './components/UserCategory.js'
import UserContact from './components/UserContact.js'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div id="container">
                    <header>
                        {/* display only if logged in */}
                        <div id="header-admin-menu">admin menu here with links</div>
                        {/* display when (NOT logged in) || (when logged in AND previewMode===true) */}
                        <div id="portfolio-menu">portfolio menu here with links</div>
                    </header>
                    
                    <Switch>
                    
                        {/* Admin Routes */}
                        <Route exact path='/' component={Welcome} />
                        <Route exact path='/admin' component={Login} />
                        <Route path='/:_userid/categories' component={Categories} />
                        <Route path='/:_userid/portfolio' component={PortfolioItems} />
                        <Route path='/:_userid/userinfo' component={UserInfo} />
                        
                        {/* Portfolio Routes */}
                        <Route path='/:_userid' component={UserHomePage} />
                        <Route path='/:_userid/:_categoryid' component={UserCategory} />
                        <Route path='/:_userid/contact' component={UserContact} />
                        
                    </Switch>
                    
                    <footer>
                        <p>copyright notice stuff</p>
                    </footer>

                </div>
            </div>
        )
    }
}

export default App