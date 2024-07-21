import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";



export default function plansAndPricing() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if (userDetails != null) {
    return(
        <>
            <Navigation />
            <main className="plans-pricing mt-5">
                <div className="container">
                    <h1 className="text-center"> <em> colLabb </em> Pricing Features </h1>
                    <div className="row">            
                        <div className="col-lg-6"> 
                            <div className="card mt-4">   
                                <div className="card-body">   
                                    <div className="text-center">
                                        <p> <strong> FREE </strong> </p>
                                        <h1> $0 </h1>
                                        <p> PER MONTH </p>  
                                    </div>            
                                    <hr></hr>
                                    <div>
                                        <p> Free Features: </p>
                                        <ul className="list-unstyled">
                                            <li> <strong> Unlimited </strong> access to collaboration opportunities </li>
                                            <li> Limit of <strong> 15 </strong> collaboration requests </li>
                                            <li> Ask <strong> unlimited </strong> number of questions </li>
                                            <li> Limit of <strong> 5 </strong> job postings </li>
                                            <li> <strong> Limited </strong> access to job postings </li>
                                            <li> Limit of <strong> 15 </strong> borrow requests </li>
                                            <li> <strong> Unlimited </strong> access to borrow requests </li>
                                            <li> <strong> Unlimited </strong> access to mentorships </li>
                                            <li> <strong> Unlimited </strong> access to learning center </li>
                                            <li> <strong> $2.50 </strong> connection fee per service transaction </li>
                                        </ul>
                                    </div>
                                    <div className="text-center">
                                        <a href="#" className="btn btn-dark"> Get Free </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6"> 
                            <div className="card mt-4">   
                                <div className="card-body">   
                                    <div>
                                        <p className="text-center"> <strong> PREMIUM </strong> </p>
                                        <div> <span> Starting at </span> <h1 className="text-center"> <strong> $5 </strong> </h1> 
                                        </div>
                                        <p className="text-center"> PER MONTH </p>  
                                    </div>            
                                    <hr></hr>
                                    <div>
                                        <p> Premium Features: </p>
                                        <ul className="list-unstyled">
                                            <li> <strong> Unlimited </strong> access to collaboration opportunities </li>
                                            <li> <strong> Unlimited </strong> collaboration requests </li>
                                            <li> Ask <strong> unlimited </strong> number of questions </li>
                                            <li> <strong> Unlimited </strong> job postings </li>
                                            <li> <strong> Unlimited </strong> access to job postings </li>
                                            <li> <strong> Unlimited </strong> borrow requests </li>
                                            <li> <strong> Unlimited </strong> access to borrow requests </li>
                                            <li> <strong> Unlimited </strong> access to mentorships </li>
                                            <li> <strong> Unlimited </strong> access to learning center </li>
                                            <li> <strong> $0 </strong> connection fee per service transaction </li>
                                        </ul>
                                    </div>
                                    <div className="text-center">
                                        <a href="#" className="btn btn-dark"> Get Premium </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
        );
      } else {
        window.location.replace("/");
      }
};

