import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Brand from '../Images/colLAB-logo.svg';

export default function Login() {

    let tocken = localStorage.getItem('jwt');
  console.log(tocken);
    // Login
    const [jwtToken, setjwtToken] = useState('');
    const [serverMessage, setServerMessage] = useState('');

    // Capture User Input
    const [userLogin, setUserLogin] = useState({
        user: '',
        pass: ''
    });

    const [apiSettings, setApiSettings] = useState({
        user: '',
        pass: ''
    });
    

    function handleChange(e) {
        const {name, value} = e.target
        setUserLogin(prev => {
            return (
                { ...prev, [name]: value}
            )
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setApiSettings({ ...userLogin });
    }

    // Inititate call to wordpress
    useEffect(()=> {
        if (apiSettings.user.length > 0) {
            let newFormData =  new FormData();
            newFormData.append('username', apiSettings.user);
            newFormData.append('password', apiSettings.pass);
            // Setup .env variable
            const url = `https://pattersonselectric.com/wp-json/jwt-auth/v1/token`;
            // Axios POST request
            axios.post(url, newFormData)
            .then(function(response) {
                console.log(response);
                setjwtToken(response.data.token);
                localStorage.setItem("jwt", response.data.token);
                localStorage.setItem("user_name", response.data.user_display_name)
            }).catch(function(err) {
                setServerMessage(err.response.data.code);
            })
        } 
    }, [apiSettings])

    // Save JWT and redirect to dashboard page
    useEffect(() => {
        // Check if jwtToken is not empty
        if (jwtToken.length > 0) {
          window.location.replace("/dashboard");
        } 
    }, [jwtToken])
    
    // Set Server Messgae
    function userServerMessage() {
        if (serverMessage) {
            if (serverMessage === "[jwt_auth] incorrect_password") {
                return (
                    <div className="row mb-4">
                        <div className="col">
                            <div className="alert alert-danger" role="alert">
                                <p>You've entered an incorrect password. Please try again or click on the 'Forgot Password' link if you need assistance resetting your account access.</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (serverMessage === "[jwt_auth] invalid_username") {
                return (
                    <div className="row mb-4">
                        <div className="col">
                            <div className="alert alert-danger" role="alert">
                                <p>We couldn't find an account associated with the username you entered. Please double-check your spelling or sign up for a new account if you haven't already.</p>
                            </div>
                        </div>
                    </div>
                );
            }
        } 
    }

    if (localStorage.getItem('jwt') === null ) {
    return (
        <div className="container primary login">
            <div className="row mb-4">
                <div className="col-lg-12 d-flex justify-content-center mb-3"><img className="brand" src={Brand}/></div>
                <div className="col-lg-12">
                    <h1 className="mb-3 login-header text-center">Welcome to <i>ColLabb</i>!</h1>
                </div>
            </div>
            <form className="form-login">
                <div className="row mb-3">
                    <div className="col">
                        <p className="login-lead"><strong>Enter your details to proceed further.</strong></p>
                    </div>                
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <input className="form-control form-control-lg" type="username" name="user" value={userLogin.user} onChange={handleChange} placeholder="Username" aria-label="username" required />
                    </div>                
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <input className="form-control form-control-lg" type="password" name="pass" value={userLogin.pass} onChange={handleChange} placeholder="Password" aria-label="Passwword" required />
                    </div>                
                </div>
                <div className="row">
                    <div className="col d-flex">                        
                        <input className="form-login-check" type="checkbox" /> <span className="span-login"><p>Keep me signed in</p></span>
                    </div>   
                    <div className="col">
                        <p className="text-end"><a href="#">Forgot password?</a></p>
                    </div>               
                </div>
                <div className="row mt-2 mb-4">
                        <div className="col"> 
                            <button className="btn btn-lg btn-primary login-btn" onClick={handleSubmit}>Log In</button>
                        </div>                        
                </div>
                <div className="row">
                    <div className="col d-flex">                        
                        <p>Don't have an account?<span className="span-login"><Link to="/registration">Sign up</Link></span></p>
                    </div>                
                </div>
            </form>
            {userServerMessage()}
        </div>
    );
    } else {
      window.location.replace('/dashboard');
    }
}
