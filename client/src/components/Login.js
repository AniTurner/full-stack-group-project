import React, { Component } from 'react'
import AuthLogin from '../components/AuthLogin.js'
import Signup from '../components/Signup.js'
import Toggle from '../shared/Toggle.js'

class Login extends Component {
    constructor() {
        super() 
        this.state = {
            userChoice: 'login'
        }
        localStorage.setItem('isLoggedIn', "false")
        localStorage.setItem('isPreview', "false")
    }

    setUserChoice = (str) => {
        this.setState ({
            userChoice: str
        })
    }
    render() {
       
        return (
            <main>
                <div id="login-screen" className="center-crop">
                    <button onClick={() => this.setUserChoice('login')}>Login</button>
                    <button onClick={() => this.setUserChoice('signup')}>Sign Up</button>
                    {/* DISPLAY DIV ONLY IF USERS EXIST */}
                    {(this.state.userChoice === 'signup') 
                    ?
                    <div>
                        <Signup />
                    </div>
                    :
                    <div>
                        <AuthLogin />

                    </div>
                    }                    
                    
                </div>
            </main>
        )
    }

}

export default Login