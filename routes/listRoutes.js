const express = require("express");

const router = express.Router();

const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card')

router.post(`/`, isLoggedIn, async (req, res) => {
    const {title, id} = req.body;
    let newList = await List.create({
        title
    });
    
    if(newList){
        
        let board = await Board.findById(id) 
        if(board){
            let time = new Date().toDateString();
            let opLogText = req.user.username + " added the list : " + title;
            board.lists.push(newList);
            board.opLog.push({action:"add", text:opLogText, timeStamp:time});
            board.save();
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

    return res.status(201).send({
            error: false,
            newList
    })    

});

router.delete(`/`, isLoggedIn, async (req, res) => {
    let {id, boardId} = req.query;
    
    let list = await List.findById(id);
    
    let time = new Date().toDateString();
    let opLogText = req.user.username + " deleted the list : " + list.title;
    
    let updatedBoard = await Board.findByIdAndUpdate(boardId, {$pull: {lists:id}}, { new: true });
    updatedBoard.opLog.push({action:"delete", text:opLogText, timeStamp:time})
    updatedBoard.save()

    if(updatedBoard){
        let deletedList = await List.findByIdAndDelete(id);
        if(!deletedList){
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
    let {sourceId, destinationId, destinationIndex, draggableId} = req.body;
    let card = await Card.findById(draggableId);
    let listWithDragRemoved = await List.findByIdAndUpdate(sourceId, {$pull: {cards: draggableId}}, { new: true });
    if(listWithDragRemoved){
        if(card){
            let listWithDragUpdated = await List.findByIdAndUpdate(destinationId, {$push: {cards: {$each: [card], $position: destinationIndex}}}, { new: true })
            
            let time = new Date().toDateString();
            
            let opLogText;
            if(sourceId === destinationId){
                opLogText = req.user.username + " rearranged the card : " + card.text.substr(0, 20) + (card.text.length>20?"...":"");

            }
            else{
                opLogText = req.user.username + " moved the card : " + card.text.substr(0, 20) + (card.text.length>20?"...":"") + " from list : " + listWithDragRemoved.title + " to list : " + listWithDragUpdated.title;

            }            

            let board = await Board.findByIdAndUpdate(req.user.boardOnDisplay, {$push: { opLog:{$each: [{action:"reorder", text:opLogText, timeStamp:time}] } }}, { new: true })

            if(!listWithDragUpdated){
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

    let list = await List.findByIdAndUpdate(id, {title: text});
    
    let time = new Date().toDateString();
    let opLogText = req.user.username + " renamed the list : " + list.title + " to " + text;

    let board = await Board.findByIdAndUpdate(req.user.boardOnDisplay, {$push: { opLog:{$each: [{action:"edit", text:opLogText, timeStamp:time}] } }}, { new: true })

    if(list){
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
