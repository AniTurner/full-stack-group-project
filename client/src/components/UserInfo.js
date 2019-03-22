import React,{Component} from 'react'
import {withListData} from '../context/BigDataProvider.js'
class UserInfo extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            username: this.props.currentUser.username,
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
            aboutMe: this.props.currentUser.aboutMe,
            address: this.props.currentUser.address,
            phone: this.props.currentUser.phone,
            imgUrl: this.props.currentUser.imgUrl
        }
    }
    render(){
        console.log(this.props)
        return(
            <div id="user-info-edit-screen">
            
                <h2>User Info</h2>
                <hr />
                <h1>{`${this.state.firstName} ${this.state.lastName}`}</h1>
                
                <form id="user-info-form" style={{padding:20}}>
                    <img style={{width:150,height: 150,float:"left",marginRight:20,borderRadius:100}} src={this.state.imgUrl ? this.state.imgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJlZBm6kPxbsgHqvL2GNBMrLY_Ns4mhJFiOa4L1Sgkz1u-J2gtg" }/>
                    <input type="text" name="username" value={this.state.username} onChange={this.props.handleChange}/> <br />
                    <input type="text" name="" value={this.state.aboutMe != "" ? this.state.aboutMe : "About Me"} onChange={this.props.handleChange}/> <br />
                    <input type="text" name="" value={this.state.address ? this.state.address : "Address"} onChange={this.props.handleChange}/> <br />
                    <input type="text" name="" value={this.state.phone ? this.state.phone : "Phone Number"} onChange={this.props.handleChange}/>
                    <button>SAVE</button>
                </form>
                
            </div>
        )
    }
}

export default withListData(UserInfo)