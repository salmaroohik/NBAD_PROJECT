import React from 'react';
import {Link} from "react-router-dom";


export default function SecondHeader() {
    
  
    return (
        <div>
          <header id ="sheader">
              
           <Link class="button" to="/budget">1) Add Personal Budget  </Link>
        
            <Link class="button" to="/expense">2) Add Personal Expense    </Link>
            <Link class='dashboard' to = "/">3) View Dashboard</Link>
          </header>
        </div>
    ) 
}