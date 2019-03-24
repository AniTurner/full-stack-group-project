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
                <div className="close-button" onClick={this.props.toggler}><span className="hidden">Close</span></div>
                <div>

                    <div>
                        {(!this.props.currentPortfolioItem.imgUrl) 
                        ? <img src='https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder.png' alt='placeholder' width={300} />
                        : <img src={this.props.currentPortfolioItem.imgUrl} alt="" width={300} />
                        }
                        
                    </div>

                    <div className="form-fields">
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

                        <button>Save</button>
                        
                        <div>
                            <input
                                type="checkbox"
                                value={this.props.currentPortfolioItem.isFeatured}
                                onChange={this.props.handlePortfolioChange}
                                name="isFeatured"
                                checked={this.props.currentPortfolioItem.isFeatured}
                            />
                            <label>Featured on home page</label>
                        </div>
                        
                    </div>


                </div>
            </form>
        )
    }
}

export default withListData(AddEditPortfolioItemForm)