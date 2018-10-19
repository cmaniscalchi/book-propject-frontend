import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'
import { cancelManageUserBookshelves, closeModal, createNewBookshelf } from '../../actions'

class CreateBookshelfModal extends Component {

  state = { input: '' }

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleFormSubmit = () => {
    let { closeModal, id, createNewBookshelf } = this.props
    // debugger;
    let { input } = this.state
    if (input !== '') {
      createNewBookshelf(id, input)
      this.setState({ input: '' })
      closeModal()
    }
  }

  handleModalClose = () => {
    let { cancelManageUserBookshelves, closeModal } = this.props
    cancelManageUserBookshelves()
    this.setState({ input: '' })
    closeModal()
  }

  render() {
    // console.log("CreateBookshelfModal:", this.props)
    let { managingBookshelves, modalOpen } = this.props
    let { input } = this.state
    if (managingBookshelves) {
      return (
        <div>
          <Modal open={modalOpen} onClose={this.handleModalClose} closeIcon >
            <Modal.Header className='modal'>Create a New Bookshelf</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header as='h3'>Choose a name for your bookshelf:</Header>
              </Modal.Description>
              <br />
              <Form.Input
                icon='book'
                iconPosition='left'
                value={input}
                onChange={this.handleInputChange}
                placeholder="Choose a name"
              />
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleModalClose}>
                <Icon name='remove' /> Cancel
              </Button>
              <Button onClick={this.handleFormSubmit}>
                <Icon name='checkmark' /> Submit
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = ({ book: { modalOpen }, user: { managingBookshelves, user: { id } } }) => ({ id, managingBookshelves, modalOpen })

export default connect(mapStateToProps, { cancelManageUserBookshelves, closeModal, createNewBookshelf })(CreateBookshelfModal)
