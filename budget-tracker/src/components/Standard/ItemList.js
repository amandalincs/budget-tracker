import React, {useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import { Button} from 'reactstrap';


const Styles = styled.div`
    
`;


const ItemList = ({ items, handleDeleteItem }) => {

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  

  const toggleConfirmation = () =>{
    setConfirmDelete(!confirmDelete)
    
}

  return(
  <Styles>
    {/* <ListGroup >
      {items.map(item => (
        <ListGroupItem key={item.id}>
          {item.date} - {item.name} - {item.category} - $ {item.amount} 
        </ListGroupItem>
      ))}
    </ListGroup>     */}
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.date}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">  ${item.amount}</TableCell>
              <TableCell align="right"> 

              {confirmDelete && selectedItem === item.id? 

                (
                  <div><Button style={{paddingRight: '10px'}} color="danger" value={item.id} onClick={handleDeleteItem}>Delete</Button>
                  <Button outline color="secondary" onClick={toggleConfirmation}>Cancel</Button></div>
                )
                :
                (<Button color="danger" outline onClick={() => {setSelectedItem(item.id); toggleConfirmation()}}><FaTrash/></Button>)

              } 
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Styles>
  )
}

export default ItemList;
