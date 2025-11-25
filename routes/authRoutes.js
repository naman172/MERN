const express = require("express");
const passport = require('passport');

const router = express.Router();

const User = require('../models/user');
const Board = require('../models/board');

router.post('/signUp', (req, res)=> {
    const { username, email, password } = req.body
    let boardOnDisplay = "";
    let collabReq = [];
    let newUser = new User({ email, username, boardOnDisplay, collabReq});
    User.register(newUser, password, (err, user)=>{
        if(err){
            console.error("Signup Error:", err);
            return res.send({msg:1})
        }
        
        passport.authenticate("local")(req, res, () => {
            if (err) {
                console.error("Authentication Error:", err);
                return res.send({ msg: 1 });
            }
            return res.send({ msg: 0 });   
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
            username: req.user.username,
            email: req.user.email
        }
    res.send(userInfo);
});

/*  use this route to check wether a user is logged-in 
    or not by the method as presented in the internet 
    post that you are following for simple MERN auth */ 
router.get('/user', (req, res, next) => {
    
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    
    if (req.user) {
        res.json({ user: req.user, msg:0})
    } else {
        res.json({ user: null, msg:1 })
    }
})

router.post('/signOut', async (req, res) => {
    console.log("=== SIGNOUT ROUTE HIT ===");
    console.log("User exists:", !!req.user);
    
    if (!req.user) {
        console.log("No user in session");
        return res.status(401).json({msg: 'no user to log out'});
    }

    try {
        // Clean up board if needed
        if (req.user.boardOnDisplay) {
            console.log("Clearing board...");
            await Board.findByIdAndUpdate(req.user.boardOnDisplay, {inUse: false});
        }

        // Clear user's boardOnDisplay
        console.log("Updating user...");
        await User.findByIdAndUpdate(req.user._id, {boardOnDisplay: ""});
    
        console.log("Logging out...");
        // Passport 0.4.1 - NO callback needed
        req.logout();
        
        console.log("Destroying session...");
        req.session.destroy((err) => {
            if (err) {
                console.log("Session destroy error:", err);
                return res.status(500).json({msg: "Logout failed"});
            }
            console.log("Sending response...");
            res.clearCookie('connect.sid');
            res.status(200).json({msg: 'logging out'});
        });
        
    } catch (error) {
        console.log("SignOut error:", error);
        res.status(500).json({msg: "Something went wrong"});
    }
});

module.exports = router;
