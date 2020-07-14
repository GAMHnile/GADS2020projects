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

//Current activity div
const currentActivity = document.getElementById('s4-current-activity');

const currentActivityText = document.createElement('p');
//create image node for food
const foodImage = document.createElement('img');


//Set image on initial load
foodImage.setAttribute('src', 'https://miro.medium.com/max/2452/1*8YmyAEb3raC2gqj1AeVcvQ.png');
currentActivityText.innerHTML= "It's not meal time I'm probably coding";


const displayActivity =()=>{
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    
    const currentTime = `${h}:${m}`;
    
    switch(currentTime){
           case breakfastTime:
            foodImage.setAttribute('src', 'https://cdn.tasteatlas.com/images/dishes/b92a3d74b4cf48c28abba34197798049.jpg?w=600&h=450');
            currentActivityText.innerHTML="Breakfast time (ulcer stay away)"
            console.log("i'm in here bf");
           break;
           case lunchTime:
            foodImage.setAttribute('src', 'https://www.royacshop.com/wp-content/uploads/2019/08/How-to-Prepare-Nigerian-Urhobo-Owo-Soup-1.jpeg');
            currentActivityText.innerHTML="It's time for Lunch"
           break;
           case dinnerTime:
            foodImage.setAttribute('src', 'https://globaltableadventure.com/wp-content/uploads/2014/10/global.lunch_.for_.kids_.img_6785.jpg');
            currentActivityText.innerHTML="It's Dinner time"
           break;
            
        default:
            //15 minutes meal break
            setTimeout(
            ()=>{foodImage.setAttribute('src', 'https://miro.medium.com/max/2452/1*8YmyAEb3raC2gqj1AeVcvQ.png');
           currentActivityText.innerHTML= "It's not meal time I'm probably coding"; 
            }, 15*60*1000);
                
                
           } 
    
    currentActivity.appendChild(foodImage);
    currentActivity.appendChild(currentActivityText);
    
}
           
setInterval(displayActivity, 1000)




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

