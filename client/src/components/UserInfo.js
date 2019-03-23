import React,{Component} from 'react'
import {withListData} from '../context/BigDataProvider.js'
import {TimelineLite} from 'gsap'
import '../styles-admin.css'
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

        this.modalElement = null
        this.tl = new TimelineLite ({paused: true})
    }

    toggleModal = () => {
        const {modalToggle} = this.state
        if(!modalToggle){
            this.tl.to(this.modalElement, 0.3, {autoAlpha: 1})
                .to(this.modalElement, 0.5 , {top: 50, scale:1}, "-=0.3")
                .play()
        } else{
            this.tl.to(this.modalElement, 0.3, {autoAlpha: 0})
                .to(this.modalElement, 0.5, {top: 0 , scale: 0.75}, "-=0.3")
                .play()
        }
        this.setState(pervState => ({modalToggle: ! pervState.modalToggle}))
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const userUpdate = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            aboutMe: this.state.aboutMe,
            address: this.state.address,
            phone: this.state.phone,
            imgUrl: this.state.imgUrl
        }

        this.props.updateUser(this.props.currentUserId , userUpdate)
        console.log('hi')

    }
    render(){
        console.log(this.props)
        return(
            <div id="user-info-edit-screen">
            
                <h2>User Info</h2>
                <hr />
                <h1>{`${this.state.firstName} ${this.state.lastName}`}</h1>
                
                <form id="user-info-form" style={{padding:20 , display:"grid", justifyContent: "center" , alignItems:"center"}} onSubmit={this.handleSubmit}>
                    <img style={{width:150,height: 150,float:"left",marginRight:20,borderRadius:100}} src={this.state.imgUrl ? this.state.imgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJlZBm6kPxbsgHqvL2GNBMrLY_Ns4mhJFiOa4L1Sgkz1u-J2gtg" }/>
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/> <br />
                    First Name: <input type="text" name="firstName" value={this.state.firstName ? this.state.firstName : "First Name"} onChange={this.handleChange}/> <br />
                    Last Name: <input type="text" name="lastName" value={this.state.lastName ? this.state.lastName : "Last Name"} onChange={this.handleChange}/> <br />
                    About Me: <input type="text" name="aboutMe" value={this.state.aboutMe ? this.state.aboutMe : "About Me"} onChange={this.handleChange}/> <br />
                    Address: <input type="text" name="address" value={this.state.address ? this.state.address : "Address"} onChange={this.handleChange}/> <br />
                    Phone Number: <input type="text" name="phone" value={this.state.phone ? this.state.phone : "Phone Number"} onChange={this.handleChange}/>
                    <button>SAVE</button>
                </form>

                <div ref={div => this.modalElement = div} className="modal">
                <p>Your Update has been saved</p>
                <button onClick={this.toggleModal}>Close</button>
                </div>
                
            </div>
        )
    }
}

export default withListData(UserInfo)