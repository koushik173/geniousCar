import React, { useEffect, useState } from 'react';

const useServiceDetail = serviceId => {
    const [service, setServices] = useState({});
    useEffect(()=>{
        const url = `http://localhost:5000/service/${serviceId}` 

        fetch(url)
        .then(res=> res.json())
        .then(data => setServices(data));
    },[serviceId])
    return [service]
};

export default useServiceDetail;