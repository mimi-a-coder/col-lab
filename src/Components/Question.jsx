import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Navigation from "./Navigation";
import defaultImage from '../Images/5402435_account_profile_user_avatar_man_icon.svg';
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";

export default function Question() {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [ question, setQuestion ] = useState({}); 
  const [ comments, setComments ] = useState([]);
  const [getUsers, setGetUsers] = useState([]);
  const [ modalClass, setModalClass ] = useState('hide');
  const { param1 } = useParams();
  const [ createComment, setCreateComment ] = useState('');
  const [ createCommentApi, setCreateCommentApi ] = useState('');
  let slug = "";

  useEffect(() => {
    axios({
        url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/comments`,
        method: 'POST',
        data: {
            author: userDetails.id,
            author_email: userDetails.email,
            author_name: `${userDetails.firstName} ${userDetails.lastName}`,
            content: `${createCommentApi}`,
            post: `${param1}`,
            status: 'approved',
        },
        headers: {
            Authorization: `Bearer ${userDetails.token}`
        }
    })
    .then(function(response) {
    })
    .catch(function(err) {
    })
}, [createCommentApi])
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/questions/${param1}`)
        .then((response) => {
          console.log(response.data)
            setQuestion(response.data);
            localStorage.setItem(`quesiton${param1}`, response.data.title.rendered.substring(0, 15));
            localStorage.setItem(`quesiton${param1}count`, response.data.title.rendered.length);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [comments])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/comments?post=${param1}`)
        .then((response) => {
            setComments(response.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [comments])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users`)
        .then((response) => {
            setGetUsers(response.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [comments])

    let userName = "";
    let userProfileImg = "";
    let userJobInsitution = "";

    let questionPosted = Date.now() - new Date(question.date);
    let days = Math.floor(questionPosted/(86400 * 1000));

    for (let name of getUsers) {
      if ( name.id == question.author) {
        userName = name.name;
        userProfileImg = name['avatar_urls']['48'];
        userJobInsitution = name['acf']['user-job-Insitution'];
      }
    }

    const allComments = comments.map((question, index) => {
        let userName = "";
        let userProfileImg = "";
        let userJobInsitution = "";

        let questionPosted = Date.now() - new Date(question.date);
        let days = Math.floor(questionPosted/(86400 * 1000));

        for (let name of getUsers) {
          if ( name.id == question.author) {
            userName = name.name;
            userProfileImg = name['avatar_urls']['48'];
            userJobInsitution = name['acf']['user-job-Insitution'];
          }
        }

        if (question.status === "approved") {

          return (
          <div className="card mb-4" key={index}>
            <div className='card-body'>
              <div className="questions-details">
                <div className="questions-details-name">
                  <img className="questions-details-name-img" src={userProfileImg ? userProfileImg : defaultImage} />
                  <div className="questions-details-name-info">
                    <p><strong>{userName}</strong></p>
                    <div className="questions-details-posted">
                      {userJobInsitution ?
                      (<div>
                        <p>{userJobInsitution}</p>
                      </div>) : ("")
                      }
                    <p>{days == 0 ? "Posted today" : `${days}d ago`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: question.content.rendered }} />
            </div>
          </div>
          )
        }
      })

    // Handle Change
    const handleChange = (e) => {
      setCreateComment(e.target.getContent())
    }

    // Handle submit
    function handleSubmit(e) {
      e.preventDefault();
      setCreateCommentApi(createComment);
      setCreateComment('')
  }

  if ( userDetails != null) {
return (
    <>
        <Navigation />
        <div className="container primary questions">
            <div className="row mb-5">
                <div className="col-12 d-flex">
                    <Link to="/" className="link-dark small d-flex align-items-center"><svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Home</Link><span className="breadcrumb-slash">/</span><Link to="/ask-questions" className="link-dark small">Ask Questions</Link><span className="breadcrumb-slash">/</span><span className="small">{localStorage.getItem(`quesiton${param1}`)}{localStorage.getItem(`quesiton${param1}count`) > 15 ? '...' : ''}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="question mx-auto">
                        <div className="question-item">
                        <div className="questions-details">
                            <div className="questions-details-name">
                            <img className="questions-details-name-img" src={userProfileImg ? userProfileImg : defaultImage} />
                            <div className="questions-details-name-info">
                                <p><strong>{userName}</strong></p>
                                <div className="questions-details-posted">
                                {userJobInsitution ?
                                (<div>
                                    <p>{userJobInsitution}</p>
                                </div>) : ("")
                                }
                                <p>{days == 0 ? "Posted today" : `${days}d ago`}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                            <div className="card">
                                <div className="card-body">
                                <p><strong>{question.title && question.title.rendered}</strong></p>
                                <p>{question.content && ( <div dangerouslySetInnerHTML={{ __html: question.content.rendered }} />)}</p>
                                {question.acf && 
                                <div className="question-image">
                                  <img class="question-image-item" src={question.acf.question_image} />
                                </div>}
                                <button className="btn btn-sm btn-outline-info ml-auto" onClick={()=>{setModalClass("show")}}>Answer</button>
                                </div>
                            </div>
                            <div className={"new-comment"+' '+"mt-3"+" "+modalClass}>
                                <div className="card">
                                  <div className="card-body question-box">
                                  <div className="modal-popup-icon question-icon-box">
                                    <svg
                                    onClick={()=>{ 
                                    setModalClass("hide")  
                                    }
                                    }
                                    className="question-icon"
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
                                    <p>Type your answer here</p>
                                </div>
                            
                                    <form onSubmit={handleSubmit}>
                                        <Editor
                                          apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                                          data-info="content"
                                          className="form-control form-control-lg" 
                                          init={{
                                            selector: 'textarea',
                                            palceholder: 'Type your answer. Use @ to mention users.',
                                            toolbar: 'undo redo | bold italic underline | superscript subscript | alignleft aligncenter alignright | bullist numlist',
                                          }}
                                          onChange={handleChange}
                                        />
                                      <div className="row">
                                        <div className="col-4 mt-4">
                                          <input className="form-control form-control-lg" type="file" />
                                        </div>
                                        <div className="col-8 text-end mt-4">
                                          <button className="btn btn-info" type="submit">Submit</button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <p className="small mt-5">See All Answers</p>
                        <hr className="mb-5"></hr>
                        <div className="question-comments">
                        {comments.length > 0 ? allComments : <p>No answers yet...answer this question.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
</>
)
      } else {
        window.location.replace("/");
      }
}
