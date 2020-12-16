import React from 'react';
import { Form, FormGroup, Input, Label, Col, Button } from 'reactstrap';

const InputForm = () => (
  <Form style={{ margin: 10 }}>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        Item Name
      </Label>
      <Col sm={4}>
        <Input type="text" name="name" id="itemName" placeholder="Item name"/>
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        $ Amount
      </Label>
      <Col sm={4}>
        <Input type="number" name="amount" id="itemAmount" placeholder="0.00"/>
      </Col>
    </FormGroup>
    <Button type="submit" color="primary">
      Add
    </Button>
  </Form>
)

export default InputForm;
