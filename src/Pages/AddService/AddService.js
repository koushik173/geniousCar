import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

 
const AddService = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        const url = `http://localhost:5000/service` 
        fetch(url,{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(result=>{
            console.log(result);
            navigate('/home');
        })
        
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Please add service</h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Name' {...register("name", { required: true })} />
                <textarea className='mb-2' placeholder='Description' type='number' {...register("description")} />
                <input className='mb-2' placeholder='Price' type='text' {...register("price")} />
                <input className='mb-2' placeholder='Photo URL' type='text' {...register("img")} />

                {errors.exampleRequired && <span>This field is required</span>}
                
                <input className='btn btn-success' type="submit" value="Add Service"/>
            </form>
        </div>
    );
};

export default AddService;