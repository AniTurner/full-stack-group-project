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
                    <div className="card">
                        <div><img src = {props.currentUser.imgUrl} alt="" width="300"/></div>
                        <div>
                            <div>
                                <h3>About Me:</h3>
                                <p>{props.currentUser.aboutMe}</p>
                            </div>
                            <div>
                                <h3>Address:</h3>
                                <p>{props.currentUser.address}</p>
                            </div>
                            <div>
                                <h3>Phone:</h3>
                                <p>{props.currentUser.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            :
            null
            }
        </main>
    )
}

export default withListData(UserContact)
