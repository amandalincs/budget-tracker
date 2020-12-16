import './App.css';
import React, { useState, useEffect } from 'react'
import { Jumbotron, Container } from 'reactstrap'
import InputForm from './components/InputForm'
import ItemList from './components/ItemList'

const ALL_ITEMS = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

function App() {
  const [items, setItems] = useState(ALL_ITEMS);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleName = event => {
    console.log('Name ', event.target.value)
    setName(event.target.value)
  }

  const handleAmount = event => {
    console.log('Amount, ', event.target.value)
    setAmount(event.target.value)
  }

  const handleSubmitForm = event => {
    event.preventDefault()
    if (amount > 0 && name !== "") {
      const item = {id, name, amount}
      console.log("ITEM", item)
      setItems([...items, item])
      setId(id+1)
      setName("")
      setAmount("")
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
          amount={amount}
          handleName={handleName}
          handleAmount={handleAmount}
          handleSubmitForm={handleSubmitForm}
          handleDeleteAllItems={handleDeleteAllItems}
        />
        <ItemList items={items} />
      </Jumbotron>
    </Container>
  );
}

export default App;
