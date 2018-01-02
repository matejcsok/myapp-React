const express = require('express');
const passport = require('passport');
const {User} = require('./user');

const routerApp = express();

// POST to /register
routerApp.post('/register', (req, res) => {
    // create a user object to save, using values from incoming JSON
    const newUser = new User(req.body);

//save, via passport's 'register' method, the user
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log('Shit happens', err);
            return res.send(err)
        }
        console.log(user);
        return res.send(JSON.stringify(user));
    });
});

// POST to /login
routerApp.post('/login', (req, res) => {
   passport.authenticate('local')(req, res, () => {
       // if logged in, we should have user info send back
       if (req.user) {
           console.log(req.user);
           return res.send(JSON.stringify(req.user));
       }

       // otherwise return an error
       return res.send(JSON.stringify({error: 'There was an error logging in'}))
   });
});

module.exports = routerApp;