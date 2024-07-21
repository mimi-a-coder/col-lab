import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";



export default function subscriptionPlans() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if (userDetails != null) {
    return(
        <>
            <Navigation />
            <main className="subscription-plans mt-5">                  
                <div className="container">
                    <div className="row">            
                        <div className="col-lg-6"> 
                            <div className="text-center">
                                <h1> CHOOSE YOUR SUBSCRIPTION PLAN </h1>
                                <p> Monthly breakdown (Payment is in USD)</p>
                            </div> 
                            <div className="card mt-3">   
                                <div className="card-body">   
                                    <p> <strong> 1-MONTH PLAN </strong> </p>
                                    <div className="d-flex justify-content-between">
                                        <h2> $10 </h2>
                                        <p> $10/month </p>
                                        <p> Save 0% </p>
                                        <a href="#" className="btn btn-dark"> Get Plan </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="container">
                    <div className="row">            
                        <div className="col-lg-6"> 
                            <div className="card mt-3">   
                                <div className="card-body">   
                                    <p> <strong> 3-MONTH PLAN </strong> </p>
                                    <div className="d-flex justify-content-between">
                                        <h2> $30 </h2>
                                        <p> $10/month </p>
                                        <p> Save 0% </p>
                                        <a href="#" className="btn btn-dark"> Get Plan </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">            
                        <div className="col-lg-6"> 
                            <div className="card mt-3">   
                                <div className="card-body">   
                                    <p> <strong> 6-MONTH PLAN </strong> </p>
                                    <div className="d-flex justify-content-between">
                                        <h2> $45 </h2>
                                        <p> $7.50/month </p>
                                        <p> Save 25% </p>
                                        <a href="#" className="btn btn-dark"> Get Plan </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">            
                        <div className="col-lg-6"> 
                            <div className="card mt-3">   
                                <div className="card-body">   
                                    <p> <strong> 12-MONTH PLAN </strong> </p>
                                    <div className="d-flex justify-content-between">
                                        <h2> $60 </h2>
                                        <p> $5/month </p>
                                        <p> Save 50% </p>
                                        <a href="#" className="btn btn-dark"> Get Plan </a>
                                    </div>
                                </div>
                            </div>
                            <p> *Accounts are charged at the beginning of each calendar month </p>
                            <p> <u> Cancel my subscription </u> </p>
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

