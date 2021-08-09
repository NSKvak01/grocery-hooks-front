import React,{useContext} from 'react'
import {InputContext} from "../context/context"

function Input() {
const {addGrocery, handleGroceryInputOnChange, error, errorMessage, groceryInput} = useContext(InputContext)




    return (
        <div>
            <div>
            <input onChange={handleGroceryInputOnChange} value={groceryInput}/>
            <button onClick={addGrocery}>Add</button>
            </div>
            <br />
            <span style={{color:"red", marginTop:"-10px"}}>{error&&errorMessage}</span>
        </div>
    )
}

export default Input
