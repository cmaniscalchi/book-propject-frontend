import React from "react"
import { connect } from 'react-redux'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'
import { closeModal, cancelDeletingUserBookshelves, deleteUserBookshelf } from '../../actions'

const BookshelfDeleteModal = ({ cancelDeletingUserBookshelves, closeModal, currentBookshelf, deleteUserBookshelf, modalOpen }) => {

  const handleBookshelfDelete = () => {
    deleteUserBookshelf(currentBookshelf.id)
    closeModal()
  }

  const handleModalClose = () => {
    cancelDeletingUserBookshelves()
    closeModal()
  }

  return (
    <div>
      <Modal open={modalOpen} onClose={handleModalClose} closeIcon >
        <Modal.Header className='modal'>Delete {currentBookshelf.name}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header as='h3'>Deleting a bookshelf also removes all the books saved to it. Are you positive you'd like to delete it?</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalClose}>
            <Icon name='undo' /> Cancel
          </Button>
          <Button onClick={handleBookshelfDelete}>
            <Icon name='checkmark' /> Delete Bookshelf
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ book: { modalOpen }, user: { currentBookshelf } }) => ({ currentBookshelf, modalOpen })

export default connect(mapStateToProps, { cancelDeletingUserBookshelves, closeModal, deleteUserBookshelf })(BookshelfDeleteModal)
