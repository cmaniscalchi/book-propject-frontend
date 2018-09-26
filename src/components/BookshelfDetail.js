import React from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { deleteUserBook, viewEditions, clearSelectedBook } from '../actions'

const BookshelfDetail = ({ book, modalOpen, deleteUserBook, viewEditions, clearSelectedBook }) => {
  // console.log("BookshelfDetail:", book, modalOpen)

const handleBookRemoveOnClick = (bookId) => {
  deleteUserBook(bookId)
  clearSelectedBook()
}

  if (book) {
    return (
      <div>
        <Modal open={modalOpen} onClose={clearSelectedBook}>
          <Modal.Header>My Shelved Books</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={book.image_url} />
            <Modal.Description>
              <Header>{book.title} by {book.author}</Header>
              <p>More deets to go here.</p>
              <p>Eventually.</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => viewEditions(book)}>View Alternate Editions</Button>
            <Button onClick={() => handleBookRemoveOnClick(book.id)}>Remove Book from Shelf</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  } else {
    return null
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.selectedBook,
    modalOpen: state.book.modalOpen
  }
}

export default connect(mapStateToProps, { deleteUserBook, viewEditions, clearSelectedBook })(BookshelfDetail)
