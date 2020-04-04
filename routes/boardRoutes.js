const express = require("express");

const router = express.Router();

const User = require('../models/user');
const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

router.get('/', isLoggedIn, async (req, res) => {
    const id = req.query.id;

    if(id!==""){
        let boardInfo = await Board.findById(id).populate({ 
            path: 'lists',
            populate: {
              path: 'cards',
              model: 'Card'
            } 
         });
    
        if(boardInfo){
            return res.json({boardInfo});
        }
        else{
            return res.json({boardInfo: null});
        }
    }
    else{
        return res.json({boardInfo: null});
    }
    
    
});

router.post(`/`, isLoggedIn, async (req, res) => {
    let {title, id, email, boardId} = req.body;
    let newBoard = await Board.create({
        title,
        owner: {id, email},
        users: [],
        inUse: true
    });

    if(boardId){
        let prevBoard = await Board.findByIdAndUpdate(boardId, {inUse: false});
    }

    if(newBoard){
        let user = await User.findById(id) 
        if(user){
            newBoard.users.push({username: user.username, email: user.email});
            newBoard.save();
            user.boards.push(newBoard);
            user.save();
            return res.status(201).send({
                error: false,
                newBoard
            })
        }
        else{
            return res.status(404).send({
                error:true
            });
        }       
    }
})

router.delete(`/`, isLoggedIn, async (req, res) => {
    const {id} = req.query;

    let board = await Board.findById(id).populate("lists");

    if(board){    
        board.users.forEach(user => {
            User.findOneAndUpdate({email: user.email}, {$pull: {boards:id}}, { new: true })
                .catch((err)=>{
                    return res.status(401).send({
                        error:true
                    });
                })
        })

        board.lists.forEach(list => {
            list.cards.forEach(card=>{

                Card.findByIdAndDelete(card)
                    .catch((err)=>{
                        return res.status(401).send({
                            error:true
                        });
                    });
            
            })

            List.findByIdAndDelete(list._id)
                .catch((err)=>{
                    return res.status(401).send({
                        error:true
                    });
                });
        
        })

        User.findByIdAndUpdate(board.owner.id, {boardOnDisplay: ""})
            .catch((err)=>{
                return res.status(401).send({
                    error:true
                });
            });
            
        let deletedBoard = await Board.findByIdAndDelete(id); 
        
        if(!deletedBoard){
            return res.status(402).send({
                error:true
            });
        }
    }
    else{
         return res.status(403).send({
            error:true
        });
    }

    return res.status(202).send({
      error: false
    })

})

router.put('/reorder', isLoggedIn, async (req, res) => {
    let {destinationIndex, draggableId, boardId} = req.body;
    let boardWithDragRemoved = await Board.findByIdAndUpdate(boardId, {$pull: {lists: draggableId}}, { new: true });
    if(boardWithDragRemoved){
        let list = await List.findById(draggableId);
        if(list){
            let boardWithDragUpdated = await Board.findByIdAndUpdate(boardId, {$push: {lists: {$each: [list], $position: destinationIndex}}}, { new: true })
            if(!boardWithDragUpdated){
                return res.status(404).send({
                    error:true
                });
            }
        }
        else{
            return res.status(404).send({
                error:true
            });
        }
    }
    else{
        return res.status(404).send({
            error:true
        });
    }

    return res.status(202).send({
        error: false
})    
});

router.put('/', isLoggedIn, async (req, res)=>{
    const {id, text} = req.body;

    let board = await Board.findByIdAndUpdate(id, {title: text});
    
    if(board){
        return res.status(202).send({
            error: false
        })    
    }
    else{
        return res.status(404).send({
            error:true
        });
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