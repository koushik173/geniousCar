import axios from 'axios';
import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../../firebase.init';
import useToken from '../../../hooks/useToken';
import PageTittle from '../../PageTittle/PageTittle';
import Loading from '../../Share/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    <PageTittle title ="Login"></PageTittle>
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const [token] = useToken(user);
    if(token){
        navigate(from,{replace: true});
    }
    const handleSubmit= async event=>{
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email,password);
    }
    const forgetPassword=()=>{
        const email = emailRef.current.value;
        if(email){
            sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else{
            toast('Please Enter your Email',{autoClose: 500})
        }
    }
    if(loading || sending){
        return <Loading></Loading>
    }
    
    return (
        <div  className='container w-50 mx-auto mt-4'>
            <h2 className='text-primary'>Please Login!!</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required/>
                    
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password"  required/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
            <p className='mt-2' style={{color: 'red'}}>{error?.message}</p>
            <p> Forget Password ? <Link onClick={forgetPassword} className='text-primary text-decoration-none'>Reset Password!!</Link></p>
            <p> New to Genius car ? <Link to="/register" className='text-primary text-decoration-none'>Please register!!</Link></p>
            <SocialLogin></SocialLogin>
            
        </div>
    );
};

export default Login;