import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Registration() {

    const [userLogin, setUserLogin]  = useState({
        username: '',
        first_name: '',
        last_name: '',
        name: '',
        user_birth_date: '',
        user_gender: '',
        user_job_title: '',
        user_job_Insitution: '',
        user_country_of_residence: '',
        user_city: '',
        user_research: '',
        user_degree: '',
        user_skills: '',
        email: '',
        password: '',
    })

    const [apiSettings, setApiSettings] = useState({
        username: '',
        first_name: '',
        last_name: '',
        name: '',
        user_birth_date: '',
        user_gender: '',
        user_job_title: '',
        user_job_Insitution: '',
        user_country_of_residence: '',
        user_city: '',
        user_research: '',
        user_degree: '',
        user_skills: '',
        email: '',
        password: '',
        roles: 'admin'
    });

    const [ serverMessage, setServerMessage ] = useState(""); 
    

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
            if (apiSettings.username.length > 0) {
                let newFormData =  new FormData();
                let acf = {
                   'user-birth_date': apiSettings.user_birth_date,
                   'user-gender': apiSettings.user_gender,
                   'user-job-title':  apiSettings.user_job_title,
                   'user-job-Insitution': apiSettings.user_job_Insitution,
                   'user-country-of-residence': apiSettings.user_country_of_residence,
                   'user-city': apiSettings.user_city,
                   'user-research': apiSettings.user_research,
                   'user-degree': apiSettings.user_degree,
                   'user-skills': apiSettings.user_skills,
                }
                newFormData.append('username', apiSettings.username);
                newFormData.append('password', apiSettings.password);
                newFormData.append('first_name', apiSettings.first_name);
                newFormData.append('last_name', apiSettings.last_name);
                newFormData.append('name', apiSettings.name);
                newFormData.append('email', apiSettings.email);
                newFormData.append(acf['user-birth_date'], apiSettings.user_birth_date);
                newFormData.append(acf['user-gender'], apiSettings.user_gender);
                newFormData.append('acf.user-job-title', apiSettings.user_job_title);
                newFormData.append('acf.user-job-Insitution', apiSettings.user_job_Insitution);
                newFormData.append('acf.user-country-of-residence', apiSettings.user_country_of_residence);
                newFormData.append('acf.user-city', apiSettings.user_city);
                newFormData.append('acf.user-research', apiSettings.user_research);
                newFormData.append('acf.user-degree', apiSettings.user_degree);
                newFormData.append('acf.user-skills', apiSettings.user_skills);
                // Setup .env variable
                const url = `https://pattersonselectric.com/wp-json/wp/v2/users`;
                // Axios POST request
                axios.post(url, newFormData)
                .then(function(response) {
                    console.log(response);
                    localStorage.setItem('registrationMessage', 'Thank you for registering with us. You are now a member of our community. Login to explore collabb.');
                    window.location.replace('/');
                }).catch(function(err) {
                    setServerMessage(err.response.data.message);
                    console.log(err.response.data.messgae);
                })
            } 
        }, [apiSettings])

            // Set Server Messgae
    function userServerMessage() {
        if (serverMessage.length > 0) {
            return (
                <div className="row mb-4">
                    <div className="col-lg-12">
                        <div className="alert alert-danger" role="alert">
                            <p>{serverMessage}</p>
                        </div>
                    </div>
                </div>
            );
        } 
    }

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
                    <input name="first_name" value={userLogin.first_name} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="First Name" aria-label="First Name" required />
                </div>                
                <div className="col-lg-6">
                    <input name="last_name" value={userLogin.last_name} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="Last Name" aria-label="First Name" required />
                </div>                
                <input name="name" value={userLogin.first_name+' '+userLogin.last_name} onChange={handleChange}  className="form-control form-control-lg" type="hidden" placeholder="Username" aria-label="User Name"/>
            </div>
            <div className="row">              
                <div className="col">
                    <input name="email" value={userLogin.email} onChange={handleChange} className="form-control form-control-lg" type="Email" placeholder="Email" aria-label="Email" required />
                </div>                
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <p className="small form-registration-label">Enter Your Birth Date</p>
                    <input name="user_birth_date" value={userLogin.user_birth_date} onChange={handleChange} className="form-control form-control-lg" type="Date" placeholder="Birthday" aria-label="Birthday" required />
                </div>                
                <div className="col-lg-6">
                    <select name="user_gender" value={userLogin.user_gender} onChange={handleChange} className='form-control form-select' aria-label='Gender Selection'>
                        <option selected disabled>Choose A Gender</option>
                        <option>Man</option>
                        <option>Woman</option>
                        <option>Prefer Not To Say</option>
                    </select>
                </div>                
            </div>
            <div className="row">              
                <div className="col-lg-6">
                    <input name="user_job_title" value={userLogin.user_job_title} onChange={handleChange}  className="form-control form-control-lg" type="text" placeholder="Job Title" aria-label="Job Title" required />
                </div>                
                <div className="col-lg-6">
                    <input name="user_job_Insitution" value={userLogin.user_job_Insitution} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="Institution" aria-label="Institution" required />
                </div>                
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <input name="user_country_of_residence" value={userLogin.user_country_of_residence} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="Country of Residence" aria-label="Country" required />
                </div>                
                <div className="col-lg-6">
                    <input name="user_city" value={userLogin.user_city} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="City" aria-label="City" required />
                </div>                
            </div>
            <div className="row">              
                <div className="col">
                    <input name="user_research" value={userLogin.user_research} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="Field of Research" aria-label="Field of Research" required />
                </div>                
            </div>
            <div className="row">              
                <div className="col">
                    <input name="user_degree" value={userLogin.user_degree} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="Current Degree Level" aria-label="Current degree level" required />
                </div>                
            </div>
            <div className="row">              
                <div className="col">
                    <textarea name="user_skills" value={userLogin.user_skills} rows="4" onChange={handleChange} className="form-control form-control-lg" placeholder="Indicate up to 20 skills/areas of expertise, seperate skills with a comma." aria-label="Indicate up to 20 skills/areas of expertise" required></textarea>
                </div>                
            </div>
            <div className="row">              
                <div className="col-lg-12">
                    <p><strong>Account Details:</strong></p>
                </div>                
            </div>
            <div className="row">
                <div className="col">
                    <input name="username" value={userLogin.username} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="Username" aria-label="User Name" required />
                </div>                           
            </div>
            <div className="row">              
                <div className="col">
                    <input name="password" value={userLogin.password} onChange={handleChange} className="form-control form-control-lg" type="password" placeholder="Password" aria-label="Password" required />
                </div>                
            </div>
            {userServerMessage()}
            <div className="row mt-2">
                    <div className="col"> 
                    <button className="btn btn-lg btn-primary login-btn" onClick={handleSubmit}>Sign Up</button>
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