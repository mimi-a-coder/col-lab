import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function GetHelp() {
    const userAccountDetails = JSON.parse(localStorage.getItem('userDetails'));

    const [ question, setQuestion ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ modalClass, setModalClass ] = useState('hide-modal');
    const [ askQuestionStatus, setaskQuestionStatus ] = useState('not published');
    const [ askQuestion, setAskQuestion ] = useState({
        author: userAccountDetails.id,
        title: '',
        content: '',
    })
    const [ askQuestionApi, setAskQuestionApi ] = useState({
        author: userAccountDetails.id,
        title: '',
        content: '',
    })

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

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/questions`,
            method: 'POST',
            data: {
                author: userAccountDetails.id,
                title: askQuestionApi.title,
                content: askQuestionApi.content,
                excerpt: askQuestionApi.content,
                status: 'publish',
            },
            headers: {
                Authorization: `Bearer ${userAccountDetails.token}`
            }
        })
        .then(function(response) {
            console.log(response)
            setaskQuestionStatus(response.data.status);
        })
        .catch(function(err) {
            console.log(err);
        })
    }, [askQuestionApi])

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
        return (
        <a href="#" key={index}>
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
            <a href="#" key={index}>
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

    // Handle change
    function handleChange(e) {
        const {name, value} = e.target
        setAskQuestion(prev => {
            return (
                { ...prev, [name]: value}
            )
        })
    }

    // Handle submit
    function handleSubmit(e) {
        e.preventDefault();
        setAskQuestionApi({ ...askQuestion });
    }

    return (
        <>
            <Navigation />
            <div className="get-help mb-5">
                <div className='container primary'>
                    <div className='get-help-details'>
                        <div className="row mb-5">
                            <div className="col-12">
                            <Link to="/" className="link-dark"><svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Back</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <p><strong>See questions from your peers</strong></p>
                            </div>
                            <div className="col-lg-4">
                                <input type="search" className="form-control" placeholder='Start typing to search' value={search} onChange={(e) => {
                                    setSearch(e.target.value)
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
                            <form className="modal-popup" id="popup-form" onSubmit={handleSubmit}>
                                <div className="modal-popup-icon">
                                    <svg
                                    onClick={()=>{
                                    setaskQuestionStatus('not published')    
                                    setAskQuestionApi({
                                        author: userAccountDetails.id,
                                        title: '',
                                        content: '',
                                    })
                                    setAskQuestion({
                                        author: userAccountDetails.id,
                                        title: '',
                                        content: '',
                                    })
                                    setModalClass("hide-modal")}
                                    }
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
                                        <input className="form-control form-control-lg" type="text" name="title" disabled={ askQuestionApi.title.length > 0 ?? ''} value={askQuestion.title} onChange={handleChange} aria-label='Question field' placeholder="Type your question briefly (150 characters max.)" required />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <textarea className="form-control form-control-lg" rows="10" name="content" disabled={ askQuestionApi.title.length > 0 ?? ''} value={askQuestion.content} onChange={handleChange} aria-label="Questions" placeholder='Give a detailed description of your question. Attach pictures if necessary.' required />
                                    </div>
                                    <div className="col-4 mb-4">
                                        <input className="form-control form-control-lg" type="file"/>
                                    </div>
                                </div>
                                { askQuestionStatus === "publish" ? 
                                <div class="alert alert-success" role="alert">
                                    <p>Success! Your question has been published!</p>
                                </div>
                                : ''    
                                }
                                <button className="btn btn-info" disabled={ askQuestionApi.title ?? ''} type="submit">Submit</button>
                            </form>                 
                        </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}