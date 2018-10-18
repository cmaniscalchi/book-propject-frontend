import React from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating } from 'semantic-ui-react'
import { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, deleteUserBook, searchBookCovers } from '../../actions'

const BookDetailModal = ({ bookCovers, closeModal, clearCoverResults, clearSelectedBook, clearSelectedCover, deleteUserBook, modalOpen, searchBookCovers, selectedBook, selectedBookDetails }) => {

  let striptags = require('striptags')
  let { author, image_url, publication_year, title, id } = selectedBook
  let { average_rating, description, link, work } = selectedBookDetails

  const handleBookRemove = bookId => {
    deleteUserBook(bookId)
    clearSelectedBook()
    clearSelectedCover()
    closeModal()
  }

  const handleBookCoverSearch = ({ author, title }) => {
    searchBookCovers(title, author)
    if (bookCovers.length > 20) {
      closeModal()
    }
  }

  const handleModalClose = () => {
    clearSelectedBook()
    clearSelectedCover()
    clearCoverResults()
    closeModal()
  }

    return (
      <div>
        <Modal size='large' open={modalOpen} onClose={handleModalClose} closeIcon >
          <Modal.Header className='modal'>My Shelved Books</Modal.Header>
          <Modal.Content image>
            <Image size='medium' style={{minWidth:'255px', minHeight:'191px', maxWidth:'255px', maxHeight:'389px'}} src={image_url} />
            <Modal.Description>
              <Header as='h3'>{title} by {author}</Header>
              {publication_year ? <Header sub>Original Publication Year: {publication_year}</Header> : null}
              <br />
              <p>{striptags(description)}</p>
              <h5>Average Goodreads User Rating (out of {work.ratings_count.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )})</h5>
              <Rating defaultRating={Math.round(average_rating)} maxRating={5} disabled />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => handleBookCoverSearch(selectedBook)}>Display an Alternate Cover</Button>
            <Button onClick={() => handleBookRemove(id)}>Remove Book from Shelf</Button>
            <a href={ link } target='_blank'><Button>View Book on Goodreads</Button></a>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

const mapStateToProps = ({ book: { bookCovers, modalOpen, selectedBook, selectedBookDetails } }) => ({ bookCovers, modalOpen, selectedBook, selectedBookDetails })

export default connect(mapStateToProps, { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, deleteUserBook, searchBookCovers })(BookDetailModal)
