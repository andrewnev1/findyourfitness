/*import React, { Component } from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
    return (
        <div>
            <Route {...rest} render={(props)=>{
                if(auth) return <Component {...props} />
                if(!auth) return <Navigate to={{path : '/', state : {from :
                props.location}}} />
            }} />
        </div>
    );
} 

export default ProtectedRoute;*/