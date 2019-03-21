import React from 'react'
import AddCategoryForm from './AddCategoryForm.js'
import DeleteCategoryForm from './DeleteCategoryForm.js'

const Categories = () => {
    return(
        <div id="categories-screen">
        
            <div>
                <h2>Add a new Category</h2>
                <AddCategoryForm />           
            </div>

            
            {/* DISPLAY BELOW ONLY IF CATEGORIES EXIST */}
            <div>
                <h2>Delete a Category</h2>
                <DeleteCategoryForm />           
            </div>

        </div>
    )
}

export default Categories