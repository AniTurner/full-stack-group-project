import React from 'react'
import { withListData } from '../context/BigDataProvider.js'

const AddCategoryForm = (props) => {
    return (
        <form className="add-category-form" onSubmit={props.handleCategorySubmit}>
            <input
                type="text"
                value={props.newCategory}
                onChange={props.handleChange}
                name="newCategory"
                placeholder="New Category"
                required />
            <button>Add Category</button>
        </form>
    )
}

export default withListData(AddCategoryForm)