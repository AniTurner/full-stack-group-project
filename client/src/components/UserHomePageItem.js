import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import { Link } from 'react-router-dom'

class PortfolioItem extends Component {

    render() {

        const { imgUrl, link, _id } = this.props

        return (

            <div key={_id} className="portfolio-item" style={{ backgroundImage: `url(${imgUrl}` }}>
                <Link to={`/${this.props.currentUser.username}/cat/${link}`}></Link>
            </div>

        )
    }
}

export default withListData(PortfolioItem)