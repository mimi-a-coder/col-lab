import React, { useState } from 'react';
import Brand from '../Images/colLAB-logo.svg'

export default function Navigation() {
 
  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_name');
    window.location.replace('/');
  }

    return (
        <header>
            <div className="container-fluid primary">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-lg">
                            <a className="nav-brand" href="#"><img className="brand" src={Brand}/><h1><i>colLabb</i></h1></a>
                            <ul class="nav nav-pills">
                              <li class="nav-item">
                                <a class="nav-link active" href="#">Home</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#">About Us</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#">Contact Us</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#">Your Profile</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#" onClick={logout}>Logout</a>
                              </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}