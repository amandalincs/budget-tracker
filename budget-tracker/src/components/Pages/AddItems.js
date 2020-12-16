import { React, useState, useEffect } from 'react'
import { Jumbotron, Container } from 'reactstrap'
import InputForm from '../Standard/InputForm'
import ItemList from '../Standard/ItemList'

const ALL_ITEMS = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

function AddItems() {
    const [items, setItems] = useState(ALL_ITEMS);
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const handleName = event => {
        console.log('Name ', event.target.value)
        setName(event.target.value)
    }

    const handleCategory = event => {
        console.log('Category: ', event.target.value)
        let category = event.target.value

        if (category !== "-- Select Category --" ||  !category) {setCategory(event.target.value)}

        else{
            setCategory("")
        }
    }
    const handleAmount = event => {
        console.log('Amount, ', event.target.value)
        setAmount(event.target.value)
    }

    const handleSubmitForm = event => {
        event.preventDefault()
        if (amount > 0 && name !== "" && category !== "") {
            const item = { id, name, category, amount }
            console.log("ITEM", item)
            setItems([...items, item])
            setId(id + 1)
            setName("")
            setCategory("")
            setAmount("")
            console.log(localStorage)
        }

        else {
            console.log("Invalid input");
        }
    }

    const handleDeleteAllItems = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])

    return (
        <Container>
            <Jumbotron fluid>
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
                    handleName={handleName}
                    handleCategory={handleCategory}
                    handleAmount={handleAmount}
                    handleSubmitForm={handleSubmitForm}
                    handleDeleteAllItems={handleDeleteAllItems}
                />
                <ItemList items={items} />
            </Jumbotron>
        </Container>
    );
}

export default AddItems;
