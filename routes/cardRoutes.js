const express = require("express");
const ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

const Card = require('../models/card');
const List = require('../models/list');

router.post(`/`, isLoggedIn, async (req, res) => {
    let {text, id} = req.body;
    let newCard = await Card.create({
        text
    });

    if(newCard){
        let list = await List.findById(id) 
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
    let {id, listId} = req.body;

    let deletedCard = await Card.findByIdAndDelete(id);

    if(deletedCard){
        let updatedList = await List.findByIdAndUpdate(listId, {$pull: {cards:id}}, { new: true });
        if(!updatedList){
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
