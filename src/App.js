import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="dashboard">
      <div className="container primary">
        <div className="row my-5">
          <div className="col-lg-12 d-flex justify-content-center">
            <h1>What would you like to do today?</h1>
          </div>
        </div>
        <div className="row d-flex justify-content-center ">
          <div className="col d-flex justify-content-center">
            <div className='dashboard-buttons'>
              <button className='btn btn-primary btn-color-1'>Find Collaborations</button >
              <button className='btn btn-primary btn-color-5'>Get Help</button>
              <button className='btn btn-primary btn-color-6'>Mentorships</button>
              <button className='btn btn-primary btn-color-4'>Borrow Items</button>
              <button className='btn btn-primary btn-color-2'>Jobs</button>
              <button className='btn btn-primary btn-color-3'>Mock Interviews</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
