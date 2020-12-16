import './App.css';
import React, { useState } from 'react'
import { Jumbotron, Container } from 'reactstrap'
import InputForm from './components/InputForm'
import ItemList from './components/ItemList'

const ALL_ITEMS = [
  { id: 1, name: 'Buy a book', amount: 20 },
  { id: 2, name: 'Buy milk', amount: 5 },
  { id: 3, name: 'Book a flight', amount: 225 }
]

function App() {
  const [items, setItems] = useState(ALL_ITEMS);

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
        <InputForm />
        <ItemList items={items} />
      </Jumbotron>
    </Container>
  );
}

export default App;
