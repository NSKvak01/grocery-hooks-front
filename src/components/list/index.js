import React, {useState,useContext} from 'react'
import { ListContext } from '../context/context'
import GroceryList from "./GroceryList"

function List() {
    const {groceryList, deleteGrocery, purchasedGrocery, handleEditByID} = useContext(ListContext)


    return (
        <div>
            <ul>
                {groceryList.map((item)=>{
                    return <GroceryList 
                    key={item._id} 
                    _id={item._id}
                    grocery = {item.grocery}
                    purchased={item.purchased}
                    deleteGrocery={deleteGrocery}
                    purchasedGrocery={purchasedGrocery}
                    handleEditByID = {handleEditByID}
                    />
                })}
            </ul>
        </div>
    )
}

export default List
