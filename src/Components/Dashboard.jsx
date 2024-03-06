import React from 'react';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

export default function Dashboard() {
  return (
    <>
    <Navigation />
    <div className="dashboard">
      <Sidebar />
      <div className="container-fluid primary">
        <div className="row">
          
          <div className="col-lg-9">
            <div className="my-5">
              <h1>Foster scientific collaborations across different institutions.</h1>
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
                      <button className='btn-main'>Find Collaborations</button >
                      <button className='btn-main'>Get Help</button>
                      <button className='btn-main'>Mentorships</button>
                      <button className='btn-main'>Borrow Items</button>
                      <button className='btn-main'>Jobs</button>
                      <button className='btn-main'>Mock Interviews</button>
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
}
