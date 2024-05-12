import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';


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
                                <Link to="/" className="link-dark small d-flex align-items-center"><svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Home</Link><span className="breadcrumb-slash">/</span><Link className="link-dark small d-flex align-items-center" to="/jobs">Jobs</Link><span className="breadcrumb-slash">/</span><span className="small">{jobDetails?.title?.rendered}</span>
                            </div>
                        </div>
                    </div>
                    <form className="form-create-job mx-auto" >
                        <div className="row">
                            <div className="col-12 mb-4">
                                <h1>{jobDetails?.title?.rendered}</h1>
                                <span>{jobDetails?.acf?.jobs_institution}</span><br></br>
                                <span>{jobDetails?.acf?.jobs_work_location}</span>
                                <hr></hr>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <p className="lead">Job Details</p>
                                <div dangerouslySetInnerHTML={{ __html: jobDetails?.acf?.jobs_description }} />
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-lg-12 mb-4">
                            <p><strong>Job Type:</strong></p>
                            <input className="form-control form-control-lg" type="text" name="jobs_type"  value={jobDetails?.acf?.jobs_job_type} aria-label='Job Type' autoComplete='off' readOnly="true" />
                            </div>    
                        </div>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <p><strong>Benefits:</strong></p>
                                <input className="form-control form-control-lg" type="text" name="jobs_benefits" value={jobDetails?.acf?.jobs_benefits} aria-label='Job benefits' autoComplete='off' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <p><strong>Job language requirements:</strong></p>
                                <input className="form-control form-control-lg" type="text" name="jobs_languages"  value={jobDetails?.acf?.jobs_languages} aria-label='Job language requirements' autoComplete='off' readOnly="true" />
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-12 mb-4">
                                <p><strong>Job work location:</strong></p>
                                <input className="form-control form-control-lg" type="text" name="jobs_work_location"  value={jobDetails?.acf?.jobs_work_location} aria-label='Job work location' autoComplete='off'readOnly="true" />
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-12 mb-4">
                                <p><strong>Job schedule:</strong></p>
                                <input className="form-control form-control-lg" type="text" name="jobs_schedule"  value={jobDetails?.acf?.jobs_schedule} aria-label='Job schedule' autoComplete='off' readOnly="true" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <p><strong>Detail instructions to apply:</strong></p>
                                <div className="form-control form-control-lg job-detail-div" dangerouslySetInnerHTML={{ __html: jobDetails?.acf?.jobs_instructions_to_apply }} />
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <p><strong>Application deadline</strong></p>
                                <input name="jobs_application_deadline" value={DateToReadable(jobDetails?.acf?.jobs_application_deadline)} className="form-control form-control-lg" type="text" aria-label="Applicatiion deadline" autoComplete='off' readOnly="true" />   
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-12 mb-5">
                                <p><strong>Exptected start Date</strong></p>
                                <input name="jobs_exptected_start_date" value={DateToReadable(jobDetails?.acf?.jobs_exptected_start_date)} className="form-control form-control-lg" type="text" aria-label="Expected start date" autoComplete='off' readOnly="true" />   
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