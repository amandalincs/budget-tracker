import { React, useState, useEffect } from 'react'
import { Card, CardDeck, CardTitle, CardBody, CardSubtitle, CardText, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap'
import styled from 'styled-components';
import ItemList from '../Standard/ItemList' 
import {Link} from 'react-router-dom'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


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
    const [processedItems, setProcessedItems] = useState([])
    const [budget, setBudget] = useState(0)
    const [remainingBudget, setRemainingBudget] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false);
    const [filterBy, setFilterBy] = useState("all")

    // const handleDeleteAllItems = () => {
    //     setItems([])
    // }


    const toggleModal = () =>{
        setDeleteModal(!deleteModal)
    }

    const handleFilterBy = (event) => {
        let item = event.target.value
        setFilterBy(item)
    }
    const handleDeleteAllItems = () => {
        setItems([])
        localStorage.clear()        
    }

    const handleDeleteItem = (event) => {
        let id = event.target.value
        let new_items = items.filter( (expense) => {
            return expense.id !== id
        })
        localStorage.setItem('items', JSON.stringify(new_items))
        setItems(new_items)
        setFilterBy('all')

    }

    useEffect(() => {
        let ls = JSON.parse(localStorage.getItem('items'))
        if (ls) {
            setItems(ls); 
            setProcessedItems(ls)
        }
    },[])

    useEffect(() => {
        let ls = JSON.parse(localStorage.getItem('items'))
        if (ls) {setProcessedItems(ls)}

        if (filterBy !== 'all'){
            let sorted_items = items.filter(expense => {
                return expense.category.toLowerCase().replaceAll('&', '_').replaceAll(" ", '') === filterBy
            })
            setProcessedItems(sorted_items)
            
        }

    },[filterBy])

    return (
        <Styles>
            <Container>
                <div className="header">
                    <span className="title">Overview</span>
                    <Link to="/"><Button>Add Expense</Button></Link>
                </div>

                <CardDeck>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Total Budget{' '}
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
                                Remaining Budget{' '}
                            </CardTitle>
                            <CardText>
                                <span className="text-success">
                                    ${remainingBudget}
                                </span>
                            </CardText>
                        </CardBody>
                    </Card>
                </CardDeck>

                <Card>
                    <div className="data-header">
                        <span>All Expenses</span>
                        <div>
                            <span>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filterBy}
                                    onChange={handleFilterBy}
                                    style={{margin:'10px'}}
                                    >   
                                        <MenuItem value="all">
                                            All 
                                        </MenuItem>
                                        <MenuItem value="food_drinks">Food & Drinks</MenuItem>
                                        <MenuItem value="transportation">Transportation</MenuItem>
                                        <MenuItem value="housing_utilities">Housing & Utilities</MenuItem>
                                        <MenuItem value="clothing<">Clothing</MenuItem>
                                        <MenuItem value="entertainment">Entertainment</MenuItem>
                                        <MenuItem value="medical">Medical</MenuItem>
                                        <MenuItem value="miscellaneous">Miscellaneous</MenuItem>

                                    </Select>
                            </span>
                    
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
                    </div>

                    {processedItems.length > 0 ?
                    (<ItemList items={processedItems} handleDeleteItem={handleDeleteItem}></ItemList>) 
                    : (<div style={{textAlign: 'center', padding: '20px 10px'}}>No Data Available</div>)
                    }
                </Card>

            </Container>
        </Styles>
            
    );
}

export default Dashboard;
