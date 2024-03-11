import React from 'react';
import { Link } from 'react-router-dom';

export default function Registration() {
    return (
        <div className="container primary login">
        <div className="row mb-4">
            <div className="col">
                <h1 className="text-center mb-3">Become a <i>ColLabb</i> member</h1>
            </div>
        </div>
        <form className="form-registration">
            <div className="row">
                <div className="col">
                    <p className="login-lead"><strong>Tell us a bit more about yourself...</strong></p>
                </div>                
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <input className="form-control form-control-lg" type="text" placeholder="First Name" aria-label="First Name" required />
                </div>                
                <div className="col-lg-6">
                    <input className="form-control form-control-lg" type="text" placeholder="Last Name" aria-label="First Name" required />
                </div>                
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <p className="small form-registration-label">Enter Your Birth Date</p>
                    <input className="form-control form-control-lg" type="Date" placeholder="Birthday" aria-label="Birthday" required />
                </div>                
                <div className="col-lg-6">
                    <select className='form-control form-select' aria-label='Gender Selection'>
                        <option selected disabled>Choose A Gender</option>
                        <option>Man</option>
                        <option>Woman</option>
                        <option>Prefer Not To Say</option>
                    </select>
                </div>                
            </div>
            <div className="row">              
                <div className="col-lg-6">
                    <input className="form-control form-control-lg" type="text" placeholder="Job Title" aria-label="Job Title" required />
                </div>                
                <div className="col-lg-6">
                    <input className="form-control form-control-lg" type="text" placeholder="Institution" aria-label="Institution" required />
                </div>                
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <input className="form-control form-control-lg" type="text" placeholder="Country of Residence" aria-label="Country" required />
                </div>                
                <div className="col-lg-6">
                    <input className="form-control form-control-lg" type="text" placeholder="City" aria-label="City" required />
                </div>                
            </div>
            <div className="row">              
                <div className="col">
                    <input className="form-control form-control-lg" type="text" placeholder="Field of Research" aria-label="Field of Research" required />
                </div>                
            </div>
            <div className="row">              
                <div className="col">
                    <input className="form-control form-control-lg" type="text" placeholder="Current Degree Level" aria-label="Current degree level" required />
                </div>                
            </div>
            <div className="row">              
                <div className="col">
                    <input className="form-control form-control-lg" type="text" placeholder="Indicate up to 20 skills/areas of expertise" aria-label="Indicate up to 20 skills/areas of expertise" required />
                </div>                
            </div>
            <div className="row">              
                <div className="col">
                    <input className="form-control form-control-lg" type="Email" placeholder="Email" aria-label="Email" required />
                </div>                
            </div>
            <div className="row">              
                <div className="col">
                    <input className="form-control form-control-lg" type="password" placeholder="Password" aria-label="password" required />
                </div>                
            </div>
            <div className="row mt-2">
                    <div className="col"> 
                        <button className="btn btn-lg btn-primary login-btn">Sign Up</button>
                    </div>                    
            </div>
            <div className="row">
                <div className="col d-flex">                        
                    <p>By clicking ‘Sign Up’, you are agreeing to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
                </div>                
            </div>
            <div className="row">
                <div className="col d-flex">                        
                    <p>Already have an account?<span className="span-login"><Link to="/">Sign in</Link></span></p>
                </div>                
            </div>
        </form>
    </div>
    );
}