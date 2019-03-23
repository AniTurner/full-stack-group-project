import React from 'react'
import PortfolioItem from './PortfolioItem.js'
import AddEditPortfolioItemForm from './AddEditPortfolioItemForm.js'

const PortfolioItems = () => {
    return(
        <div id="portfolio-edit-screen">
            <h2>Portfolio</h2>
            <AddEditPortfolioItemForm />
            
            {/* DISPLAY DIV ONLY IF PORTFOLIO ITEMS EXIST */}
            <div id="portfolio-list">
            {/* Map over here */}
                <PortfolioItem />           
            </div>

        </div>
    )
}

export default PortfolioItems