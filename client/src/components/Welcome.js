import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import Login from '../components/Login.js'
import Modal from 'react-modal';
import { PageFade } from '../transitions/transition.js'

import './transitionstyles.css'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement() //it is asking to put down (el) but el is not defined??


class Welcome extends Component {
    constructor(props){
        super(props) 
        this.state = {
            modalIsOpen: false,

        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        localStorage.setItem('isLoggedIn', "false")
        localStorage.setItem('isPreview', "false")
    }

    componentDidMount() {
        setTimeout(() => this.setState({modalIsOpen: true}), 3000);
     }

     openModal() {
        this.setState({modalIsOpen: true});
      }
     
      afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
      }
     
      closeModal = ()=>  {
          console.log('close')
        this.setState({modalIsOpen: false});
      }

    render() {
        
        return (
            <div id="welcome-screen">
                <div className="outer-div">
                    <div className="inner-div"></div>
                </div>
                <div className="z-content">
                    <div className="vertical-align-parent">
                    <PageFade location={this.location}>
                        <div  className="vertical-align-child">
                            <button onClick={() => {this.openModal()}}>Login/Signup</button>
                            {(this.state.modalIsOpen === true)
                            ?
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                            <Login />
                            <button onClick={() => this.closeModal()}>Close</button>
                            </Modal>
                            :
                            <h1>&lt;tt&gt;ché</h1>
                            }

                                {/* <Login />  */}
                        </div>
                    </PageFade>
                    </div>
                </div>
            </div>
        )
    }
}

export default withListData(Welcome)