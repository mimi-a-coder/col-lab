import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';

export default function MentorChat() {
    const { param1 } = useParams();
    console.log(param1);
    return (
        <>
            <Navigation />
            <div className='mentors-chat'>
            </div>
        </>
    )
};