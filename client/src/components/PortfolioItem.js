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
            <div key={_id} className="portfolio-item">
                {!this.state.editToggle ?
                    <div className="card">
                        <div>
                            <div>
                                <img src={imgUrl} alt={imgTitle} width={300} />
                            </div>
                            <div>
                                <div className="bottom-buttons">
                                    <div>
                                        <h3>{title}</h3>
                                    </div>
                                    <div>
                                        {(description) ? <p><span className="text-italic">{description}</span></p> : ""}
                                        <p>Image alt text: {imgTitle}</p>
                                        {(link) ? <p>Links to: <a href={link}>{link}</a></p> : ""}
                                        <p>{(isFeatured) ? "Featured on the home page" : "Not featured"}</p>
                                    </div>
                                    <div>
                                        <button className="delete" onClick={() => this.props.deletePortfolioItem(_id)}>Delete</button>
                                        <button className="edit" onClick={this.toggler}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <AddEditPortfolioItemForm
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            toggler={this.toggler}
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