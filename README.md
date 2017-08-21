# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #2[1]: EVENT HUB app


### Load app
To run the game hosted on Heroku: https://whispering-tundra-62056.herokuapp.com/.

----
### Installation

To download or clone repo please visit:
https://github.com/jasontrk/wdi-ldn-project-1.

Use ```yarn``` to install dependancies.

Run ```gulp``` to compile source code and run in browser.

---

### About the app

**EVENT HUB**
# ![](https://s3-eu-west-1.amazonaws.com/wdi27imageupload/Screen+Shot+2017-08-17+at+22.24.34.png)

The app is a basic event finding website. You can view events from various cities in England as well as save each event to your 'MyEvents' page. Users must log in to add event to their saved events. There is also a news feed which displays trending articles from MTV News. 

---

### Technlogies Used

* HTML 5
* SCSS
* JavaScript ES6
* jQuery 3.10
* Gulp
* Yarn
* Git & Github
* AJAX
* NodeJS
* Skiddle API
* MTV News API
* Express.JS
* Bcrypt
* MongoDB

---

### Challenges

Having only recently picked up RESTful Routing, I hadn't fully grasped the concept before starting this project. It took me quite some time to set up the project in the correct way and using the API to display the relevant info seemed daunting. Reading the documentation multiple times as well as going through similar stackoverflow queries really helped me to extract the information I needed.

A blocker I had was hiding event details on the page if a user ID wasn't present. I learnt learnt how to use a ternary operator. The way it worked was that if my comparison arguement is true then do the truthy arguement. If it is false, do the falsey arguement. 

This project has helped me to grasp the fundamentals of REST and how to read documentation for API application.
---

### Improvements

There are quite a few aspects of the app I'd like to improve. 

Readability of code:
* Refactoring
* Namespacing

To my app:
* Make it fully responsive for desktop and mobile. 
* Still needs a bit of CSS work on homepage and Login/Registration pages. 
* Display the date for each event on the MyEvents page.
* Stop duplication of saved events should a user try to save it twice
* Share event with friend
* Add FB oAuth Log-In
