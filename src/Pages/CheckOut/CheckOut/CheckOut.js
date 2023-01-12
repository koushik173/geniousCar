import React from 'react';
import { useState } from 'react';
import { Button, ToastContainer } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import auth from '../../../firebase.init';
import {useAuthState} from 'react-firebase-hooks/auth';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckOut = () => {
    const navigate = useNavigate();
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    // const [user,setUser] = useState({
    //     name: "Kamaleshar Gaura Hari",
    //     email: "kamaleshar@gmail.com",
    //     address: 'Vrindaban India',
    //     phone: '0172222222'
    // });

    // const handleAddressChange=event=>{
    //     console.log(event.target.value);
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     setUser(newUser);
    // }

    const handelPlaceOrder = event=>{
        event.preventDefault();
        const order ={
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            phone: event.target.phone.value,
            address: event.target.address.value
        }
        axios.post('http://localhost:5000/order', order)
        .then(response=>{
            const {data} = response;
            if(data.insertedId){
                alert('Your order is booked !!!');
                event.target.reset();
            }
        })
        
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Please Order: {service.name}</h1>
            
            <form onSubmit={handelPlaceOrder}>
                <input className='w-100 mb-3' type="text" value={user?.displayName} name='name' placeholder='Name' disabled readOnly required/> <br />
                <input className='w-100 mb-3' type="email" value={user?.email} name='email' placeholder='Email' disabled readOnly required/> <br />
                <input className='w-100 mb-3' type="text" value={service.name} name='service' disabled readOnly/> <br />
                <input className='w-100 mb-3' type="text" name='phone' placeholder='Phone' autoComplete='off' required/> <br />
                <input className='w-100 mb-3' type="text" name='address' placeholder='Address' autoComplete='off' required/> <br />
                
                <input className='btn btn-primary' type="submit" value='Place Order'/> <br />
            </form>
            <ToastContainer/>
        </div>
    );
};

export default CheckOut;