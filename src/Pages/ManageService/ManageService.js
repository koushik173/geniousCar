import React from 'react';
import useServices from '../../hooks/useServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const ManageService = () => {
    const [services,setServices] = useServices();
    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure?');
            if(proceed){
                const url = `http://localhost:5000/service/${id}`
                fetch(url,{
                    method: 'DELETE'
                })
                .then(res=> res.json())
                .then(result=>{
                    const remain = services.filter(sv=> sv._id != id);
                    setServices(remain);
                    console.log(result);
                })
            }

    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Manage your services:</h2>
            {
                services.map(service=> <div key={service._id}>
                        <h4>{service.name} <button onClick={()=>handleDelete(service._id)} className='btn btn-primary'><FontAwesomeIcon icon={faTrashCanArrowUp}></FontAwesomeIcon></button></h4>
                </div>)
            }
        </div>
    );
};

export default ManageService;