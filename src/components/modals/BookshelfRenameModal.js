import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'
import { closeModal, renameUserBookshelf } from '../../actions'

class BookshelfRenameModal extends Component {

  state = { input: '' }

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleFormSubmit = () => {
    let { closeModal, currentBookshelf, renameUserBookshelf } = this.props
    let { input } = this.state
    if (input !== '') {
      renameUserBookshelf(input, currentBookshelf.id)
      this.setState({ input: '' })
      closeModal()
    }
  }

  render() {
    let { modalOpen, closeModal, currentBookshelf } = this.props
    let { input } = this.state
    return (
      <div>
        <Modal open={modalOpen} onClose={closeModal} closeIcon >
          <Modal.Header className='modal'>{currentBookshelf.name}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header as='h3'>Choose a new name for this bookshelf:</Header>
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
            <Button onClick={closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button onClick={this.handleFormSubmit}>
              <Icon name='checkmark' /> Rename
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ book: { modalOpen }, user: { currentBookshelf } }) => ({ currentBookshelf, modalOpen })

export default connect(mapStateToProps, { closeModal, renameUserBookshelf })(BookshelfRenameModal)
