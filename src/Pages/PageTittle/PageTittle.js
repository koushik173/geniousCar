import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTittle = (props) => {
    return (
        <Helmet>
             <title>{props.title} - Genius Car Service</title>
         </Helmet>
    );
};

export default PageTittle;