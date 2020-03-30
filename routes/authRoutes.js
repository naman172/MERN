const express = require("express");
const passport = require('passport');

const router = express.Router();

const User = require('../models/user');

router.post('/signUp', (req, res)=> {
    const { username, email, password } = req.body
    let boardOnDisplay = "";
    let newUser = new User({username, email, boardOnDisplay});
    User.register(newUser, password, (err, user)=>{
        if(err){
            console.log("err");
            console.log(err);
            return res.send({msg:"its not working"})
        }
        passport.authenticate("local")(req, res, ()=>{
            console.log("signed up");
            /*  the user has signed up and will have to login 
                to access our app at this point we don't need 
                to return or res.send anything, the display of
                successful signup message has to be taken care 
                of in the frontend */ 
        });
    });
});

router.post('/signIn', passport.authenticate("local") , (req, res)=>{
    
    /*  Now that the user has logged in we are sending back 
        the info of the current user along with the 
        session-cookie(not visible), so that the frontend 
        can tailor the app content according to the user and
        all further requests can be authenticated */
    let userInfo = {
            username: req.body.username,
            email: req.body.email
        }
    res.send(userInfo);
    
    });

/*  use this route to check wether a user is logged-in 
    or not by the method as presented in the internet 
    post that you are following for simple MERN auth */ 
    router.get('/user', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/signOut', (req, res)=>{
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router;
