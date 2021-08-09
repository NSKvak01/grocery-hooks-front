import React, {useState, useEffect} from 'react'
import {Input, List, Sorting} from "./components"
import {InputContext, ListContext, SortingContext} from "./components/context/context"
import axios from "axios"
import "./App.css"

function App() {
  const [groceryInput, setGroceryInput] = useState("")
  const [groceryList, setGroceryList] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function getAllGroceries(){
    try {
      let allGroceries = await axios.get("http://localhost:3000/api/grocery/get-all-groceries")
      setGroceryList(allGroceries.data.payload)
    } catch (e) {
      console.log(e)
    }
  }

  async function purchasedGrocery(id, purchased){
    try {
      let updatedPurchase = await axios.put(`http://localhost:3000/api/grocery/update-grocery-by-id/${id}`, {purchased:!purchased})
      let purchasedItem = groceryList.map((item)=>{
        if(item._id === updatedPurchase.data._id){
            item.purchased = updatedPurchase.data.purchased
        }
        return item
    })
    setGroceryList(purchasedItem)
    } catch (e) {
      console.log(e)
    }
  }

  async function handleEditByID (_id, editInput){
    try {
        let editedItem = await axios.put(`http://localhost:3000/api/grocery/update-grocery-by-id/${_id}`, {grocery:editInput})
        let editItem = groceryList.map((item)=>{
            if(item._id === editedItem.data._id){
                item.grocery=editInput
            }
            return item
        })
          setGroceryList(editItem)
    } catch (error) {
        console.log(error)
    }
}

  async function deleteGrocery(id){
    try {
      let deletedGrocery = await axios.delete(`http://localhost:3000/api/grocery/delete-grocery-by-id/${id}`)
      let filteredList = groceryList.filter((item)=>item._id !== deletedGrocery.data._id)
      setGroceryList(filteredList)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllGroceries()
    console.log(groceryList)
  }, [])

  async function addGrocery(event){
    event.preventDefault()
        let found = false
        if(groceryInput !== ""){
            groceryList.forEach((item)=>{
                if(item.grocery.toLowerCase() === groceryInput.toLowerCase()){
                    found=true
                }
            })
            if (found){
                setError(true)
                setErrorMessage("This item already exists")
            } else {
                try {
                    let createdGrocery = await axios.post(
                        `http://localhost:3000/api/grocery/create-grocery`,
                        {
                            grocery:groceryInput,
                            purchased:false,
                        }
                    ) 
                    let newArray = [
                        ...groceryList, createdGrocery.data
                    ]
                        setGroceryList(newArray)
                        setGroceryInput("")
                        setError(false)
                        setErrorMessage("")
                    }
                catch (error){
                    console.log(error)
                }
              }
        } else {
          setError(true)
          setErrorMessage("Cannot add empty item")
          setGroceryList(groceryList)
        }
      }

      function handleGroceryInputOnChange(e){
        setGroceryInput(e.target.value)
        console.log(groceryInput)
      }

      async function sortByDate(date){
        try {
            let sorted = await axios.get(`http://localhost:3000/api/grocery/get-all-groceries?date=${date}`)
                setGroceryList(sorted.data.payload)
                console.log(sorted)
        } catch (e) {
            console.log(e)
        }
    }

    async function sortByPurchased (purchased){
        try {
            let sorted = await axios.get(`http://localhost:3000/api/grocery/sort-by-purchased?purchased=${purchased}`)
                setGroceryList(sorted.data.payload)
        } catch (e) {
            console.log(e)
        }
    }

  function handleInput (){
    return<InputContext.Provider value={{addGrocery, handleGroceryInputOnChange, error, errorMessage, groceryInput}}>
      <Input />
    </InputContext.Provider>
  }

  function handleList(){
    return<ListContext.Provider value={{groceryList, deleteGrocery, purchasedGrocery, handleEditByID}}>
      <List />
    </ListContext.Provider>
  }

  function handleSorting(){
    return<SortingContext.Provider value={{sortByDate, sortByPurchased}}>
      <Sorting />
    </SortingContext.Provider>
  }

  return (
    <div className="App">
      {handleInput()}
      {handleSorting()}
      {handleList()}
    </div>
  )
}

export default App
