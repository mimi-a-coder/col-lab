import React from 'react';
import Navigation from './Navigation';

export default function Login() {
    return (

            <div className="container primary login">
                <div className="row mb-4">
                    <div className="col">
                        <h1 className="lead text-center">Welcome to colLab!<br/>Sign In Using Your Registered Account.</h1>
                    </div>
                </div>
                <form className="form-login">
                    <div className="row mb-4">
                        <div className="col">
                            <p className="login-lead">Enter your details to proceed further.</p>
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
                        <div className="col">
                            <a href="#"><p>Forgot password?</p></a>
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col d-flex">                        
                            <input className="form-login-check" type="checkbox" /> <span className="span-login"><p>Keep me signed in.</p></span>
                        </div>                
                    </div>
                    <div className="row mt-2 mb-4">
                            <div className="col"> 
                                <button className="btn btn-lg btn-primary login-btn">Log In</button>
                            </div>
                            
                    </div>
                    <div className="row">
                        <div className="col d-flex">                        
                            <p>Don't have an account?</p> <span className="span-login"><a href=""><p>Sign up</p></a></span>
                        </div>                
                    </div>
                </form>
            </div>
    );
}
