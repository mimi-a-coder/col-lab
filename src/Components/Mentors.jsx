import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faCoins, faMoneyBill, faHouse, faPen } from '@fortawesome/free-solid-svg-icons';
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
       return ( 
           <div className='col-lg-4 mb-5' key={index}>
                <Link to={`/mentor/${mentor.id}`}>
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
                                <p className='small'><FontAwesomeIcon icon={faSuitcase} /> <strong>{mentor?.acf['user_mentor_current_position']} at {mentor?.acf['user_mentor_current_company']}</strong></p>
                                <p className='small'><FontAwesomeIcon icon={faPen} /> {mentor?.acf['user_mentor_bio'].slice(0, 200)}{mentor?.acf['user_mentor_bio'].length > 200 ? '...' : ''}</p>
                                <p className='small'><strong>Offering:</strong> {mentor?.acf['user_mentor_key_responsibilities']}{mentor?.acf['user_mentor_key_responsibilities'].length > 50 ? '...' : ''}</p>
                                <p className='small'><FontAwesomeIcon icon={faCoins} /> {mentor?.acf['user_mentor_currency']} {mentor?.acf['user_mentor_rate_of_pay']}/hour</p>
                            </div>
                        </div>
                    </div>
                </Link>
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
                                <Link to="/" className="link-dark small d-flex align-items-center"><FontAwesomeIcon icon={faHouse} /></Link><span className="breadcrumb-slash d-flex align-items-center">>></span><span className="small d-flex align-items-center">Mentorship Opportunities</span>
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
                                <Link to="/mentor-signup"><a className="btn btn-outline-info btn-lg" onClick={()=>{"show-modal"}}>Apply To Become a Mentor</a></Link>
                            </div>
                        </div>
                    </div>
                    <hr className="mb-5 mt-5"></hr>
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