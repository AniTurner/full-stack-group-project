import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
class DeleteCategoryForm extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    render() {
    
        return (
            <form className="delete-category-form">
                <select name="newCategory" onChange={() => this.props.handleCategoryChange()} required>
                    <option value="">Select Category...</option>
                    {
                        this.props.allCategories.map((category) =>
                            <option value={category._id} key={category._id}>{category.title}</option>
                        )
                    }
                </select>
                <button>Delete</button>
            </form>
        )
    }
}

export default withListData(DeleteCategoryForm)