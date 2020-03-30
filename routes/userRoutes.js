const express = require("express");

const router = express.Router();

const User = require('../models/user');

router.get('/', isLoggedIn, async (req, res) => {
    const id = req.query.id;
    let user = await User.findById(id).populate('boards');
    console.log(user)
    if(user){
        console.log("here")
        res.json({boardList : user.boards})
    }
    else{
        res.json({boardList: null})
    }
})

router.put(`/board`, isLoggedIn, async (req, res) => {
    const {id, boardId} = req.body;
    let user = await User.findByIdAndUpdate(id, {boardOnDisplay: boardId} );
    if(user){       
        return res.status(201).send({
            error: false,
        })    
    }
    else{
        return res.status(404).send({
            error:true
        });
    }
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.send({
            error: false,
            message: "No user logged-in"
    })    
    }
}

module.exports = router;