import React, { useEffect, useState } from 'react';
import PageTittle from '../../PageTittle/PageTittle';
import Service from '../Service/Service';
import './Services.css'

const Services = () => {
    
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/service')
        .then(res=>res.json())
        .then(data=>setServices(data))

    },[])

    return (
        <div id='services' className='container'>
            <PageTittle title="Services"></PageTittle>
            <div className="row">
                <h1 className='services-title py-5'>Our Service</h1>
                <div className="services-container">
                    {
                        services.map(sv=> <Service
                        key={sv._id}
                        service={sv}>
                        </Service>)
                    }
                </div>
            </div>
        </div>
    );
};
export default Services;