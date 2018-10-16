import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'
import { closeModal, renameUserBookshelf, clearSelectedCover, clearSelectedBook } from '../actions'

class BookshelfModal extends Component {

  state = { input: '' }

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleFormSubmit = () => {
    let { currentBookshelf, renameUserBookshelf, closeModal } = this.props
    let { input } = this.state
    if (input !== '') {
      renameUserBookshelf(input, currentBookshelf.id)
      this.setState({ input: '' })
      closeModal()
    }
  }

  handleCoverSwap = (newCover, id) => {
    debugger;
    let { book, selectedCover, clearSelectedBook, swapUserBookCover, clearSelectedCover } = this.props
    swapUserBookCover(newCover, id)
    clearSelectedCover(selectedCover)
    clearSelectedBook(book)
  }

  render() {
    let { currentBookshelf, modalOpen, closeModal, selectedCover, book } = this.props
    let { input } = this.state

    debugger;
    if (selectedCover && book) {
      return (
        <div>
          <Modal open={modalOpen} onClose={closeModal} closeIcon >
            <Modal.Header className='modal'>Change a Book's Cover</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header as='h3'>Are you positive you'd like to make this change?</Header>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={clearSelectedCover}>
                <Icon name='remove' /> No, Please Take Me Back
              </Button>
              <Button onClick={() => this.handleCoverSwap(selectedCover, book.id)}>
                <Icon name='checkmark' /> Yes, Change It!
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )
    } else {
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
}


const mapStateToProps = state => ({
  modalOpen: state.book.modalOpen,
  currentBookshelf: state.user.user.currentBookshelf,
  book: state.book.selectedBook,
  selectedCover: state.book.selectedCover
})

export default connect(mapStateToProps, { closeModal, renameUserBookshelf, clearSelectedCover, clearSelectedBook })(BookshelfModal)
