import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                            <ul className="nav nav-pills">
                              <li className="nav-item">
                                <Link className={window.location.href.includes("/dashboard") ? "nav-link active" : "nav-link" } to="/">Home</Link>
                              </li>
                              <li className="nav-item">
                                <Link className={window.location.href.includes("/profile") ? "nav-link active" : "nav-link" } to="/profile">Profile</Link>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" href="#" onClick={logout}>Logout</a>
                              </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}