# Interview Scheduler
This is a single-page app built on React.js that allows users to book, edit or cancel interviews for each day of the week (Monday to Friday).Keep track of the scheduled appointments easily than ever before.

## Setup

Single-page application built with modern React practices such as hooks and functional components.

Front-End: HTML, SCSS, React

Back-End: Node, Express, PostgreSQL


## Dependencies

React 16.9.0 or above
Axios
Classnames
Node.js
Express
Node-postgres


## Running Webpack Development Server

Install all dependencies (using the npm install command).
Download and install scheduler-api following the instructions on its repo.
Start the API server while in the "scheduler-api" directory using npm start.
Start the Webpack development server while in the "scheduler" directory using npm start. The app will be served at http://localhost:8000/. Enjoy!

## Running Jest Test Framework

This app was extensively tested using the following technologies:

Storybook for unit testing (npm run storybook)
Jest for unit and integration testing
Cypress for end to end testing

## How to Use Interview Scheduler app
Book an Interview
    Click on any available spot, enter the name of the interviewee and select an interviewer.
    If no spots are available, you can choose a different day on the left sidebar.

Edit an Interview
    Something changed? No problem.
    Simply hover over an appointment, click the edit button, do the changes, and hit save.

Delete an Interview
    Hover over an appointment and click the delete button.


## App Screenshots

!["Home Screen - Regular appointments"](https://github.com/padma2code/schedular/tree/master/Images/homescreen.png?raw=true)

!["Blank Student Name - Error"](https://github.com/padma2code/schedular/tree/master/Images/StudentNameBlankError.png?raw=true)

!["Delete Appointment - Confirmation Screen"](https://github.com/padma2code/schedular/tree/master/Images/DeleteConfirm.png?raw=true)