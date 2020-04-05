const express = require("express");
const ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

const Card = require('../models/card');
const List = require('../models/list');
const Board = require('../models/board');

router.post(`/`, isLoggedIn, async (req, res) => {
    let {text, id} = req.body;
    let newCard = await Card.create({
        text
    });

    
    if(newCard){
        let list = await List.findById(id) 
        let time = new Date().toDateString();
        let opLogText = req.user.username + " added the card : " + text.substr(0, 20) + (text.length > 20?"...":"") + " to the list : " + list.title;
        let board = await Board.findByIdAndUpdate(req.user.boardOnDisplay, {$push: { opLog:{$each: [{action:"add", text:opLogText, timeStamp:time}] } }}, { new: true })

        if(list){
            list.cards.push(newCard);
            list.save();
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
            newCard
    })
})

router.delete(`/`, isLoggedIn, async (req, res) => {
    let {id, listId} = req.query;
    let updatedList = await List.findByIdAndUpdate(listId, {$pull: {cards:id}}, { new: true });
    
    if(updatedList){
        let card = await Card.findByIdAndDelete(id);
        let time = new Date().toDateString();
        let opLogText = req.user.username + " deleted the card : " + card.text.substr(0, 20) +  (card.text.length > 20?"...":"") + " from the list "+ updatedList.title;
    
        let board = await Board.findByIdAndUpdate(req.user.boardOnDisplay, {$push: { opLog:{$each: [{action:"delete", text:opLogText, timeStamp:time}] } }}, { new: true })

        if(!card){
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
