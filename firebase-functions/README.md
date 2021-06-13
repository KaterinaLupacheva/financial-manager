# Firebase Functions for Financial Manager App

## Deploy

1. Clone this repo
2. Add Firebase Configuration
    - create file in *functions/util/firebaseConfig.js

```js
module.exports = {
    apiKey: "XXX",
    authDomain: "XXX",
    databaseURL: "XXX",
    projectId: "XXX",
    storageBucket: "XXX",
    messagingSenderId: "XXX",
    appId: "XXX"
}
```

3. Deploy ```firebase deploy```
