import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Mentors() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [ search, setSearch ] = useState();
    const [ users, setUsers ] = useState([]);

    // Return Mentors
    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${userDetails.token}`
            }
          })
          .then(res => {
            setUsers(res.data);
            console.log(res.data);
          })
    });

    const mentors = users.map((mentor, index) => {
        if (mentor?.acf?.user_is_mentor === 'Yes') {
       return ( <div className='col-lg-3 mb-5' key={index}>
        <div className='card mentor'>
            <div className='card-body'>
                <div className="questions-details-name">
                  <img className="questions-details-name-img" src={mentor?.avatar_urls['48']} />
                  <div className="questions-details-name-info">
                    <p className='m-0'><strong>{mentor.name}</strong></p>
                    <div className="questions-details-posted">
                      <span className='small'>{mentor?.acf['user-city']}{mentor?.acf['user-country-of-residence'].length > 0 ? ',' : ''} {mentor?.acf['user-country-of-residence']}</span>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className='mentor-main-details'>
                    <p className='small'>{mentor?.acf['user_mentor_current_position']}</p>
                    <p className='small'>{mentor?.acf['user_mentor_current_company']}</p>
                    <p className='small'>{mentor?.acf['user_mentor_key_responsibilites']}</p>
                    <p className='small'>{mentor?.acf['user_mentor_currency']} {mentor?.acf['user_mentor_rate_of_pay']}/per hour</p>
                </div>
            </div>
        </div>
        </div>
       )
    }
    });

    if (userDetails !== null) {
    return (
        <>
            <Navigation />
            <main className='mentors'>
                <div className='container primary'>
                    <div className='get-help-details'>
                        <div className="row mb-5">
                            <div className="col-6 d-flex align-item-center">
                                <Link to="/" className="link-dark small d-flex align-items-center"><svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Home</Link><span className="breadcrumb-slash d-flex align-items-center">/</span><span className="small d-flex align-items-center">Mentorship Opportunities</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <p><strong>Meet our <i>collabb</i> Mentors</strong></p>
                            </div>
                            <div className="col-lg-4">
                                <input type="search" className="form-control" placeholder='Start typing to search' value={search} onChange={(e) => {
                                    setSearch(e.target.value)
                                }} />
                            </div>
                            <div className="col-lg-4 text-end">
                                <Link to="/mentor-signup"><a className="btn btn-outline-info btn-lg" onClick={()=>{"show-modal"}}>Apply to become a mentor</a></Link>
                            </div>
                        </div>
                    </div>
                    <hr className="mb-5"></hr>
                    <div className="mentors">
                        <div className='row'>
                            {mentors}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
    } else {
        window.location.replace('/')
    }
}