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
                        <div className="col-lg-6 mx-auto"> 
                            <div className="text-center">
                                <h1> CHOOSE YOUR SUBSCRIPTION PLAN </h1>
                                <p> Monthly breakdown (Payment is in USD)</p>
                            </div> 
                            <div className="card mt-3">   
                                <div className="card-body">   
                                    <p> <strong> 1-MONTH PLAN </strong> </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                            <h2 className="p-0 m-0"> $10 </h2>
                                            <p className="p-0 m-0"> $10/month </p>
                                            <p className="p-0 m-0"> Save 0% </p>
                                            <div className="col-lg-3">
                                                <a href="#" className="btn btn-dark"> Get Plan </a>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="container">
                    <div className="row">            
                        <div className="col-lg-6 mx-auto"> 
                            <div className="card mt-3">   
                                <div className="card-body">   
                                    <p> <strong> 3-MONTH PLAN </strong> </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2 className="p-0 m-0"> $30 </h2>
                                        <p className="p-0 m-0"> $10/month </p>
                                        <p className="p-0 m-0"> Save 0% </p>
                                        <div className="col-lg-3">
                                            <a href="#" className="btn btn-dark"> Get Plan </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">            
                        <div className="col-lg-6 mx-auto"> 
                            <div className="card mt-3">   
                                <div className="card-body">   
                                    <p> <strong> 6-MONTH PLAN </strong> </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2 className="p-0 m-0"> $45 </h2>
                                        <p className="p-0 m-0"> $7.50/month </p>
                                        <p className="p-0 m-0"> Save 25% </p>
                                        <div className="col-lg-3">
                                            <a href="#" className="btn btn-dark"> Get Plan </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">            
                        <div className="col-lg-6 mx-auto"> 
                            <div className="card mt-3">   
                                <div className="card-body">   
                                    <p> <strong> 12-MONTH PLAN </strong> </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2 className="p-0 m-0"> $60 </h2>
                                        <p className="p-0 m-0"> $5/month </p>
                                        <p className="p-0 m-0"> Save 50% </p>
                                        <div className="col-lg-3">
                                            <a href="#" className="btn btn-dark"> Get Plan </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p> *Accounts are charged at the beginning of each calendar month. Cancel anytime for a 50% refund on your current balance (minus taxes) </p>
                            <p> <a href=""> <u>Cancel my subscription</u> </a> </p>
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

