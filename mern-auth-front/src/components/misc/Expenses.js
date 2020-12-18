import React,{useEffect,useContext,useState} from 'react';
import {useHistory,Link} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Functions from "../layout/Functions"
import ErrorNotice from "./ErrorNotice";
import Axios from 'axios';


const SERVER_URL = require('../../config/config').SERVER_URL;

export default function Expense() {
    const [expenseName,setTitle] = useState();
    
    const [expense,setCost] = useState();
    const [error, setError] = useState();
    const {userData,setUserData} = useContext(UserContext);
    const history=useHistory();
    useEffect(()=>{
        if(!userData.user) history.push("/login")
    });
    const submit = async (e) => {
        e.preventDefault();
        
        try {
          const token=localStorage.getItem("auth-token");
          const newExpense={expense,expenseName};
          
          const response = await Axios.post(SERVER_URL+"/expenses",newExpense,{
            headers: {
              'x-auth-token': `${token}`
            }
          });
          
          if(response.status === 200)
          {
        
            var dropDown_title = document.getElementById("title");
            setTitle(undefined)
            dropDown_title.selectedIndex = "none";
            
            var dropDown_cost = document.getElementById("cost");
            setCost (undefined)
            dropDown_cost.value = "";
  
            alert("Expense added successfully");
          }


        } catch (err) {
            err.response.data.msg&&setError(err.response.data.msg);
        }
      };
    return (
        <>
        <div className="page">
            {userData.user?(
            <>
            <Functions/>
            <h1>Add Expense</h1>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined) }/>}
            <form className="form" onSubmit={submit}>

            <label htmlFor="title">ExpenseName</label>
            <select id="title" onChange={(e) => setTitle(e.target.value)}>
                <option value="none" selected disabled hidden> 
                choose expense
                </option> 
                <option value="DukeEnergy">DukeEnergy</option>
                <option value="Rent">Rent</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Grocery">Grocery</option>
                <option value="EatOut">EatOut</option>
                <option value="Recreation">Recreation</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>

            
            <label htmlFor="cost">Cost</label>
            <input id="cost" type="text"
            onChange={(e) => setCost(e.target.value)}
            />

            <input type="submit" value="Add Expense" />
      </form>

            </>
            ):
            (<>
                <h2>You are not logged in</h2>
                <Link to="/login">Log in</Link>
            </>
            )}
        </div>
    
        </>
    )
}