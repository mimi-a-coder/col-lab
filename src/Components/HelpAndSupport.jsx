import React, { useState, useEffect } from "react";
import chatIcon from '../Images/chat.svg';
import Navigation from "./Navigation";



export default function helpAndSupport() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));


  if (userDetails != null) {
    return(
        <>
            <Navigation />
            <main className="help-and-support mt-5">                  
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <img className="btn-main-icon d-block mx-auto" src={chatIcon} loading="lazy"/>
                            <h2 className="text-center">Get in touch with us!</h2>
                            <form>
                                <div className="form-group">
                                    <input type="fullName" className="form-control" placeholder="Full name"/>
                                </div>
                                
                                <div className="form-group mt-4">
                                    <input type="emailAddress" className="form-control" placeholder="Email address"/>
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="purpose">Purpose</label>
                                        <select className="form-control form-select">
                                            <option default>Choose one</option>
                                            <option value="1">Ask question</option>
                                            <option value="2">Report a bug or technical issue</option>
                                            <option value="3">Report inappropriate conduct</option>
                                            <option value="4">Other</option>
                                        </select>
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="subject">Subject (max. 150 characters)</label>
                                    <input type="subject" className="form-control" placeholder="Please tell us briefly, why you are reaching out"/>
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="message">Message</label>
                                    <textarea className="form-control" rows="6" placeholder="Please provide further details so we can best help you"></textarea>
                                </div>
                                
                                <div className="mt-4 mb-4">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
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