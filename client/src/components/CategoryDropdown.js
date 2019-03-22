import React from 'react'
const CategoryDropdown  = (props) =>  {
    
        return (
                <select name="newCategory" onChange={props.handleCategoryChange} required>
                    <option value="">Select Category...</option>
                    {
                        props.allCategories.map((category) =>
                            <option value={category._id} key={category._id}>{category.title}</option>
                        )
                    }
                </select>      
        )
}

export default CategoryDropdown