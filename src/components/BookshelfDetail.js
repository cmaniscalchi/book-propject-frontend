import React from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { deleteUserBook, viewEditions, clearSelectedBook } from '../actions'

// const BookshelfDetail = ({ book, deleteUserBook, viewEditions, dimmer, open, close }) => {
//   console.log("BookshelfDetail:", dimmer, open, close)

const BookshelfDetail = ({ book, modalOpen, clearSelectedBook }) => {
  console.log("BookshelfDetail:", book, modalOpen)

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
            <Button onClick={() => deleteUserBook(book.id)}>Remove Book from Shelf</Button>
          </Modal.Actions>
        </Modal>

        {/* <h1>{book.title} by {book.author}</h1>
          <Button onClick={() => viewEditions(book)}>View Alternate Editions</Button>
        <Button onClick={() => deleteUserBook(book.id)}>Remove Book from Shelf</Button> */}
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
