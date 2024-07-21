import React, { useState, useEffect } from "react";
import receiveCashbag from '../Images/3209922_bag_drawn_earning_finance_hand_icon.svg';
import Navigation from "./Navigation";



export default function pointsCenter() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if (userDetails != null) {
    return(
        <>
            <Navigation />
            <main className="points-center mt-5">                  
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <img className="btn-main-icon d-block mx-auto" src={receiveCashbag} loading="lazy"/>
                            <h3 className="text-center">Earn discounts with our points system!</h3>
                            <table className="table table-bordered table-striped">
                                <caption>On <em>colLabb</em>, you can earn participation points which unlock great discounts on our subscription plans. Earn a 5% discount for every 250 points, for a maximum of 20% discount</caption>
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Action</th>
                                        <th scope="col">Points earned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Answer question</th>
                                        <td>2 points</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Lend item</th>
                                        <td>4 points</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Offer collaboration</th>
                                        <td>6 points</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Provide free mentorship</th>
                                        <td>6 points</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Teach a skill</th>
                                        <td>6 points</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Watch <a href=""> <u>ad</u> </a> to earn 1 free point</p>
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

