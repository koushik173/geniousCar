import React from 'react';
import glogo from '../../../images/glogo.png'
import flogo from '../../../images/flogo.png'
import gtlogo from '../../../images/gtlogo.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Share/Loading/Loading';
import useToken from '../../../hooks/useToken';

const SocialLogin = () => {
    const [signInWithGoogle,user,loading, error,] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1,loading1, error1,] = useSignInWithGithub(auth);

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const [token] = useToken(user || user1);
    if(user || user1){
        navigate(from,{replace: true});
    }
    if(token){
        return <Loading></Loading>
    }
    return (
        <div>
            
            <div className='d-flex align-item-center'>
                <div style={{height: '1px'}} className='bg-primary w-50'></div>
                <p className='orPosition'>or</p>
                <div style={{ height: '1px'}} className='bg-primary w-50'></div>
            </div>
            <div className=''>
                {
                    error || error1 && <p className='text-danger'>{error.message}</p>
                }
                <button onClick={()=>signInWithGoogle()} className='my-2 btn btn-primary d-block mx-auto w-50'> <img style={{width: '30px'}} src={glogo} alt="" /> <span className='mx-2'>Google SignIn</span></button>
               
                <button className='my-2 btn btn-primary d-block mx-auto w-50'> <img style={{width: '30px'}} src={flogo} alt="" /> <span className='mx-2'>Facebook SignIn</span></button>
                
                <button onClick={()=>signInWithGithub()} className='my-2 btn btn-primary d-block mx-auto w-50'> <img style={{width: '30px'}} src={gtlogo} alt="" /> <span className='mx-2'>Github SignIn</span></button>
                
            </div>

        </div>
    );
};

export default SocialLogin;