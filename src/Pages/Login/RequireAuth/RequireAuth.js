import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init'
import Loading from '../../Share/Loading/Loading';

const RequireAuth = ({children}) => {
    const [sendEmailVerification, sending, error] = useSendEmailVerification(
        auth
      );
const [user,loading] = useAuthState(auth);
const location = useLocation();
if(loading){
    return <Loading></Loading>
}
if(!user){
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
}
if(user.providerData[0]?.providerId=='password' && !user.emailVerified){
   return <div>
        <h3 className='text-danger'>Your Email Is not Verified</h3>
        <h5 className='text-success'>Please Verified</h5>
        <button
            onClick={async () => {
            const success = await sendEmailVerification();
            if (success) {
                alert('Sent email');
            }
            }}
        >
            Verify email
      </button>
   </div>
}
return children;
};

export default RequireAuth;