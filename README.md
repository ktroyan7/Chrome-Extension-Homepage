# Chrome Extension Homepage

## Table of Contents

- [Features](#features)
  - [Video Demo](#video-demo)
  - [Screenshots](#screenshots)
- [Overview](#overview)
- [Project Files](#project-files)

## Features:
1. This app can be added as a Chrome Extension so be the default homepage when you open a new tab or window.
2. It displays the current weather and location based on your location.
3. It shows the current time and a quote in the center of the page.
4. There is a collapsible "to-do" list that can save your tasks and saved in local storage.
5. Finally, there is a news search bar to search for news articles from the NYT.

### Video Demo:

### Screenshots:

Main Screen:
<img width="1432" alt="Homepage" src="https://github.com/ktroyan7/Chrome-Extension-Homepage/assets/108959100/5f8d970c-e3e3-4c36-a460-d62853359d72">
Main Screen with To-Do List:
<img width="1432" alt="To-Do_List" src="https://github.com/ktroyan7/Chrome-Extension-Homepage/assets/108959100/029c1498-000a-4977-9565-ffa2f7746b1d">
News Section:
<img width="1414" alt="News" src="https://github.com/ktroyan7/Chrome-Extension-Homepage/assets/108959100/3cc5858c-23b7-4416-9250-2538186b233f">




## Overview:
I decided to build a Chrome Extension similar to the Momentum Chrome Extension. I am interested in working with APIs and building different web applications using APIs and I thought this was a great place to start. I knew that if I got stuck, I would be able to find solutions since the features of the extension are common (Quote APIs, Weather APIs, To-Do Lists, News APIs). 

I first decided what features I wanted and began to build out the different files for connecting to the APIs. I listed out how I built each file below. 

It was very interesting learning about how to fetch the API data and I used a lot of console.log() to test if each step of the process was working. 

After completing the project I now know I need to work on learning more CSS to help with styling. This project was also built with vanilla Javascript so I would be interested in building it using a framework like React.

## Project Files:

Listed below are all the files in the project as well as descriptions for what each file does.

### manifest.json:
This is the json file required to add a browser extension. I looked up how to create one for Chrome, which also worked on the Brave browser. The most important parts are the permissions and overrides. The permissions need access to "geolocation" and "storage" for the weather.js and todo.js files. The overrides need access to use my index.html file when a new tab is opened.

### index.html:
The index.html file is used to override the current homepage with the layout I created. It's an HTML file that links to any JS files needed and mostly uses IDs for the CSS file.

### style.css:
The style.css holds all the CSS styling that was done to the homepage and different JS files.

### background-image.js:
Used style backgroundImage property (https://www.w3schools.com/jsref/prop_style_backgroundimage.asp) to add a new background from this background image API (https://picsum.photos/2560/1600)

### quote.js:
I used the JS fetch() to call the API. Then returned the json file and returned the data. I set the default quote as "Carpe Diem" and then created quoteText and quoteAuthor. I used optional chaining to make sure there were no null or undefinded. I then used newQuote to check if quoteText was true to use the quote and author, otherwise, used defaultQuote. I then used getElementById to set the innerHTML to the newQuote.

### search.js:
I added a search box at the bottom of the homepage so users can search for news. I originally wanted this to be from a news aggregator but the APIs would not allow calls from a browser. I finally found the New York Times offered a free API without needing a credit card. So once you search for a topic, news articles are listed below and centered via a responsive grid.

I added an eventListener to the search box to call the retrieve function when submitted. I used fetch to call the NYT API and return a JSON response. I then used a for loop to loop through the length of the news responses and list all the information in the innerHTML of the output div. I added the title, snippet, and image. Plus did a little CSS styling to the output.

I also created a function to clear the search list if another search was submitted.

### time.js:
For the time.js, I created the function getTime. First, it formatted the time by adding a zero anytime there was a single digit. Then it grabs the date, hour, minute, and second. Then it formats the time and adds it to the inner HTML of the time div. It then runs the getTime function every second to keep the time current.

### todo.js:
The first section of code references the todo-list, input field, and add button. The second section retrieves the tasks from storage and updates the to-do list by calling the updateTodoList function. The addNewTask function gets the value of the input field, clears the input field, retrieves the current tasks from storage, adds the new task to the tasks array, and saves the updated tasks array to storage. It also calls the updateTodoList function to update the to-do list. The next block of code adds a click event listener to the add button that calls the addNewTask function when the button is clicked. It also adds an event listener to the input field that calls the addNewTask function when the user presses the Enter key. The updateTodoList function clears the to-do list element and creates a div element for each task. It also adds a delete button to each task element and adds an event listener to the delete button that removes the task from the tasks array and updates the to-do list. The final block of code adds an event listener to Chrome's storage that updates the to-do list when the tasks in storage change. The last block of code adds an event listener to the to-do list that toggles the visibility of an element with the ID "card" when the to-do list is clicked.

### weather.js:
The first block of code sets default values for the latitude and longitude of the location. It also defines some constants for the image URL, API URL, and the API key. The setExtensionWeather function sets the content of some HTML elements on the page to the values of the arguments passed to the function. These elements include the location name, temperature, weather description, and country. It also sets the src attribute of an element with the ID "weather-icon" to the URL of an icon that represents the current weather. The getWeatherLocation function makes a request to the weather API using the latitude and longitude of the location. It then extracts the required data from the API response and calls the setExtensionWeather function to set the weather on the page. The next block of code checks whether the browser supports the geolocation API. If it does, it invokes the getCurrentPosition function to get the user's current location. If the user's location is successfully obtained, the latitude and longitude are updated and the getWeatherLocation function is called with the position object as an argument. If there is an error getting the user's location, the getWeatherLocation function is called with no argument. If the browser does not support the geolocation API, an error message is displayed and the getWeatherLocation function is called with no argument. This will use the default latitude and longitude values to get the weather for the default location.
