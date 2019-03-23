import React, { Component } from 'react'
import AddEditPortfolioItemForm from './AddEditPortfolioItemForm.js'
import { withListData } from '../context/BigDataProvider.js'

class PortfolioItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    toggler = () => {
        this.props.getPortfolioItem(this.props._id)
        this.setState(prevState => ({
            editToggle: !prevState.editToggle
        }))
        
    }

    render() {
        const { title, imgTitle, imgUrl, description, link, _id, isFeatured } = this.props
        return (
            <div key={_id}  className="portfolio-item">
                {!this.state.editToggle ?
                    <>
                        <img src={imgUrl} alt={imgTitle} width={150} />
                        <h2>{title}</h2>
                        <p>Image alt text: {imgTitle}</p>
                        {(description) ? <p>{description}</p> : ""}
                        {(link) ? <p><a href={link}>{link}</a></p> : ""}
                        <p>{(isFeatured) ? "Featured on the home page" : "Not featured"}</p>
                        <button className="delete" onClick={() => this.props.deletePortfolioItem(_id)}>Delete</button>
                        <button className="edit" onClick={this.toggler}>Edit</button>
                    </>
                    :
                    <>
                        <div onClick={this.toggler}><span className="hidden">Close</span></div>
                        <AddEditPortfolioItemForm
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            btnText="Submit Edit"
                            {...this.state}
                        />
                    </>
                }
            </div>
        )
    }
}

export default withListData(PortfolioItem)