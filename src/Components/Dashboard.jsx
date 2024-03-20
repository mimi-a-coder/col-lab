import React from 'react';
import Navigation from './Navigation';
import HandShake from '../Images/handshake-svgrepo-com.svg';
import Gethelp from '../Images/brainstorm-idea-svgrepo-com.svg';
import Teach from '../Images/teach-learn-tell-student-svgrepo-com.svg';
import Borrow from '../Images/receive-svgrepo-com.svg';
import Jobs from '../Images/jobs-open-svgrepo-com.svg';
import Interview from '../Images/interview-7-svgrepo-com.svg';
import { userFirstName } from '../helper.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Dashboard() {
  let tocken = localStorage.getItem('jwt');

  if (tocken != null) {
  return (
    <>
    <Navigation />
    <div className="dashboard">
      <div className="container-fluid primary">
        <div className="row">
          
          <div className="col-lg-12">
            <div className="my-5">
              <h1>Welcome to <i>colLab</i>, a collaborative network for scientists!</h1>
            </div>
            <div className="col">
              <div className="row">
                <div className='col-lg-3'>
                  <div className='dashboard-user'>
                    <div className="row">
                      <div className="col">
                        <div className="dashboard-user-details">
                          <div className="dashboard-user-details-image">
                          </div>
                          <p>Hi, <strong>{ userFirstName(localStorage.getItem('user_name'))}</strong></p>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div className="dashboard-user-details-links">
                      <div className="link-item">
                        <p><strong>You’ve earned 50 pts</strong></p>
                      </div>
                      <div className="link-item">
                        <p>Notifications</p>
                        <a href="#">0</a>
                      </div>
                      <div className="link-item">
                        <p>New messages</p>
                        <a href="#">0</a>
                      </div>
                      <div className="link-item">
                        <p>Current collaborations</p>
                        <a href="#">0</a>
                      </div>
                      <div className="link-item">
                        <p>Current mentorships</p>
                        <a href="#">0</a>
                      </div>
                      <div className="dashboard-calender mt-3">
                        <p><strong>Scheduled meetings</strong></p>
                        <p className="small">*No interviews/meetings scheduled this week</p>
                      </div>
                      <div className="link-item">
                        <Calendar />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-5'>
                  <div className="dashboard-options">
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
                <div className="col-lg-4">
                  <div className="dashboard-tools">
                    <p><strong>See recent questions from your peers</strong></p>
                    <hr></hr>
                  </div>
                </div>
              </div>
            </div>
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
