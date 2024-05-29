import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faLanguage, faClock, faMoneyBill, faCalendarDays, faDesktop, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";



export default function Mentor() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const { param1 } = useParams();
    console.log(param1)
    const [ mentorDetails, setMentorDetails ] = useState({}); 

    useEffect(() => {
      axios({
        url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users/${param1}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userDetails.token}`
        } 
      })
      .then((response) => {
        setMentorDetails(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err))
    }, []);

    // Handle Check
    function handelCheckedChange(e) {
        let checked = e.target.checked;
        if (checked === true) {
            axios.post(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/jobs/${param1}`,{acf: {
                'jobs_applied_users': `${mentorDetails?.acf?.jobs_applied_users} ${JSON.stringify(userDetails.id)} `
              }
            },
            {
                    headers: {
                    Authorization: `Bearer ${userDetails.token}`
                }
            } 
              )
              .then(res => {
                setMentorDetails(res.data)})
              .catch(err => {console.log(err)})
        }
    }

  function DateToReadable(param) {
    const dateString = param;
    const year = dateString?.substring(0, 4);
    const month = dateString?.substring(4, 6);
    const day = dateString?.substring(6, 8);

    const date = new Date(`${year}-${month}-${day}`);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate
  }
 
  let seeIfchecked = mentorDetails?.acf?.jobs_applied_users?.split(' ');
    
  if (userDetails != null) {
    return(
        <>
            <Navigation />
            <main className="create-job">
                <div className="container primary" >
                    <div className="page-filter">
                        <div className="row mb-5">
                            <div className="col-12 d-flex">
                                <Link to="/" className="link-dark small d-flex align-items-center"><svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Home</Link><span className="breadcrumb-slash">/</span><Link className="link-dark small d-flex align-items-center" to="/jobs">Jobs</Link><span className="breadcrumb-slash">/</span><span className="small d-flex align-items-center">{mentorDetails?.title?.rendered.slice(0, 15)}{mentorDetails?.title?.rendered.length > 15 ? '...' : ''}</span>
                            </div>
                        </div>
                    </div>
                    <form className="form-create-job mx-auto" >
                        <div className="row mb-4 d-flex align-items-center">
                            <div className="col-auto mb-4">
                                <img className="mentor-details-img" src={mentorDetails?.avatar_urls?.['48']} alt={mentorDetails?.name} />
                            </div>
                            <div className="col-auto mb-4">
                                <h1>{mentorDetails?.name}</h1>
                                <p className="m-0">{mentorDetails?.acf?.['user_mentor_current_position']} at {mentorDetails?.acf?.['user_mentor_current_company']}</p>
                                <p className="m-0">{mentorDetails?.acf?.['user-city']}{mentorDetails?.acf?.['user-country-of-residence'].length > 0 ? ',' : ''} {mentorDetails?.acf?.['user-country-of-residence']}</p>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="row mb-4">
                            <div className="col-lg-12 mb-4">
                                <span><strong>About me:</strong> {mentorDetails?.acf?.['user_mentor_bio']}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Key responsibilities:</strong> {mentorDetails?.acf?.['user_mentor_key_responsibilities']}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Education:</strong> {mentorDetails?.acf?.user_mentor_education}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Preferred language(s):</strong> {mentorDetails?.acf?.user_mentor_preferred_language}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Job language requirements:</strong> {mentorDetails?.acf?.jobs_languages}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Job schedule:</strong> {mentorDetails?.acf?.jobs_schedule}</span>                            
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Expected start date:</strong> {DateToReadable(mentorDetails?.acf?.jobs_exptected_start_date)}</span>
                            </div>
                        <hr></hr>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12 mb-4">
                                <p className="lead">Full job description</p>
                                <div dangerouslySetInnerHTML={{ __html: mentorDetails?.acf?.jobs_description }} />
                            </div> 
                        <hr></hr>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12 mb-4">
                                <p className="lead"><strong>Instructions to apply</strong></p>
                                <div dangerouslySetInnerHTML={{ __html: mentorDetails?.acf?.jobs_instructions_to_apply }} />
                            </div> 
                        <hr></hr>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12 mb-4">
                                <span><FontAwesomeIcon icon={faClock} /> <strong>Application deadline: </strong>{DateToReadable(mentorDetails?.acf?.jobs_application_deadline)}</span>
                            </div> 
                        </div>
                        <div className="row mb-4">
    <div className="col-lg-6 mb-4 d-flex align-items-center">
        <input 
            className="form-check-input form-control m-0" 
            checked={seeIfchecked?.includes(userDetails?.id?.toString())} 
            disabled={seeIfchecked?.includes(mentorDetails?.id.toString())}
            onChange={handelCheckedChange} 
            type="checkbox" 
            aria-label="Applied to job checkbox" 
            id="appliedCheck" 
        />
        <span className="form-check-label mx-2" style={{color: '#000'}} htmlFor="appliedCheck">I have applied to this job.</span>
    </div> 
</div> 
                        <div className="row mb-4">
                            <div className="col-lg-6 mr-3 mb-4 d-flex align-items-center">
                                <Link to="/jobs"><button className="btn btn-info btn-lg">Back</button></Link>
                            </div> 
                        </div>
                    </form>                 
                </div>
            </main>
    </>
        );
      } else {
        window.location.replace("/");
      }
};