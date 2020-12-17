import { React, useState, useEffect } from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'
import InputForm from '../Standard/InputForm'
import  { Redirect } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';

// ADD ITEM PAGE: allows users to add a new expense to their spending

// Functions and variables needed for handling new item elements:
function AddItems() {

    // Setting variables to keep track of state:
    const [items, setItems] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [added, setAdded] = useState(false)
    const [date, setDate] = useState(new Date());
    const [back, setBack] = useState(false)

    // Get local storage items and update items:
    useEffect(() => {
        let ls = JSON.parse(localStorage.getItem('items'))
        if (ls) setItems(ls)
    },[])

    // Functions that handle changes and updates to elements:
    const handleName = event => {
        setName(event.target.value)
    }

    const handleCategory = event => {
        let category = event.target.value

        if (category !== "-- Select Category --" ||  !category) {setCategory(event.target.value)}

        else{
            setCategory("")
        }
    }
    const handleAmount = event => {
        setAmount(event.target.value)
    }

    const handleDate = date => {
        setDate(date)
    }

    const handleSubmitForm = event => {
        event.preventDefault()
        if (id === ""){
            console.log("empty")
            setId(Math.random().toString(36).substr(2, 9))
        }
        
        
        if (amount > 0 && name !== "" && category !== "") {
            const item = { id: '_' + Math.random().toString(36).substr(2, 9), name, category, amount, date: date.toLocaleDateString('en-US') }
            console.log("Item: ", item)
            
            setItems([items.push(item)])
            localStorage.setItem('items', JSON.stringify(items))
            console.log(items)
            setAdded(true)
        }

        else {
            console.log("Invalid input");
        }
    }

    const backToDashboard = () => {
        setBack(true)
    }

    // Navigation handling:
    if (added || back) {
        return (
            <Redirect to='/'  />
        )
    }

    //HTML for Add Item page:
    return (
        <Container>

            <Jumbotron fluid style={{paddingTop: '5px'}}>
                <div>
                    <Button style={{margin: '10px', display: 'flex', alignItems:'center'}} onClick={backToDashboard}> 
                        <FaArrowLeft/> <span style={{marginLeft: '5px'}}>Back</span>
                    </Button>
                </div>
                <h3 className="display-6 text-center">
                    New Expense
                </h3>
                <InputForm
                    name={name}
                    category={category}
                    amount={amount}
                    date={date}

                    handleName={handleName}
                    handleCategory={handleCategory}
                    handleAmount={handleAmount}
                    handleDate={handleDate}
                    handleSubmitForm={handleSubmitForm}
                />
            </Jumbotron>
        </Container>
    );
}

export default AddItems;
