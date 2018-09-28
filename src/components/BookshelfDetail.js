import React, { Component } from "react"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Header, Image, Modal, Rating } from 'semantic-ui-react'
import { deleteUserBook, searchAuthorBooks, clearSelectedBook } from '../actions'

class BookshelfDetail extends Component {
  state = { redirect: false }

  handleBookRemoveOnClick = (bookId) => {
    let { deleteUserBook, clearSelectedBook } = this.props
    deleteUserBook(bookId)
    clearSelectedBook()
  }

  handleAuthorBookSearch = (authorId) => {
    let { searchAuthorBooks, clearSelectedBook } = this.props
    searchAuthorBooks(authorId)
    clearSelectedBook()
    this.setState({ redirect: true })
  }

  render() {
    console.log("BookshelfDetail:", this.props, this.state.redirect)

    if (this.props.book && this.props.details) {
      let striptags = require('striptags')
      let { details, modalOpen, book: { author, image_url, publication_year, title, id, goodreads_author_id } } = this.props

      return (
        <div>
          { this.state.redirect ? <Redirect to='/search' /> : null }
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
              { goodreads_author_id ? <Button onClick={() => this.handleAuthorBookSearch(goodreads_author_id)}>Other Works by {author}</Button> : null }
              <Button onClick={() => this.handleBookRemoveOnClick(id)}>Remove Book from Shelf</Button>
              <a href={ details.link } target='_blank'><Button>View Book on Goodreads</Button></a>
            </Modal.Actions>
          </Modal>
        </div>
      )
    } else {
      return null
    }
  }
}


function mapStateToProps(state) {
  return {
    book: state.book.selectedBook,
    details: state.book.selectedBookDetails,
    modalOpen: state.book.modalOpen
  }
}

export default connect(mapStateToProps, { deleteUserBook, searchAuthorBooks, clearSelectedBook })(BookshelfDetail)
