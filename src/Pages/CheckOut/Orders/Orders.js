import { async } from '@firebase/util';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../../Api/axiosPrivate';
import auth from '../../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth);
    const [order,setOrder] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const getOrders = async()=>{
            const email = user?.email;
            const url = `http://localhost:5000/order?email=${email}`;
            try{
                // const {data} = await axios.get(url,{
                //     headers:{
                //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
                //     }
                // });
                const {data} = await axiosPrivate.get(url);
                setOrder(data);
            }
            catch(error){
                console.log(error.message);
                if(error.response.status == 401 || error.response.status === 403){
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();
    },[])
    return (
        <div>
            <h2>All orders: {order.length}</h2>
        </div>
    );
};

export default Orders;