import React from 'react';
import { Link } from 'react-router-dom';
import Registration from './Registration';

export default function Login() {
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
                        <input className="form-control form-control-lg" type="email" placeholder="Email" aria-label="Email" required />
                    </div>                
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <input className="form-control form-control-lg" type="Password" placeholder="Password" aria-label="Passwword" required />
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
                            <button className="btn btn-lg btn-primary login-btn">Log In</button>
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
