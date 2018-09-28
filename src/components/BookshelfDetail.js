import React from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating } from 'semantic-ui-react'
import { deleteUserBook, clearSelectedBook } from '../actions'

const BookshelfDetail = ({ details, modalOpen, book, deleteUserBook, clearSelectedBook }) => {
  // console.log("BookshelfDetail:", details, modalOpen, book)

  const handleBookRemoveOnClick = (bookId) => {
    deleteUserBook(bookId)
    clearSelectedBook()
  }

  if (book && details) {
    let striptags = require('striptags')
    let { author, image_url, publication_year, title, id } = book

    return (
      <div>
        <Modal size='large' open={modalOpen} onClose={clearSelectedBook}>
          <Modal.Header>My Shelved Books</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={image_url} />
            <Modal.Description>
              <Header as='h3'>{title} by {author}</Header>
              { publication_year && details.publication_year ? <Header sub>Original Publication Year: {publication_year}<br />Edition Year: {details.publication_year}</Header> : <Header sub>Original Publication Year: {publication_year}</Header> }
              <br />
              <p>{striptags(details.description)}</p>
              <h5>Average Goodreads User Rating (out of {details.work.ratings_count.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )})</h5>
              <Rating defaultRating={Math.round(details.average_rating)} maxRating={5} disabled />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => handleBookRemoveOnClick(id)}>Remove Book from Shelf</Button>
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

export default connect(mapStateToProps, { deleteUserBook, clearSelectedBook })(BookshelfDetail)
