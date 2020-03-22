const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();

const config = {
  apiKey: "AIzaSyBNKoeVsWj8akc-XhAoB67axhgseHqulAM",
  authDomain: "financial-manager-271220.firebaseapp.com",
  databaseURL: "https://financial-manager-271220.firebaseio.com",
  projectId: "financial-manager-271220",
  storageBucket: "financial-manager-271220.appspot.com",
  messagingSenderId: "198479107313",
  appId: "1:198479107313:web:b578dd8aacec5f19a10550"
};

const firebase = require("firebase");
firebase.initializeApp(config);

const db = admin.firestore();

app.get("/finances", (req, res) => {
  db.collection("finances")
    .orderBy("date", "desc")
    .get()
    .then(data => {
      let finances = [];
      data.forEach(doc => {
        finances.push({
          financeId: doc.id,
          sum: doc.data().sum,
          details: doc.data().details,
          category: doc.data().category,
          type: doc.data().type,
          date: doc.data().date
        });
      });
      return res.json(finances);
    })
    .catch(err => console.error(err));
});

const FBAuth = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      console.log(decodedToken);
      return db
        .collection("/users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      req.user.username = data.docs[0].data().username;
      return next();
    })
    .catch(err => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
};

app.post("/finance", FBAuth, (req, res) => {
  const newFinance = {
    date: new Date().toISOString(),
    sum: req.body.sum,
    details: req.body.details,
    category: req.body.category,
    type: req.body.type,
    username: req.user.username
  };

  db.collection("finances")
    .add(newFinance)
    .then(doc => {
      res.json({ message: `document ${doc.id} created` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

const isEmpty = string => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

//signup route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username
  };

  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(newUser.password)) {
    errors.password = "Must not be empty";
  }

  if (newUser.password !== newUser.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  if (isEmpty(newUser.username)) {
    errors.username = "Must not be empty";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  let token, userId;
  db.doc(`/users/${newUser.username}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ username: "this username is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ error: "Already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  let errors = {};

  if (isEmpty(user.email)) errors.email = "Must not be empty";
  if (isEmpty(user.password)) errors.password = "Must not be empty";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Wrong credentials. Please try again" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.region("europe-west2").https.onRequest(app);
