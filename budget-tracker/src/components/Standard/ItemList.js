import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ItemList = ({ items }) => (
  <div>
    <ListGroup>
      {items.map(item => (
        <ListGroupItem key={item.id}>
          {item.name} - {item.category} - $ {item.amount}
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
)

export default ItemList;
