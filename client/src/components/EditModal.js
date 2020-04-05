import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { connect } from 'react-redux';
import { updateItem } from '../actions/itemActions';

class EditModal extends Component {
  state = {
    modal: false,
    name: this.props.name,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const updateItem = {
      id: this.props.id,
      name: this.state.name,
    };

    // Update item via updateItem action
    this.props.updateItem(updateItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          className='fas fa-edit'
          color='success'
          size='sm'
          onClick={this.toggle}
        />

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Edit Item in Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder={this.props.name}
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Edit Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { updateItem })(EditModal);
