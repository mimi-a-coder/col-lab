import React from 'react';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import HandShake from '../Images/handshake-svgrepo-com.svg';
import Gethelp from '../Images/brainstorm-idea-svgrepo-com.svg';
import Teach from '../Images/teach-learn-tell-student-svgrepo-com.svg';
import Borrow from '../Images/receive-svgrepo-com.svg';
import Jobs from '../Images/jobs-open-svgrepo-com.svg';
import Interview from '../Images/interview-7-svgrepo-com.svg';

export default function Dashboard() {
  let tocken = localStorage.getItem('jwt');

  if (tocken != null) {
  return (
    <>
    <Navigation />
    <div className="dashboard">
      <Sidebar />
      <div className="container-fluid primary">
        <div className="row">
          
          <div className="col-lg-9">
            <div className="my-5">
              <h1>Foster scientific collaborations.</h1>
            </div>
            <div className="col">
              <div className="row">
                <div className='col-lg-4'>
                  <div className='dashboard-link'>
                    <div className="row">
                      <div className="col">
                        <p className="lead">Options</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button href="" className="btn-secondary">Option #1</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button href="" className="btn-secondary">Option #2</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button href="" className="btn-secondary">Option #3</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button href="" className="btn-secondary">Option #4</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button href="" className="btn-secondary">Option #5</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button href="" className="btn-secondary">Option #6</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button href="" className="btn-secondary">Option #7</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-8'>
                  <div className="dashboard-options">
                    <p className="lead">What would you like to do today?</p>
                    <div className='dashboard-options-buttons'>
                      <button className='btn-main'><img className="btn-main-icon" src={HandShake}/>Find Collaborations</button >
                      <button className='btn-main'><img className="btn-main-icon" src={Gethelp}/>Get Help</button>
                      <button className='btn-main'><img className="btn-main-icon" src={Teach}/>Mentorships</button>
                      <button className='btn-main'><img className="btn-main-icon" src={Borrow}/>Borrow Items</button>
                      <button className='btn-main'><img className="btn-main-icon" src={Jobs}/>Jobs</button>
                      <button className='btn-main'><img className="btn-main-icon" src={Interview}/>Mock Interviews</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3">
            <aside className="dashboard-tools">
            </aside>
          </div>

        </div>
      </div>
    </div>
    </>
  );
  } else {
    window.location.replace("/");
  }
}
