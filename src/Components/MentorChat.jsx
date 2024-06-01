import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';

export default function MentorChat() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const { param1 } = useParams();
    const [ user, setUser ] =  useState()
    const [ mentor, setMentor ] =  useState()
    const [ allMentorChats, setAllMentorChats ] =  useState()
    const [ mentorChatDetails, setMentorChatDetails ] =  useState()

    console.log(userDetails);

    // Set user information
    useEffect(() => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/mentor-chats/${param1}`
            },
            {
                headers: {
                    Authorization: `Bearer ${userDetails.tocken}`
                }
            }
        ).then((res) => {
            setMentorChatDetails(res.data)
        }).catch((err) => {
            console.error(err)
        })
    }, [param1])

    // Set mentor information
    useEffect(() => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users/${mentorChatDetails?.acf?.mentors_id}`
            },
            {
                headers: {
                    Authorization: `Bearer ${userDetails.tocken}`
                }
            }
        ).then((res) => {
            setMentor(res.data)
        }).catch((err) => {
            console.error(err)
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
                    Authorization: `Bearer ${userDetails.tocken}`
                }
            }
        ).then((res) => {
            setUser(res.data)
        }).catch((err) => {
            console.error(err)
        })
    }, [userDetails])
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
                        </aside>
                        <div className='col-lg-9 mentors-chat-item p-0'>
                            <div className='mentors-chat-item-header'>
                                <div className='row'>
                                    <div className="col-auto">
                                        <img className='chat-item-header-img' src={mentor?.avatar_urls?.['48']} alt={mentor?.name} /> 
                                    </div>
                                    <div className="col-auto d-flex align-items-center">
                                        <div>
                                            <p className='m-0'><strong>{mentor?.name} </strong></p>
                                            <p className='small m-0'>{mentor?.acf?.['user_mentor_current_position']} at {mentor?.acf?.['user_mentor_current_company']}</p>         
                                        </div>                       
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                            <div className='mentors-chat-item-body'>

                            </div>
                            <div className='mentors-chat-item-keyboard'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-2'></div>
                                    <div className='col-8'>
                                        <from>
                                            <input className="form-control form-control-lg chat-input" type="text" aria-label="send message" />
                                        </from>
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
};