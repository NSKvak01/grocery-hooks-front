import React,{useContext} from 'react'
import {SortingContext} from "../context/context"

function Sorting() {
    const {sortByDate, sortByPurchased} = useContext(SortingContext)
    return (
        <div style={{marginTop:"20px"}}>
            <button onClick={()=>sortByDate("descending")}>Newest to oldest</button>
            <button onClick={()=>sortByDate("ascending")}>Oldest to Newest</button>
            <button onClick={()=>sortByPurchased("true")}>Sort by Purchased</button>
            <button onClick={()=>sortByPurchased("false")}>Sort by Not Purchased</button>
        </div>
    )
}

export default Sorting
