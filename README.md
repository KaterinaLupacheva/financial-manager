# Financial Manager App

A simple app for keeping track of the cash flow with charts and pivot table.

## Technologies used

### Front-end

- [React.js](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [React Charts](https://github.com/jerairrest/react-chartjs-2)

### Back-end

- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Cloud Firestore](https://firebase.google.com/products/firestore)
- [Cloud Functions](https://firebase.google.com/products/functions)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)

## Run the app

1. Clone this repo
2. Add Firebase Configuration
    - copy/paste the configuration from your Firebase project's dashboard into .env file
    
    REACT_APP_API_KEY=xxx

    REACT_APP_AUTH_DOMAIN=xxx

    REACT_APP_DATABASE_URL=xxx

    REACT_APP_PROJECT_ID=xxx

    REACT_APP_STORAGE_BUCKET=xxx

    REACT_APP_MESSAGING_SENDER_ID=xxx
    
    REACT_APP_APP_ID=xxx

    REACT_APP_CONFIRMATION_EMAIL_REDIRECT=http://localhost:3000/month
3. Run ```npm install```
4. Run ```npm start```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).