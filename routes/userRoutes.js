const express = require("express");

const router = express.Router();

const User = require('../models/user');
const Board = require('../models/board')

router.get('/', isLoggedIn, async (req, res) => {
    const id = req.query.id;
    let user = await User.findById(id).populate('boards');
    if(user){
        res.json({boardList : user.boards})
    }
    else{
        res.json({boardList: null})
    }
})

router.put(`/board`, isLoggedIn, async (req, res) => {
    const {id, boardId, prevBoardId} = req.body;

    let user = await User.findByIdAndUpdate(id, {boardOnDisplay: boardId} );
    if(user){

            if(prevBoardId){
                let prevBoard = await Board.findByIdAndUpdate(prevBoardId, {inUse: false});
            }
            
            if(boardId!=""){
                let board = await Board.findByIdAndUpdate(boardId, {inUse: true});
            }
     
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

router.post('/collab', isLoggedIn, async (req, res) => {
    const {username, email, boardId, title, recipient} = req.body;
    let board = await Board.findById(boardId);
    let preUser = board.users.find((user)=>{
        return (user.email === recipient)
    })
    if(!preUser){
        let user = await User.findOneAndUpdate({email: recipient},  {$push: {collabReq: {$each: [{username, email, boardId, title}]}}}, { new: true });

        if(user){
            return res.status(202).send({
                error: false,
                msg:"Collaboration request was sent successfully"
            })
        }
        else{
            return res.status(404).send({
                error: true,
                msg:"user not found"
            })
        }
    }
    else{
        return res.send({
            error: true,
            msg: "This user already has access to the current board"
        })
    }
    
})

router.put('/collabAccept', isLoggedIn, async (req, res) => {
    const {id, boardId} = req.body;
    let user = await User.findByIdAndUpdate(id, {$pull: {collabReq: {boardId}}}, {new: true});
    let board = await Board.findById(boardId);
    if(user && board){
        board.users.push({username: user.username, email: user.email});
        board.save();
        user.boards.push(board);
        user.save();
        return res.status(202).send({
            error: false,
            msg:"Collaboration request accepted"
        })
    }
    else{
        return res.status(404).send({
            error: true,
            msg:"Something went wrong"
        })
    }
})

router.put('/collabDeny', isLoggedIn, async (req, res) => {
    const {id, boardId} = req.body;
    let user = await User.findByIdAndUpdate(id, {$pull: {collabReq: {boardId}}}, {new: true});
    if(user){
        return res.status(202).send({
            error: false,
            msg:"Collaboration request rejected"
        })
    }
    else{
        return res.status(404).send({
            error: true,
            msg:"Something went wrong"
        })
    }
})

router.get('/collab', isLoggedIn, async (req, res) => {
    const id = req.query.id;
    let user = await User.findById(id);
    if(user){
        res.json({collabs : user.collabReq})
    }
    else{
        res.json({collabs: []})
    }
})

router.delete('/collab', isLoggedIn, async (req, res) => {
    const {email, boardId} = req.query;
    let user = await User.findOneAndUpdate({email}, {$pull: {boards: boardId}}, {new: true});
    let board = await Board.findByIdAndUpdate(boardId, {$pull: {users: {email: user.email}}}, {new:true});

    if(user && board){
        return res.status(202).send({
            error: false,
            msg:"User's access to this board has been blocked successfully."
        })
    }
    else{
        return res.status(404).send({
            error: true,
            msg:"user not found"
        })
    }
})

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