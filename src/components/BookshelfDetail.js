import React, { Link } from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating, Grid } from 'semantic-ui-react'
import { deleteUserBook, viewEditions, clearSelectedBook } from '../actions'

const BookshelfDetail = ({ book, details, modalOpen, deleteUserBook, viewEditions, clearSelectedBook }) => {
  console.log("BookshelfDetail:", details)

const handleBookRemoveOnClick = (bookId) => {
  deleteUserBook(bookId)
  clearSelectedBook()
}

  if (book && details) {

  return (
      <div>
        <Modal size='large' open={modalOpen} onClose={clearSelectedBook}>
          <Modal.Header>My Shelved Books</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={book.image_url} />
            <Modal.Description>
              <Header as='h3'>{book.title} by {book.author}</Header>
              { book.publication_year && details.publication_year ? <Header sub>Original Publication Year: {book.publication_year}<br />Edition Year: {details.publication_year}</Header> : <Header sub>Original Publication Year: {book.publication_year}</Header> }
              <br />
              <p>{details.description}</p>
              <h5>Average Goodreads User Rating (Out of {details.work.ratings_count.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )})</h5>
              <Rating defaultRating={Math.round(details.average_rating)} maxRating={5} disabled />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => viewEditions(book)}>View Alternate Editions</Button>
            <Button onClick={() => handleBookRemoveOnClick(book.id)}>Remove Book from Shelf</Button>
            <a href={ details.link } target='_blank'><Button>View Book on Goodreads</Button></a>
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
    details: state.book.selectedBookDetails,
    modalOpen: state.book.modalOpen
  }
}

export default connect(mapStateToProps, { deleteUserBook, viewEditions, clearSelectedBook })(BookshelfDetail)
