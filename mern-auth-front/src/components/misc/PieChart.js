import React, { useState, useContext } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import { Bar,Line } from "react-chartjs-2";

export default function PieChart() {
   
    const [graph,setGraph] =useState();
    const [graphExp,setGraphExp] =useState();
    const [error, setError] = useState();
    
    const [budgetNames, setBudgetNames] = useState();
    const [budgetData, setBudgetData] = useState();
    const [expenseData, setExpenseData] = useState();


    var dataSource = {
        datasets: [
            {
                data: [],
                backgroundColor: ["#736AFF",
                "#0020C2",
                "#38ACEC",
                "#9b59b6",
                "#7FFFD4",
                "#728C00",
                "#52D017"
                ]
            }],
        labels: []
    };

    var dataSourceExp = {
      datasets: [
          {
              data: [],
              backgroundColor: ["#7D0541",
              "#C5908E",
              "#800517",
              "#FCDFFF",
              "#F778A1",
              "#e74c3c",
              "#E3319D"
              ]  
          }],
      labels: []
    };



    const submit = async (e) => {
        e.preventDefault();
        
        try {
            const token=localStorage.getItem("auth-token");
            
            axios.get('http://localhost:5500/budgets/all',{ headers: {
                'x-auth-token': `${token}`
              }})
            .then(res=>{
              let budNames = [];
              let budData = [];
                for (var i = 0; i < res.data.length; i++) {
                    dataSource.datasets[0].data[i] = res.data[i].budget;
                    dataSource.labels[i] = res.data[i].budgetName;
                    //dataSource.datasets[0].backgroundColor[i]='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                    budNames.push(res.data[i].budgetName);
                    budData.push(res.data[i].budget);
                }
                
                setBudgetData(budData);
                setBudgetNames(budNames);
                console.log(dataSource)
                if(res){
                    setGraph(true);
                    createChart();
                }
               
            }).catch(err=>{
              if (err.response) {
                err.response.data.msg&&setError(err.response.data.msg);
              }
            })
        
            function createChart() {
                var ctx = document.getElementById("myChart").getContext("2d");
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: dataSource,
                    options: {
                      title: {
                        display: true,
                        text: 'Budgets'
                      }
                    }
                });
            }



            axios.get('http://localhost:5500/expenses/all',{
                        headers: {
                          'x-auth-token': `${token}`
                        }
                    })
                  .then(res => {
                    let expData = [];
                    for (var i = 0; i < res.data.length; i++) {
                      expData.push(res.data[i].expense);
                      dataSourceExp.labels[i] = res.data[i].expenseName;
                      //dataSourceExp.datasets[0].backgroundColor[i]='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                      dataSourceExp.datasets[0].data[i] = res.data[i].expense;
                    }
                      //dataSourceExp.datasets[0].backgroundColor = dataSource.datasets[0].backgroundColor
                    setExpenseData(expData);
                  //console.log(data);
                  console.log(dataSourceExp)
                  if(res){
                    setGraphExp(true);
                    createChartExp();
                  } 
                  
                }).catch(err=>{
                  if (err.response) {
                    err.response.data.msg&&setError(err.response.data.msg);
                  }
                })

            function createChartExp() {
                  var ctx = document.getElementById("myChartExp").getContext("2d");
                  var myPieChart = new Chart(ctx, {
                      type: 'pie',
                      data: dataSourceExp,
                      options: {
                        title: {
                          display: true,
                          text: 'Expenses'
                        }
                      }
                  });
            }


          }catch (err) {
                      err.response.data.msg&&setError(err.response.data.msg);
          }

          };
          console.log("budget data: ", budgetData);
      return (

        <div>
        
        <form className="form" onSubmit={submit}>
            
            <input type="submit" value="Get Dashboard" />
            
        </form>
        

        {graph?(<><canvas id="myChart"></canvas></>):(<><h2>   </h2></>)}
        {graphExp?(<><canvas id="myChartExp"></canvas></>):(<><h2>Please click on Get Dashboard Button</h2></>)}
        {budgetData === undefined ?null:
        <>
        <Bar data={{
        labels: budgetNames,
        datasets: [
          {
            label: 'Budgets',
            backgroundColor: 'purple',
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            borderWidth: 1,
            data: budgetData,
          }
         
        ]
    }} 
            width={null}
            height={null}
            options={{
              responsive: true,
              scales: {
                yAxes: [{ticks: { beginAtZero: true}}]
              }
            }} 
            title="Personal Budget" redraw />

<Bar data={{
        labels: budgetNames,
        datasets: [
          {
            label: 'Expenses',
            backgroundColor: 'green',
            hoverBackgroundColor: 'rgba(155,231,91,0.4)',
            borderWidth: 1,
            data: expenseData,
          }
         
        ]
    }} 
            width={null}
            height={null}
            options={{
              responsive: true,
              scales: {
                yAxes: [{ticks: { beginAtZero: true}}]
              }
            }} 
            title="Personal Budget" redraw />






        <Line data={{
  labels: budgetNames,
  datasets: [
    {
      label: 'Budgets',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'purple',
      borderWidth: 2,
      data: budgetData,
    }
  ]
}} options={{
          responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }} title="Personal Budget"/>




<Line data={{
  labels: budgetNames,
  datasets: [
    
{
  label: 'Expenses',
  fill: false,
  lineTension: 0,
  backgroundColor: 'rgba(155,231,91,0.2)',
  borderColor: 'green',
  borderWidth: 2,
  data: expenseData,
}
  ]
}} options={{
          responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }} title="Personal Budget"/>





</>
}
        </div>
    )
}