import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faLanguage, faClock, faMoneyBill, faCalendarDays, faDesktop, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";



export default function CreateJob() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [jobStatus, setJobStatus] = useState("");
    const { param1 } = useParams();
    const [ jobDetails, setJobDetails ] = useState(); 
    const [createJob, setCreateJob]  = useState({
        title: '',
        jobs_institution: '',
        jobs_job_type: '',
        jobs_benefits: '',
        jobs_languages: '',
        jobs_work_location: '',
        jobs_schedule: '',
        jobs_instructions_to_apply: '',
        jobs_application_deadline: '',
        jobs_exptected_start_date: '',
    })

    useEffect(() => {
      console.log(param1)
      axios({
        url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/jobs/${param1}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userDetails.token}`
        } 
      })
      .then((response) => {
        setJobDetails(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err))
    }, []);

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
    
  if (userDetails != null) {
    return(
        <>
            <Navigation />
            <main className="create-job">
                <div className="container primary" >
                    <div className="page-filter">
                        <div className="row mb-5">
                            <div className="col-12 d-flex">
                                <Link to="/" className="link-dark small d-flex align-items-center"><svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Home</Link><span className="breadcrumb-slash">/</span><Link className="link-dark small d-flex align-items-center" to="/jobs">Jobs</Link><span className="breadcrumb-slash">/</span><span className="small d-flex align-items-center">{jobDetails?.title?.rendered.slice(0, 15)}{jobDetails?.title?.rendered.length > 15 ? '...' : ''}</span>
                            </div>
                        </div>
                    </div>
                    <form className="form-create-job mx-auto" >
                        <div className="row">
                            <div className="col-12 mb-4">
                                <h1>{jobDetails?.title?.rendered}</h1>
                                <span>{jobDetails?.acf?.jobs_institution}</span>
                                <br></br>
                                <span><FontAwesomeIcon icon={faLocationDot}/> {jobDetails?.acf?.jobs_city}, {jobDetails?.acf?.jobs_country}</span><span></span>
                                <br></br>
                                <hr></hr>
                            </div>
                        </div>
                        <h2 className="lead mb-4">Job Details</h2>

                        <div className="row mb-4">
                            <div className="col-lg-12 mb-4">
                                <span><strong>Office Location:</strong> {jobDetails?.acf?.jobs_address_line_2} - {jobDetails?.acf?.jobs_street_address}, {jobDetails?.acf?.jobs_city}, {jobDetails?.acf?.jobs_country}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Work Location:</strong> {jobDetails?.acf?.jobs_work_location}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Job type:</strong> {jobDetails?.acf?.jobs_job_type}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Benefits and Pay:</strong></span>
                                <p className="m-0">{jobDetails?.acf?.jobs_benefits}</p>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Job language requirements:</strong> {jobDetails?.acf?.jobs_languages}</span>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Job schedule:</strong> {jobDetails?.acf?.jobs_schedule}</span>                            
                            </div>
                            <div className="col-lg-12 mb-4">
                                <span><strong>Exptected start date:</strong> {DateToReadable(jobDetails?.acf?.jobs_exptected_start_date)}</span>
                            </div>
                        <hr></hr>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12 mb-4">
                                <p className="lead">Full job description</p>
                                <div dangerouslySetInnerHTML={{ __html: jobDetails?.acf?.jobs_description }} />
                            </div> 
                        <hr></hr>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12 mb-4">
                                <p className="lead"><strong>Instructions to apply</strong></p>
                                <div dangerouslySetInnerHTML={{ __html: jobDetails?.acf?.jobs_instructions_to_apply }} />
                            </div> 
                        <hr></hr>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12 mb-5">
                                <span><FontAwesomeIcon icon={faClock} /> <strong>Application deadline: </strong>{DateToReadable(jobDetails?.acf?.jobs_application_deadline)}</span>
                            </div> 
                        </div>
                        <Link to="/jobs"><button className="btn btn-info btn-lg">Back</button></Link>
                    </form>                 

                </div>
            </main>
    </>
        );
      } else {
        window.location.replace("/");
      }
};