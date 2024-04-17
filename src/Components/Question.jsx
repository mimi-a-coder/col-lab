import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import defaultImage from '../Images/5402435_account_profile_user_avatar_man_icon.svg';
import axios from "axios";

export default function Question() {
    const [ question, setQuestion ] = useState({}); 
    const [ comments, setComments ] = useState([]);
    const [getUsers, setGetUsers] = useState([]);
    const { param1 } = useParams();
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/questions/${param1}`)
        .then((response) => {
            setQuestion(response.data);
            console.log(question);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [comments])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/comments?post=${param1}`)
        .then((response) => {
            setComments(response.data);
            console.log(comments);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [comments])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users`)
        .then((response) => {
            setGetUsers(response.data);
            console.log(comments);
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
          // Parsing comments
          let count = localStorage.getItem(`comment_count${index}`);
          // Ensure that numberOfComments is initialized as an object
          let numberOfComments = [{ count: parseInt(count) }]; // Parse string to integer
          // Then you can update the count property
          numberOfComments[0].count = parseInt(count); // Parse string to integer


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
              <p>{question.content.rendered.substring(3).slice(0, -5)}</p>
            </div>
          </div>
          )
        }
      })

return (
    <>
        <Navigation />
        <div className="container primary questions">
            <div className="row mb-5">
                <div className="col-12">
                    <Link to="/get-help" className="link-dark"><svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Back</Link>
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
                                <p>{question.content && question.content.rendered.substring(3).slice(0, -5)}</p>
                                <button className="btn btn-info ml-auto">Answer</button>
                                </div>
                            </div>
                        </div>
                        <hr className="my-5"></hr>
                        <div classNames="question-comments">
                        {comments.length > 0 ? allComments : <p>No answers yet...answer this question.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)}
