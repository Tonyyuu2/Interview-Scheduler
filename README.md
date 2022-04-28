# Interview Scheduler App

*A single page application (SPA) built using the React JS framework.* 

*The data persisted on this application was done through an API server using PostgreSQL database. The client application communicates with the API server over HTTP, using JSON format.*

*The Jest and Cypress testing frameworks were used to unit test -> integration test -> end to end test.*

*The API server is not included in this project as per requirements set by Lighthouse Labs. I plan to deploy the application on Heroku and Netlify at a later date and implement the Heroku postgres for user data*

## Setup

Install dependencies with `npm install`.

**Downgrading node version to v10.16.1 might be necessary to run application**

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Application Behaviour

- Interviews can be booked between Monday and Friday.

- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.

- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.

- A user can cancel an existing interview.

- A user can edit the details of an existing interview.

- The list of days informs the user how many slots are available for each day.

- The expected day updates the number of spots available when an interview is booked or canceled.

- A user is presented with a confirmation when they attempt to cancel an interview.

- A user is shown an error if an interview cannot be saved or deleted.

- A user is shown a status indicator while asynchronous operations are in progress.

- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).

- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Technical Stack

- React JS
- Webpack
- Babel
- Axios
- Storybook
- Webpack Dev Server
- Jest
- Cypress
- Testing Library

# Screenshots

!["Application-Form"](https://github.com/Tonyyuu2/Interview-Scheduler/blob/master/docs/Application-form.png?raw=true)

!["Adding Own Data"](https://github.com/Tonyyuu2/Interview-Scheduler/blob/master/docs/Add%20own%20data.png?raw=true)