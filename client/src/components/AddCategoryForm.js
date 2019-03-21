import React from 'react'
import {withListData} from '../context/BigDataProvider.js'
const AddCategoryForm = (props) => {
    // console.log(props)
    return(
        <> 
            <hr/>
            <form className="add-category-form" onSubmit={props.handleCategorySubmit}>
                <input type="text" value={props.newCategory} onChange={props.handleCategoryChange} name="newCategory" placeholder="New Category"/><br/>
                <button>Add Category</button> <br/><br/><hr/>

            </form>

                <form>
                    <select name="newCategory" onChange={props.handleChange} required>
                        <option value="">Select Category...</option>
                        {
                            props.allCategories.map((category) => 
                                <option value={category._id}>{category}</option>
                            )
                        }
                    </select>
                </form>
            
        </>
    )
}

export default withListData(AddCategoryForm)