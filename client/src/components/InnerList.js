import React from "react";
import ListCard from './ListCard.js';
import List from './List.js';

const InnerList = ({listItems = [], itemType, listId})=>{
        if(listItems !== []){
            return (
                listItems.map( (item, index) => (itemType === 'card' ? 
                    <ListCard listId={listId} cardId={item._id} key={item._id} text = {item.text} index= {index}/> :
                    <List index={index} listId = {item._id} key= {item._id} title = {item.title} cards = {item.cards} />
                ))   
            )
        }
        else{
            return (<div></div>)
        } 
}

export default InnerList;