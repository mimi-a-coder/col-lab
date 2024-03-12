import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
    // Login
    const [urlToLogin, setUrlToLogin] = useState('');
    const [serverMessage, setServerMessage] = useState('');

    // Capture User Input
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });

    const [apiSettings, setApiSettings] = useState({
        email: '',
        password: ''
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
        if (apiSettings.email.length > 0) {
            let newFormData =  new FormData();
            newFormData.append('email', apiSettings.email);
            newFormData.append('password', apiSettings.password);
            const url = 'https://pattersonselectric.com/?rest_route=/simple-jwt-login/v1/auth';
            // Axios POST request
            axios.post(url, newFormData)
            .then(function(response) {
                console.log(response);
                if (response.data.success === true) {
                    console.log(response)
                    localStorage.setItem('jwt', response.data.jwt);
                    setUrlToLogin(`https://pattersonselectric.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=${response.data.jwt}`);
                } else {
                    console.log(response.data.message)
                }
            })
        } 
    }, [apiSettings])

    useEffect(() => {
        // Check if urlToLogin is not empty
        if (urlToLogin.length > 0) {
            axios.get(urlToLogin)
            .then((response) => {
                if (response.data.status === 200) {
                window.location.replace('/dashboard');
            } else {
                console.log('error');    
            }
            })
        }
    }, [urlToLogin])

    return (
        <div className="container primary login">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="mb-3 login-header">Welcome to <i>ColLabb</i>!</h1>
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
                        <input className="form-control form-control-lg" type="email" name="email" value={userLogin.email} onChange={handleChange} placeholder="Email" aria-label="Email" required />
                    </div>                
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <input className="form-control form-control-lg" type="password" name="password" value={userLogin.password} onChange={handleChange} placeholder="Password" aria-label="Passwword" required />
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
                            <button type="submit "className="btn btn-lg btn-primary login-btn" onClick={handleSubmit}>Log In</button>
                        </div>                        
                </div>
                <div className="row">
                    <div className="col d-flex">                        
                        <p>Don't have an account?<span className="span-login"><Link to="/registration">Sign up</Link></span></p>
                    </div>                
                </div>
            </form>
        </div>
    );
}
