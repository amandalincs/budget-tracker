import React from 'react';
import { Form, FormGroup, Input, Label, Col, Button } from 'reactstrap';

const InputForm = ({name, handleName,  category, handleCategory, amount, handleAmount, handleSubmitForm, handleDeleteAllItems}) => (
  <Form style={{ margin: 10 }} onSubmit={handleSubmitForm}>
    <FormGroup className="row">
      <Label sm={2}>
        Name
      </Label>
      <Col sm={4}>
        <Input 
          type="text" 
          name="name" 
          id="itemName" 
          placeholder="-- Enter Name -- "
          value={name}
          onChange={handleName}
        />

      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        Category
      </Label>
      <Col sm={4}>

        <Input type="select" name="select" id="categorySelect"  onChange={handleCategory}>
          <option >-- Select Category --</option>
          <option>Food & Drinks</option>
          <option>Transportation</option>
          <option>Housing & Utilities</option>
          <option>Clothing</option>
          <option>Entertainment</option>
          <option>Medical</option>
          <option>Miscellaneous</option>

        </Input>
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
