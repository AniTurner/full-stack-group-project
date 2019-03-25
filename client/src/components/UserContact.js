import React from 'react'
import { withListData } from '../context/BigDataProvider.js'
const UserContact = (props) => {
    console.log(props)
    return(
        <main> 
            { props.currentUserId
            ?
                <div id="portfolio-contact-screen" className="center-crop">
                <h2>{props.currentUser.firstName + " " + props.currentUser.lastName}</h2>
                <img src = {props.currentUser.imgUrl} alt="" width="300"/>
                Address: <h4>{props.currentUser.address}</h4>
                Phone: <h4>{props.currentUser.phone}</h4>
                About Me: <h4>{props.currentUser.aboutMe}</h4>
                <p></p>
            </div>
            :
            null
            }
        </main>
    )
}

export default withListData(UserContact)
