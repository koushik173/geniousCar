import React from 'react';
import expert1 from '../../../images/experts/expert-1.jpg'; 
import expert2 from '../../../images/experts/expert-2.jpg'; 
import expert3 from '../../../images/experts/expert-3.jpg'; 
import expert4 from '../../../images/experts/expert-4.jpg'; 
import expert5 from '../../../images/experts/expert-5.jpg'; 
import expert6 from '../../../images/experts/expert-6.png'; 
import PageTittle from '../../PageTittle/PageTittle';
import Expert from '../Expert/Expert';


const Experts = () => {
    const expert =[
        {id:1,name:'Jonson Marok', img:expert1},
        {id:2,name:'Elon Musk', img:expert2},
        {id:3,name:'Neymar Junior', img:expert3},
        {id:4,name:'Richarlison Junior', img:expert4},
        {id:5,name:'Vinicius Pasta', img:expert5},
        {id:6,name:'ALison Beckar', img:expert6}
    ];
    return (
        <div id='experts' className='container py-5'>
            <PageTittle title="Experts"></PageTittle>
            <h1 className='text-primary text-center '>Our Experts</h1>
            <div className="row">
            {
                expert.map(expt=>
                    <Expert
                        key={expt.id}
                        expert={expt}
                    ></Expert>
                )
            }
            </div>
        </div>
    );
};

export default Experts;