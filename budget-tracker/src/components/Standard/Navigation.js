import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import {Link} from 'react-router-dom'


const Styles = styled.div`
    
    .navbar{
        padding: 1rem 2rem; 
        background: transparent
    }

    .nav > .active{
        color: black;
    }
    .items{
        padding: 10px 10px;
        color: rgb(153, 102, 255);
        text-transform: uppercase;
        margin: 2px
    }

    a{  
        text-decoration: none;       
        color: #e6b268; 
        padding: 10px;
        border: white 2px solid;

    }

    a:hover{
        background: #f8f8f8;
    }

    .booking{
        border: 1px solid #e6b268;
        padding: 7px 10px
    }

`;


const MainNav = () => {
    
    return ( 
        <Styles>
            <Navbar className="navbar" expand="lg">
                <Navbar.Brand >Budget Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto nav">

                        <Link to="/dashboard">Dashboard</Link>
                        {/* <Link to="/">Add Items</Link> */}



                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    );
}

export default MainNav;
