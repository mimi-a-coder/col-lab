import React from 'react';
import Brand from '../Images/colLAB-logo.svg'

export default function Navigation() {
    return (
        <header>
            <div className="container-fluid primary">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-lg">
                            <a className="nav-brand" href="#"><img className="brand" src={Brand}/><h1><i>colLabb</i></h1></a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}