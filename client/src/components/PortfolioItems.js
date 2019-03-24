import React, { Component } from 'react'
import PortfolioItem from './PortfolioItem.js'
import AddEditPortfolioItemForm from './AddEditPortfolioItemForm.js'
import { withListData } from '../context/BigDataProvider.js'

class PortfolioItems extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    
    componentDidMount = () => {
        this.props.getPortfolioItems()
    }
    
    render() {
        return(
            <main>
                <div id="portfolio-edit-screen" className="center-crop">
                    <h2>Portfolio</h2>
                    <AddEditPortfolioItemForm btnText="Save"/>
                    
                    {/* DISPLAY DIV ONLY IF PORTFOLIO ITEMS EXIST */}
                    <div id="portfolio-list">
                    {/* Map over here */}
                    { this.props.allPortfolioItems.map(item => 
                        <PortfolioItem 
                        key={item._id} 
                        {...item} 
                        />)
                    }
                    </div>
                </div>
            </main>
        )
    }
}

export default withListData(PortfolioItems)