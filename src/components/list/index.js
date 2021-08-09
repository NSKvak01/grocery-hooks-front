import React, {useState,useContext} from 'react'
import { ListContext } from '../context/context'

function List() {
    const [canEdit, setCanEdit] = useState(false)
    const [editInput, setEditInput] = useState("")
    const {groceryList, deleteGrocery, purchasedGrocery, handleEditByID} = useContext(ListContext)

    function handleEdit(){
        setCanEdit(!canEdit)
    }

    function mixFunc(id){
        handleEdit()
        handleEditByID(id, editInput)
    }

    function handleOnChange (e){
        setEditInput(e.target.value)
        console.log(editInput)
    }

    return (
        <div>
            <ul>
                {groceryList.map((item)=>{
                    return <li key={item._id} style={{listStyleType:"none"}}>
                        {canEdit
                        ? <input onChange={handleOnChange}/>
                        : <p style={{textDecoration:item.purchased && "line-through"}}>{item.grocery}</p>
                        }
                        
                        {canEdit
                        ? <button onClick={()=>mixFunc(item._id)} id={item._id} >Submit</button>
                        : <button id={item._id} onClick={handleEdit}>Edit</button>
                        }
                        {item.purchased 
                        ? <button onClick={()=>purchasedGrocery(item._id, item.purchased)} >Not purchased</button>
                        : <button onClick={()=>purchasedGrocery(item._id, item.purchased)} >Purchased</button>
                        }
                        <button onClick={()=>deleteGrocery(item._id)}>Delete</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default List
