import React from 'react'
import {withListData} from '../context/BigDataProvider.js'
const AddCategoryForm = (props) => {
    // console.log(props)
    return(
        <> 
            <hr/>
            <form className="add-category-form" onSubmit={props.handleCategorySubmit}>
                <input type="text" value={props.newCategory} onChange={ props.handleChange} name="newCategory" placeholder="New Category"/><br/>
                <button>Add Category</button> <br/><br/><hr/>

            </form>

             
        </>
    )
}

export default withListData(AddCategoryForm)