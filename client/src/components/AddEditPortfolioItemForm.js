import React from 'react'
import { withListData } from '../context/BigDataProvider.js'

const AddEditPortfolioItemForm = (props) => {
    return(
        <form className="portfolio-form">
            <input
                type="text"
                value={props.newCategory}
                onChange={props.handleChange}
                name="newCategory"
                placeholder="New Category"
                required />
        </form>
    )
}

export default withListData(AddEditPortfolioItemForm)