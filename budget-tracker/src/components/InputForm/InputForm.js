import React from 'react';
import { Form, FormGroup, Input, Label, Col, Button } from 'reactstrap';

const InputForm = ({name, amount, handleName, handleAmount, handleSubmitForm, handleDeleteAllItems}) => (
  <Form style={{ margin: 10 }} onSubmit={handleSubmitForm}>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        Item Name
      </Label>
      <Col sm={4}>
        <Input 
          type="text" 
          name="name" 
          id="itemName" 
          placeholder="Item name"
          value={name}
          onChange={handleName}
        />
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        $ Amount
      </Label>
      <Col sm={4}>
        <Input 
          type="number" 
          name="amount" 
          id="itemAmount" 
          placeholder="0.00"
          value={amount}
          onChange={handleAmount}
        />
      </Col>
    </FormGroup>
    <Button type="submit" color="primary">
      Add
    </Button>{' '}
    <Button type="submit" color="danger" onClick={handleDeleteAllItems}>
      Delete Items
    </Button>
  </Form>
)

export default InputForm;
