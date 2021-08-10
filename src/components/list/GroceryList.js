import React,{useState} from 'react'

function GroceryList(props) {
    const {_id, deleteGrocery, purchasedGrocery, handleEditByID, grocery, purchased} = props
    const [canEdit, setCanEdit] = useState(false)
    const [editInput, setEditInput] = useState(grocery)

    function handleEdit(e){
        setCanEdit(!canEdit)
    }
    function handleOnChange (e){
        setEditInput(e.target.value)
        console.log(editInput)
    }


    function mixFunc(_id){
        handleEdit()
        handleEditByID(_id, editInput)
    }
    return (
        <div>
            <li style={{listStyleType:"none"}}>
                        {canEdit
                        ? <input onChange={handleOnChange} value={editInput}/>
                        : <p style={{textDecoration:purchased && "line-through"}}>{grocery}</p>
                        }
                        
                        {canEdit
                        ? <button onClick={()=>mixFunc(_id)} _id={_id} >Submit</button>
                        : <button _id={_id} onClick={()=>handleEdit(_id)}>Edit</button>
                        }
                        {purchased 
                        ? <button onClick={()=>purchasedGrocery(_id, purchased)} >Not purchased</button>
                        : <button onClick={()=>purchasedGrocery(_id, purchased)} >Purchased</button>
                        }
                        <button onClick={()=>deleteGrocery(_id)}>Delete</button>
                    </li>
        </div>
    )
}

export default GroceryList
