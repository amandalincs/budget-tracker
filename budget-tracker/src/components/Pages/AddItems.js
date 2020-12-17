import { React, useState, useEffect } from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'
import InputForm from '../Standard/InputForm'
import  { Redirect } from 'react-router-dom'

import { FaArrowLeft } from 'react-icons/fa';



// const ALL_ITEMS = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

function AddItems() {
    const [items, setItems] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [added, setAdded] = useState(false)
    const [date, setDate] = useState(new Date());
    const [back, setBack] = useState(false)




    useEffect(() => {
        let ls = JSON.parse(localStorage.getItem('items'))
        if (ls) setItems(ls)
    },[])

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
            // setId("")
            // setName("")
            // setCategory("-- Select Category --")
            // setAmount("")

        }

        else {
            console.log("Invalid input");
        }
    }

    const backToDashboard = () => {
        setBack(true)
    }

    if (added || back) {
        return (
            <Redirect to='/dashboard'  />
        )
    }

    
    return (
        <Container>

            <Jumbotron fluid style={{paddingTop: '5px'}}>
                <div>
                    <Button style={{margin: '10px', display: 'flex', alignItems:'center'}} onClick={backToDashboard}> 
                        <FaArrowLeft/> <span style={{marginLeft: '5px'}}>Back</span>
                    </Button>
                </div>
                <h3 className="display-6 text-center">
                    My Budget Tracker
                </h3>
                <div className="text-center">
                    <p>
                        Total Spendings:{' '}
                        <span className="text-success">
                            ${' '}
                            {items.reduce((accumulator, currentValue) => {
                                return (accumulator += parseInt(currentValue.amount))
                            }, 0)}
                        </span>
                    </p>
                </div>
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
