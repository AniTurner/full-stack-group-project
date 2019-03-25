import React, { Component } from 'react'
import UserHomePageItem from './UserHomePageItem.js'
import { withListData } from '../context/BigDataProvider.js'

class UserHomePage extends Component {
    componentDidMount = () => {
        this.props.getPortfolioItems()
    }
    
    render() {

        return (
            <main>
                <div id="portfolio-background">
                    <div className="portflio-cols-3">

                        {this.props.allPortfolioItems.map(item =>
                            <>
                                {(item.userId === this.props.currentUser._id)
                                    ?
                                    <UserHomePageItem
                                        key={item._id}
                                        {...item}
                                    />
                                    :
                                    null
                                } 
                            </>
                        )
                        }

                    </div>
                </div>
                <div id="portfolio-home" className="center-crop">
                    <div><div className="cutout-text">Portfolio</div></div>
                    <h1>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</h1>
                </div>
            </main>
        )
    }
}

export default withListData(UserHomePage)