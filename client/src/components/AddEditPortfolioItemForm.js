import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import CategoryDropdown from './CategoryDropdown.js'

class AddEditPortfolioItemForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <form className="portfolio-form" onSubmit={this.props.handlePortfolioSubmit}>
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.title}
                    onChange={this.props.handlePortfolioChange}
                    name="title"
                    placeholder="Title"
                    required />
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.imgUrl}
                    onChange={this.props.handlePortfolioChange}
                    name="imgUrl"
                    placeholder="Image URL"
                    required />
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.imgTitle}
                    onChange={this.props.handlePortfolioChange}
                    name="imgTitle"
                    placeholder="Image Title"
                    required />
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.description}
                    onChange={this.props.handlePortfolioChange}
                    name="description"
                    placeholder="Description"
                    required />
                <input
                    type="text"
                    value={this.props.currentPortfolioItem.link}
                    onChange={this.props.handlePortfolioChange}
                    name="link"
                    placeholder="Link URL"
                    required />

                < CategoryDropdown handleCategoryChange={this.props.handleCategoryChange} allCategories={this.props.allCategories} />

                <input
                    type="checkbox"
                    value={this.props.currentPortfolioItem.isFeatured}
                    onChange={this.props.handlePortfolioChange}
                    name="isFeatured"
                    checked={this.props.currentPortfolioItem.isFeatured}
                />
                <label>Featured on home page</label>

                <button>Save</button>
            </form>
        )
    }
}

export default withListData(AddEditPortfolioItemForm)