import React from 'react';
import  { Link } from "react-router-dom"

const Login = () => {
    return (
        <div>
            <div className='login'>
            login here
            <Link className={'nav-link'} end to ="/register">
                Register
            </Link>
        </div>
        </div>
    );
};

export default Login;