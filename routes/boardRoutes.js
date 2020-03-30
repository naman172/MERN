const express = require("express");

const router = express.Router();

const User = require('../models/user');
const Board = require('../models/board');
const List = require('../models/list');

router.get('/', isLoggedIn, async (req, res) => {
    const id = req.query.id;
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
    
});

router.post(`/`, isLoggedIn, async (req, res) => {
    let {title, id} = req.body;
    let newBoard = await Board.create({
        title
    });

    if(newBoard){
        let user = await User.findById(id) 
        if(user){
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
    let {id, userId} = req.body;

    let deletedBoard = await Board.findByIdAndDelete(id);

    if(deletedBoard){
        let updatedUser = await User.findByIdAndUpdate(userId, {$pull: {boards:id}}, { new: true });
        if(!updatedUser){
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

})

router.put('/reorder', isLoggedIn, async (req, res) => {
    let {destinationIndex, draggableId, boardId} = req.body;
    let boardWithDragRemoved = await Board.findByIdAndUpdate(boardId, {$pull: {lists: draggableId}}, { new: true });
    if(boardWithDragRemoved){
        let list = await List.findById(draggableId);
        if(list){
            console.log("here");
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