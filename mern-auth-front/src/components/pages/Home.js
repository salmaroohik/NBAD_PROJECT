import React, { useEffect,useContext } from "react";
import {useHistory,Link } from "react-router-dom";
import {BrowserRouter, Switch,Route} from "react-router-dom";   
import UserContext from "../../context/UserContext";

import Functions from "../layout/Functions";
import Dashboard from "../misc/DashBoard";

import "../../style.css";

export default function Home() {

  const { userData } = useContext(UserContext);
  const history=useHistory();
  useEffect(()=>{
    if(!userData.user) history.push("/login")
});

  return (
    <>
    <div className="page">
    {userData.user?(
    <>
    
        
        <Functions/>
        <Dashboard/>
        </>
      ) : (
        <>
          <h1>You are not logged in</h1>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
    </>
  );
}