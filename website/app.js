
/* Global Variables */
const myKey = '&appid=962db41af392a70f78320a106fa007f7';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'/'+ d.getDate()+'/'+ d.getFullYear();

// get the button generate
const btn = document.getElementById('generate');

/*
  - create event listner when click on button Generate
  - get the zip code from user
  - get textArea from user
  - call function getTemp that will return the temp from API
  - then after return that temp will send it to function postData with textArea
  - then will call function updateUI to retrieve all data and display it to the user.
 */
btn.addEventListener('click', function performSomething(event) {
    // get the zip code
    const zip = document.getElementById('zip').value;
    // get textArea
    const textArea = document.getElementById('feelings').value;

    getTemp(weatherURL, zip, myKey)
    .then(function(temp) {
        return saveData(temp, textArea);
    })
    .then(function(finalData) {
        updateUI(finalData);
    })
});


/* 
   - Create asynchronous function to fetch the data from the app endpoint
   - function will take the API URL and zip code from user input and the key of the API
   - after having the response from the API will get temp from API and return it
*/
const getTemp = async(weatherURL, zip, myKey) => {
    const response = await fetch(weatherURL + zip + "&units=metric" + myKey)
    try {
        const data = await response.json();
        const temp = data.main.temp;
        return temp;
    
    } catch(error) {
        console.log("error", error);
    }
} 

/*
    - create asynchronous function to that will save the date, temp and the content
    - this function will have POST method
    - the returned data will be in json formate
    - create response that will have the data that come from /getData route
    - return that data back in json formate and save it in variable retrieveData.
*/
const saveData = async(temp, textArea) => {
    await fetch('/saveData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            content: textArea
        }),

    });
    const response = await fetch('/getData');
    const retrieveData = await response.json()
    return retrieveData;
}

/*
    - create asynchronous function that will  update UI
    - this function will have all our data
    - will save the date, temp and content in the innerHTML
*/
const updateUI = async() => {
    const req = await fetch('/finalData');
    try {
        const finalData = await req.json();
        document.getElementById('date').innerHTML = "date: " + finalData.date;
        document.getElementById('temp').innerHTML = "temperature: " + finalData.temp;
        document.getElementById('content').innerHTML ="feeling: " + finalData.content;
    }catch(error) {
        console.log("error", error);
    }
}
