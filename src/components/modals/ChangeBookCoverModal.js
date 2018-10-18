import React from "react"
import { connect } from 'react-redux'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'
import { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, swapUserBookCover } from '../../actions'

const ChangeBookCoverModal = ({ clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, modalOpen, selectedBook, selectedCover, swapUserBookCover }) => {

  const handleCoverSwap = (newCover, id) => {
    swapUserBookCover(newCover, id)
    clearSelectedCover()
    clearSelectedBook()
    closeModal()
  }

  const handleModalClose = () => {
    clearSelectedBook()
    clearSelectedCover()
    clearCoverResults()
    closeModal()
  }

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
          <Button onClick={handleModalClose}>
            <Icon name='remove' /> Return to Bookshelf
          </Button>
          <Button onClick={closeModal}>
            <Icon name='undo' /> Choose A Different Cover
          </Button>
          <Button onClick={() => handleCoverSwap(selectedCover.contentUrl, selectedBook.id)}>
            <Icon name='checkmark' /> Change It!
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ book: { modalOpen, selectedBook, selectedCover } }) => ({ modalOpen, selectedBook, selectedCover })

export default connect(mapStateToProps, { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, swapUserBookCover })(ChangeBookCoverModal)
