import { React, useState, useEffect } from 'react'
import { Card, Button, Container } from 'reactstrap'
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
        font-size: 1.5rem
    }

`;


function Dashboard() {

    const [items, setItems] = useState([])
    // const handleDeleteAllItems = () => {
    //     setItems([])
    // }

    useEffect(() => {
        let ls = JSON.parse(localStorage.getItem('items'))
        console.log(ls)
        if (ls) setItems(ls)
    },[])

    return (
        <Styles>
            <Container>
                <div className="header">
                    <span className="title">Overview</span>
                    <Link to="/"><Button>Add Expense</Button></Link>
                </div>

                <Card>
                    <div className="data-header">All Expenses</div>
                    <ItemList items={items}></ItemList>
                </Card>

            </Container>
        </Styles>
            
    );
}

export default Dashboard;
