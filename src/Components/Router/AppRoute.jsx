import React from "react";
import { Route, Redirect } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";


const token  = localStorage.getItem('token');

let logged = false;
if(token!=null){
    logged = true;
}
const AppRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props =>
      (
        logged ?
        (<MainLayout path={props.match.path}>
          <Component {...props} />{" "}
        </MainLayout>)
        :
        (
            <Redirect to='/login' />
        )
      ) 
    }
  />
);

export default AppRoute;
