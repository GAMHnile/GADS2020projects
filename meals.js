//Clock
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('main-time').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

//variables for time to use in trigerring activity display
let breakfastTime = 0;
let lunchTime = 0;
let dinnerTime= 0;


const firstFunction= ()=>{
    if(!!Object.keys(localStorage).length){
    const deleteSelect = document.getElementById('delete-form_period');
    
    const mealView = document.getElementById('s5-added-meals');
    
    const mealTable = document.createElement('table');
    const mealTableHead = document.createElement('thead');
    
    //create table row and data for the table head
    const mealHeadRow = document.createElement('tr');
    
    const mealHeadFood = document.createElement('td');
    mealHeadFood.innerHTML= "Food"; 
    const mealHeadPeriod = document.createElement('td');
    mealHeadPeriod.innerHTML= "Period"; 
    const mealHeadTime = document.createElement('td');
    mealHeadTime.innerHTML= "Time"; 
    //Append the tablehead data to the table head
    mealHeadRow.appendChild(mealHeadPeriod);
    mealHeadRow.appendChild(mealHeadFood);
    mealHeadRow.appendChild(mealHeadTime);
    
    mealTableHead.appendChild(mealHeadRow);
    
    //The table body
    const mealTablebody = document.createElement('tbody');
     
    Object.keys(localStorage).forEach(period=>{
        //create options for delete section
        const deleteOption = document.createElement('option');
        deleteOption.setAttribute('value', period);
        const deleteOptionText = document.createTextNode(period)
        deleteOption.appendChild(deleteOptionText);
        deleteSelect.appendChild(deleteOption);
        
        
        
        mealJsonData = localStorage.getItem(period);
        mealData = JSON.parse(mealJsonData);
        const {meal, time} = mealData;
        //set time for meals in global variable
        if(period==='breakfast') breakfastTime = time;
        if(period==='lunch') lunchTime = time;
        if(period==='dinner') dinnerTime = time;
        
        
        
        //create tablebody to display meal selections
        const mealBodyRow = document.createElement('tr');
        
        const mealBodyFood = document.createElement('td');
        mealBodyFood.innerHTML= meal;
        mealBodyFood.setAttribute('data-label', 'Food');
        
        const mealBodyPeriod = document.createElement('td');
        mealBodyPeriod.innerHTML= period; 
        mealBodyPeriod.setAttribute('data-label', 'Period');
        
        const mealBodyTime = document.createElement('td');
        mealBodyTime.innerHTML= time; 
        mealBodyTime.setAttribute('data-label', 'Time');
        
        //Append the tablehead data to the table head
        mealBodyRow.appendChild(mealBodyPeriod);
        mealBodyRow.appendChild(mealBodyFood);
        mealBodyRow.appendChild(mealBodyTime);
        
        mealTablebody.appendChild(mealBodyRow);
        
        
    })
    
    
    mealTable.appendChild(mealTableHead);
    mealTable.appendChild(mealTablebody);
    mealTable.setAttribute('class', 'responsive-card-table unstriped');    
    
    mealView.appendChild(mealTable);
}

}

firstFunction();


const currentActivity = document.getElementById('s4-current-activity');


const displayActivity =()=>{
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    
    const currentTime = `${h}:${m}`;
    
    switch(currentTime){
           case breakfastTime:
            currentActivity.innerHTML="Breakfast time"
           break;
           case lunchTime:
            currentActivity.innerHTML="Lunch time"
           break;
           case dinnerTime:
            currentActivity.innerHTML="It's Dinner time"
           break;
            
        default:
           currentActivity.innerHTML= null; 
           
           
           }   
}
           
setInterval(displayActivity, 5000)




// Actions for Saving meals
document.querySelector("#save-form").addEventListener("submit", function(event) {
    //event.preventDefault();
    const period = document.getElementById('save-form_period').value;
    const mealName = document.getElementById('save-form_meal-name').value;
    const time = document.getElementById('save-form_time').value;
    
    const mealDetails = JSON.stringify({
        meal: mealName,
        time: time
    })
    
    window.localStorage.setItem(period, mealDetails)
    
    alert(`${period} saved`); 
    
}, false);


// Action for deleting meal
document.querySelector("#delete-form").addEventListener("submit", function(event) {

    
    const period = document.getElementById('delete-form_period').value;
    
    window.localStorage.removeItem(period)
     alert(`${period} deleted`); 
}, false);

