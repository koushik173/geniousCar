import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';
// import auth 
const ServiceDetail = () => {
    const {serviceId} = useParams();
    const navigate = useNavigate();
    const handleCheckOut=event=>{
        navigate(`/checkout/${serviceId}`);
    }
    const [service]= useServiceDetail(serviceId);
    return (
        <div>
            <h2>You are about book: {service.name}</h2>
            <Button onClick={handleCheckOut} className='btn btn-primary d-block mx-auto mt-5'> Check Out</Button>
        </div>
    );
};

export default ServiceDetail;