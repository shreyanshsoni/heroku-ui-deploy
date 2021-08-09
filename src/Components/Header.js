import React from 'react';
import '../Styles/filter.css';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #192f60',
    backgroundColor: 'white',
  },
};

class Header extends React.Component{
    constructor() {
        super()
        this.state={
            loginModalIsOpen:false,
            loggedInUserName:undefined,
            isLoggedIn:false
        }
    }

    handleNavigate = () => {
        this.props.history.push('/')
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    handleLogin= () => {
        this.setState({ loginModalIsOpen: true })
    }

    responseGoogle = (response) => {
        localStorage.setItem('loggedInUserName', response.profileObj.name)
        console.log(response);
        this.setState({ loginModalIsOpen:false, isLoggedIn:true, loggedInUserName:response.profileObj.name })
    }

    handleLogout= () => {
        this.setState({isLoggedIn:false})
    }  

    handleClose = () => {
        this.setState({loginModalIsOpen:false})
    }
    
    render(){
        const { loginModalIsOpen, isLoggedIn }= this.state
        const loggedInUserName = localStorage.getItem('loggedInUserName');
        // console.log(loggedInUserName)
        return(
            <div>
                <div className="header">
                    <header>
                        < div className ="header">

                            {isLoggedIn ? <div >
                            <span className="loggedOutUserName zoomlogout" onClick={this.handleLogout} /*onChange={this.userOnload}*/>Logout</span>
                            <span className="loggedInUserName">{loggedInUserName}</span>
                            </div>:
                                < div className="style_login">
                                    <button className="login zoom" onClick={this.handleLogin}>Login</button>
                                    <button className="create_account zoom">Create an account</button>
                                </div>
                            }

                            <button className="logofilter" onClick={this.handleNavigate}>
                                <b>e!</b>
                            </button>
                        </div>
                    </header>
                </div>
                <Modal
                isOpen={loginModalIsOpen}
                style={customStyles}
                >
                    
                    <div >
                        <span className="fa fa-times-circle closebtn zoomclosebtn" onClick={this.handleClose}></span>
                    
                        <FacebookLogin
                        appId="4208867322540312"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook}

                        />
                        <GoogleLogin  
                            clientId="741047447924-r434pudm0u0rski12ko2tp76pb4ujnti.apps.googleusercontent.com"
                            buttonText="Login with Gmail"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}
export default withRouter(Header);