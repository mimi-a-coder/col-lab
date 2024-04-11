import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import axios from 'axios';

export default function GetHelp() {
    const [ question, setQuestion ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ modalClass, setModalClass ] = useState('hide-modal');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/questions`)
        .then((response) =>{
            setQuestion(response.data)
        }).catch((err) =>{
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch()
      }, [])

    console.log(question);

    const returnQuestions = question.map((question, index) => {
        let userName = "";
        let userProfileImg = "";
        let questionPosted = Date.now() - new Date(question.date);
        let days = Math.floor(questionPosted/(86400 * 1000));

        for (let name of users) {
            if ( name.id == question.author) {
              userName = name.name;
              userProfileImg = name['avatar_urls']['24'];
            }
          }

        //Return count
    let count = localStorage.getItem(`comment_count${index}`);

    // Ensure that numberOfComments is initialized as an object
     let numberOfComments = [{ count: parseInt(count) }]; // Parse string to integer

     // Then you can update the count property
     numberOfComments[0].count = parseInt(count); // Parse string to integer
        if (search.length > 0 && question.title.rendered.toLowerCase().includes(`${search.toLowerCase()}`)) {
            console.log(question.title.rendered)
        return (
        <a href="#">
        <div className="card get-help-item mb-4">
            <div className="card-body">
                <div className="row">
                    <div className='col-lg-3 d-flex align-items-center'>
                        <div className='get-help'>
                            <img className="get-help-img mr-3" src={userProfileImg} />
                            <p><strong>{userName}</strong></p>
                        </div>
                    </div>
                    <div className='col-lg-5 d-flex align-items-center'>
                        <p>{question.title.rendered}</p>
                    </div>
                    <div className='col-lg-2 d-flex align-items-center justify-content-end'>
                        <p>{days == 0 ? "Posted today" : `${days}d ago`}</p>
                    </div>
                    <div className='col-lg-2 d-flex align-items-center justify-content-end'>
                        <p className="text-right">{numberOfComments[0].count} responses</p>
                    </div>
                </div>
            </div>
        </div>
        </a>
        )
        } 
        if (search.length == 0) {
        return (
            <a href="#">
            <div className="card get-help-item mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className='col-lg-3 d-flex align-items-center'>
                            <div className='get-help'>
                                <img className="get-help-img mr-3" src={userProfileImg} />
                                <p><strong>{userName}</strong></p>
                            </div>
                        </div>
                        <div className='col-lg-5 d-flex align-items-center'>
                            <p>{question.title.rendered}</p>
                        </div>
                        <div className='col-lg-2 d-flex align-items-center justify-content-end'>
                            <p>{days == 0 ? "Posted today" : `${days}d ago`}</p>
                        </div>
                        <div className='col-lg-2 d-flex align-items-center justify-content-end'>
                            <p className="text-right">{numberOfComments[0].count} responses</p>
                        </div>
                    </div>
                </div>
            </div>
            </a>
            )
        }
    })

    return (
        <>
            <Navigation />
            <div className="get-help mb-5">
                <div className='container primary'>
                    <div className='get-help-details'>
                        <div className="row">
                            <div className="col-lg-4">
                                <p><strong>See questions from your peers</strong></p>
                            </div>
                            <div className="col-lg-4">
                                <input type="search" className="form-control" placeholder='Start typing to search' value={search} onChange={(e) => {
                                    setSearch(e.target.value)
                                    console.log(search)
                                }} />
                            </div>
                            <div className="col-lg-4 text-end">
                                <a className="btn btn-info btn-lg" onClick={()=>{setModalClass("show-modal")}}>Ask a Question</a>
                            </div>
                        </div>
                    </div>
                    <hr className="mb-5"></hr>
                    {returnQuestions}
                </div>
            <div className={"modal"+" "+modalClass}>
                <div className="container" >
                    <div className="row">
                        <div className="col-12">
                            <form className="modal-popup">
                                <div className="modal-popup-icon">

<svg
   onClick={()=>{setModalClass("hide-modal")}}
   width="12.103323mm"
   height="12.105565mm"
   viewBox="0 0 12.103323 12.105565"
   version="1.1"
   id="svg1"
   xmlnsinkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlnssodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlnssvg="http://www.w3.org/2000/svg">
  <sodipodinamedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscapeshowpageshadow="2"
     inkscapepageopacity="0.0"
     inkscapepagecheckerboard="0"
     inkscapedeskcolor="#d1d1d1"
     inkscapedocument-units="mm" />
  <defs
     id="defs1" />
  <g
     inkscapelabel="Layer 1"
     inkscapegroupmode="layer"
     id="layer1"
     transform="translate(-6.9914114,-5.8580254)">
    <g
       id="g3"
       transform="translate(0.35406431,-0.60696738)">
      <rect
         
         id="rect2"
         width="3.4117243"
         height="10.152302"
         x="-1.5839893"
         y="12.740046"
         ry="0.35877365"
         rx="0"
         transform="rotate(-45)" />
      <rect
         
         id="rect2-7"
         width="3.4117243"
         height="10.152302"
         x="16.125717"
         y="-5.1964393"
         ry="0.35877365"
         rx="0"
         transform="rotate(45)" />
    </g>
  </g>
</svg>


                                </div>
                                <div className="row">
                                    <div className="col-12 mb-4">
                                        <p className="lead"><strong>Have a technical question? Ask your peers</strong></p>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <input className="form-control form-control-lg" type="text" aria-label='Question field' placeholder="Type your question briefly (150 characters max.)" required />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <textarea className="form-control form-control-lg" rows="10" placeholder='Give a detailed description of your question. Attach pictures if necessary.' required />
                                    </div>
                                    <div className="col-4 mb-4">
                                        <input className="form-control form-control-lg" type="file"/>
                                    </div>
                                </div>
                                <button className="btn btn-info" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}