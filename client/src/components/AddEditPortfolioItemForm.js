import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import CategoryDropdown from './CategoryDropdown.js';

class AddEditPortfolioItemForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }
    
    handleChange = (event) => {
        // handleChange now caters for checkboxes
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    render() {
        return (
            <form className="portfolio-form">
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.title}
                    onChange={this.props.handleChange}
                    name="title"
                    placeholder="Image title"
                    required />
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.imgUrl}
                    onChange={this.props.handleChange}
                    name="imgUrl"
                    placeholder="Image URL"
                    required />
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.description}
                    onChange={this.props.handleChange}
                    name="description"
                    placeholder="Description"
                    required />
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.link}
                    onChange={this.props.handleChange}
                    name="link"
                    placeholder="Link URL"
                    required />
                
                < CategoryDropdown handleCategoryChange={this.props.handleCategoryChange} allCategories={this.props.allCategories}/>
                
                    <input
                        type="checkbox"
                        value={this.props.currentPortfolioItem.isFeatured}
                        onChange={this.handleChange}
                        name="checked"
                        checked={this.state.checked}
                    />
                    <label>Featured on home page</label>
                
                <button>Save</button>
            </form>
        )
    }
}

export default withListData(AddEditPortfolioItemForm)