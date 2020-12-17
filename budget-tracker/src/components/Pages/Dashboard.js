import { React, useState, useEffect } from 'react'
import { Card, CardDeck, CardTitle, CardBody, CardSubtitle, CardText, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input  } from 'reactstrap'
import styled from 'styled-components';
import ItemList from '../Standard/ItemList' 
import {Link} from 'react-router-dom'


const Styles = styled.div`
    
    .title{
        font-size: 2rem;
    }

    .header{
        display:flex;
        justify-content: space-between
    }

    .data-header{
        padding: 5px;
        padding-left: 10px;
        font-size: 1.5rem;
        display: flex;
        justify-content: space-between
    }

`;


function Dashboard() {

    const [items, setItems] = useState([])
    const [budget, setBudget] = useState(1000)
    const [itemToDelete, setItemToDelete] = useState()
    const [deleteModal, setDeleteModal] = useState(false);
    const [budgetModal, setBudgetModal] = useState(false);
    const [budgetModalVal, setBudgetModalVal] = useState('')
    // const handleDeleteAllItems = () => {
    //     setItems([])
    // }


    const toggleModal = () =>{
        setDeleteModal(!deleteModal)
    }

    const toggleBudgetModal = () => {
        setBudgetModal(!budgetModal)
        setBudgetModalVal('')
    }

    const handleDeleteAllItems = () => {
        setItems([])
        localStorage.clear()        
    }

    const handleItemToDelete = (item) => {
        console.log(item)
    }
    const handleDeleteItem = (event) => {
        let id = event.currentTarget.value
        let new_items = items.filter( (expense) => {
            return expense.id !== id
        })
        localStorage.setItem('items', JSON.stringify(new_items))
        setItems(new_items)

    }

    const handleBudgetModalVal = event => {
        setBudgetModalVal(event.target.value)
    }

    const handleSetBudget = () => {
        localStorage.setItem('budget', budgetModalVal)
        setBudget(budgetModalVal)
        toggleBudgetModal()
    }


    useEffect(() => {
        let ls = JSON.parse(localStorage.getItem('items'))
        let b = JSON.parse(localStorage.getItem('budget'))
        if (ls) setItems(ls)
        if (b) setBudget(b)
    },[])

    return (
        <Styles>
            <Container>
                <div className="header">
                    <span className="title">Overview</span>
                    <Link to="/"><Button>Add Expense</Button></Link>
                </div>

                <CardDeck style={{marginTop: 20}}>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <span>Total Budget{' '}</span>
                                {<Button onClick={toggleBudgetModal}>Set Budget</Button>}
                                <Modal isOpen={budgetModal} toggle={toggleBudgetModal} className="">
                                    <ModalHeader toggle={toggleBudgetModal}>Set your budget</ModalHeader>
                                    <ModalBody>
                                    <Input 
                                        type="number" 
                                        name="totalBudget" 
                                        id="totalBudget" 
                                        placeholder="0.00"
                                        value={budgetModalVal}
                                        onChange={handleBudgetModalVal}
                                    />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={toggleBudgetModal}>Cancel</Button>
                                        <Button color="primary" onClick={handleSetBudget}>Confirm</Button>{' '}
                                    </ModalFooter>
                                </Modal>
                            </CardTitle>
                            <CardText>
                                <span className="text-success">
                                    $ {budget}
                                </span>
                            </CardText>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <CardTitle>
                                Total Spent{' '}
                            </CardTitle>
                            <CardText>
                                <span className="text-success">
                                    ${' '}
                                    {items.reduce((accumulator, currentValue) => {
                                        return (accumulator += parseFloat(currentValue.amount))
                                    }, 0).toFixed(2)}
                                </span>
                            </CardText>
                        </CardBody>
                    </Card>


                    <Card>
                        <CardBody>
                            <CardTitle>
                                Remaining Budget {' '}
                            </CardTitle>
                            <CardText>
                                <span className="text-success">
                                    ${(budget - (items.reduce((accumulator, currentValue) => {
                                        return (accumulator += parseFloat(currentValue.amount))
                                    }, 0))).toFixed(2)}
                                </span>
                            </CardText>
                        </CardBody>
                    </Card>
                </CardDeck>

                <Card style={{marginTop: 20}}>
                    <CardBody>
                        <div className="data-header">
                            <span>All Expenses</span>
                            {items.length > 0 && <Button outline color="danger" onClick={toggleModal}>Clear All</Button>}
                            <Modal isOpen={deleteModal} toggle={toggleModal} className="">
                                <ModalHeader toggle={toggleModal}>Are you sure?</ModalHeader>
                                <ModalBody>
                                    You are about to delete all expenses.
                                </ModalBody>
                                <ModalFooter>
                                <Button color="danger" onClick={handleDeleteAllItems}>Delete</Button>{' '}
                                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>

                        {items.length > 0 ?
                        (<ItemList items={items} handleItemToDelete={handleItemToDelete} handleDeleteItem={handleDeleteItem}></ItemList>) 
                        : (<div style={{textAlign: 'center', padding: '20px 10px'}}>No Data Available</div>)
                        }
                    </CardBody>
                </Card>

            </Container>
        </Styles>
            
    );
}

export default Dashboard;
