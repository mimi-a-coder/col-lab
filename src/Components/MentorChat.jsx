import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';
import SendIcon from '../Images/send_icon.svg';

export default function MentorChat() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const { param1 } = useParams();
    const [ user, setUser ] =  useState({})
    const [ mentor, setMentor ] =  useState({})
    const [ mentee, setMentee ] =  useState({})
    const [ allMentorChats, setAllMentorChats ] =  useState([])
    const [ mentorChatDetails, setMentorChatDetails ] =  useState({})
    const [ comments, setComments ] =  useState([])
    const [ comment, setComment ] =  useState('')
    const Navigate = useNavigate();


    // Set user information
    useEffect(() => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/mentor-chats/${param1}`
            },
            {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                }
            }
        ).then((res) => {
            setMentorChatDetails(res.data)
        }).catch((err) => {
            console.log(err)
            Navigate('/mentorship-opportunities')
        })
    }, [param1])

    // Get all mentor chats
    useEffect(() => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/mentor-chats`
            },
            {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                }
            }
        ).then((res) => {
            setAllMentorChats(res.data)
        }).catch((err) => {
        })
    }, [])
    

    // Set mentor information
    useEffect(() => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users/${mentorChatDetails?.acf?.mentors_id}`
            },
            {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                }
            }
        ).then((res) => {
            setMentor(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [mentorChatDetails])

    // Set mentees information
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users/${mentorChatDetails?.acf?.mentee_id}`
        },
        {
            headers: {
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        ).then((res) => {
            setMentee(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [mentorChatDetails])

    // Set user information
    useEffect(() => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users/${userDetails?.id}`
            },
            {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`
                }
            }
        ).then((res) => {
            setUser(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [userDetails])

    // Get comments
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/comments?post=${param1}`)
        .then((response) => {
            setComments(response.data);
        })
        .catch((err) => {
            console.log(err)
        })
    })
 
        const SideBarChats = allMentorChats.map((mentorChat, index) => {
       

            console.log(mentorChat);
        
                // const singleMentor = {};
                // const singleMentee = {};

                // // Fetch mentee information
                // axios({
                //     method: 'GET',
                //     url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users/${mentorChat?.acf?.mentee_id}`,
                //     headers: {
                //         Authorization: `Bearer ${userDetails.token}`
                //     }
                // })
                // .then((res) => {
                //     singleMentee = res?.data;
                // })
                // .catch((err) => {
                //     console.log(err);
                // });
        
                // // Fetch mentor information
                // axios({
                //     method: 'GET',
                //     url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users/${mentorChat?.acf?.mentors_id}`,
                //     headers: {
                //         Authorization: `Bearer ${userDetails.token}`
                //     }
                // })
                // .then((res) => {
                //     singleMentor = res?.data;
                // })
                // .catch((err) => {
                //     console.log(err);
                // });     
                
                // console.log(singleMentor);
        
            return (
                <div className='mentor-chat-item' key={index}>
                    <div className='card'>
                        <div className='card-body'>
                            <img className='chat-item-header-img' src={user?.avatar_urls?.['48']} alt={user?.name} /> 
                        </div>
                    </div>
                </div>
            );
        });
    

    const conversation = comments.map((comment, index) => {
        var date = new Date(comment?.date);

        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        var humanReadableTime = date.toLocaleDateString('en-US', options);
        
        return (
            <div className={`chat ${comment?.author === userDetails?.id ? 'current-user-message' : 'other-user-message'}`} key={index}>
                <div className="card">
                    <div className='card-body'>
                        <div dangerouslySetInnerHTML={{ __html: `${comment?.content?.rendered}` }} />
                    </div>
                </div>
                <div className='image d-flex align-items-center'>
                    <span className='chat-date date'>{humanReadableTime}</span>
                    <img className='chat-img' src={ comment?.author_avatar_urls?.['48']} alt={comment?.author_name} /> 
                </div>
            </div>
        )
    })

    // Submit chat 
    function handleClick() {
        axios.post(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/comments`,
        {
          author: userDetails.id,
          author_email: userDetails.email,
          author_name: `${userDetails.firstName} ${userDetails.lastName}`,
          content: `${comment}`,
          post: `${param1}`,
          status: 'approved',
        },
        {
          headers: {
              Authorization: `Bearer ${userDetails.token}`
          }
        }
        ).then((response) => {
            setComment('');
        })
    }
if (userDetails !== null) {
    if (userDetails.id  !== mentorChatDetails?.acf?.mentors_id || userDetails.id  !== mentorChatDetails?.acf?.mentee_id) {
        return (
            <>
                <Navigation />
                <main className='mentors-chat'>
                    <div className="container-fluid primary">
                        <div className='row'>
                            <aside className='col-lg-3 mentors-chat-list p-0'>
                                <div className='mentors-chat-item-header'>
                                    <div className='row'>
                                        <div className="col-auto">
                                            <img className='chat-item-header-img' src={user?.avatar_urls?.['48']} alt={user?.name} /> 
                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>
                                <div className='mentors-chat-sidebar-body'>
                                    <div className='row'>
                                        {SideBarChats}
                                    </div>
                                </div>
                            </aside>
                            <div className='col-lg-9 mentors-chat-item p-0'>
                                <div className='mentors-chat-item-header'>
                                    <div className='row d-flex align-items-center'>
                                        <div className="col-auto">
                                            <img className='chat-item-header-img' src={userDetails.id === mentee.id ? mentor?.avatar_urls?.['48'] : mentee?.avatar_urls?.['48']} alt={ userDetails.id === mentee.id ? mentor?.name : mentee?.name} /> 
                                        </div>
                                        <div className="col-auto d-flex align-items-center">
                                            <div>
                                                <p className='m-0'><strong>{userDetails.id === mentee.id ? mentor?.name : mentee?.name} </strong></p>
                                                <p className='small m-0'>{userDetails.id === mentee.id ? mentor?.acf?.['user-job-title'] : mentee?.acf?.['user_mentor_current_position']} at {userDetails?.id === mentee.id ? mentor?.acf?.['user-job-Insitution'] : mentee?.acf?.['user_mentor_current_company']}</p>         
                                            </div>                       
                                        </div>
                                        {/* <div className="col-auto ml-auto">
                                            <Link className="btn btn-outline-info btn-lg" to={`/mentor/${mentor.id}`}>Back to mentor page</Link>
                                        </div> */}
                                    </div>
                                    <hr></hr>
                                </div>
                                <div className='mentors-chat-item-body'>
                                    {conversation}
                                </div>
                                <div className='mentors-chat-item-keyboard'>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-2'></div>
                                        <div className='col-8'>
                                            <form>
                                                <div className='send-chat'>                                                
                                                    <div className='send-chat-input'>
                                                        <input className="form-control form-control-lg chat-input" type="text" value={comment} onChange={(e) => {setComment(e.target.value)}} aria-label="Type a message" placeholder='Type a message' />
                                                    </div>
                                                    <div className='send-chat-icon' onClick={handleClick}>
                                                        <img className='send-icon' src={SendIcon} />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className='col-2'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    } else {
        window.location.replace('/mentorship-opportunities')
    }
} else {
    window.location.replace('/')
}
};