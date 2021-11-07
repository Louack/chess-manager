import React from 'react';
import  { Link } from "react-router-dom"

const Registration = () => {
    return (
        <div className='registration'>
            Register here
            <Link className={'nav-link'} end to ="/login">
                Back to Login
            </Link>
        </div>
    );
};

export default Registration;