import React from "react"
import { connect } from 'react-redux'
import { selectBook, selectCover, clearSelectedCover, swapUserBookCover, getBookDetails } from '../actions'
import { Grid, Image, Card, Modal, Header, Button, Icon } from 'semantic-ui-react'

const BookshelfBook = ({ book, cover, selectBook, selectCover, clearSelectedCover, swapUserBookCover, getBookDetails, bookCovers, selectedBook, selectedCover }) => {
  // console.log("BookshelfBook props:", book, cover, bookCovers, selectedBook, selectedCover)

  const handleBookSelect = book => {
    selectBook(book)
    selectCover(book)
    getBookDetails(book.goodreads_book_id)
  }

  const handleCoverSwap = (newCover, id) => {
    swapUserBookCover(newCover, id)
    clearSelectedCover()
  }

  if (book) {
    let {author, image_url, publication_year, title} = book

    return (
      <Grid.Column>
        <Card>
          <Image onClick={() => handleBookSelect(book)} src={image_url} style={{minWidth: '135px', minHeight: '67px', display: 'block', width: '100%', height: 'auto'}} alt={title} />
          <Card.Content>
            {publication_year ? (
              <div>
                <Card.Header as='h5'>{title} by {author}</Card.Header>
                <Card.Meta>{publication_year}</Card.Meta>
              </div>
            ) : <Card.Header>{title} by {author}</Card.Header>}
          </Card.Content>
        </Card>
      </Grid.Column>
    )
  } else if (cover && selectedCover) {
    // debugger;
    let { id, title } = selectedCover
    return (
      <Grid.Column>
        <Card>
          <Modal trigger={<Image src={cover.contentUrl} style={{minWidth: '135px', minHeight: '67px', display: 'block', width: '100%', height: 'auto'}} alt={title} />} closeIcon >
            <Header icon='book' content='Change a Book Cover' />
            <Modal.Content>
              <p>Are you positive you'd like to make this change?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={clearSelectedCover}>
                <Icon name='remove' /> No, Please Take Me Back
              </Button>
              <Button onClick={() => handleCoverSwap(cover.contentUrl, id)}>
                <Icon name='checkmark' /> Yes, Change It!
              </Button>
            </Modal.Actions>
          </Modal>
        </Card>
      </Grid.Column>
    )
  } else {
    return null
  }
}

const mapStateToProps = state => ({
  bookCovers: state.book.bookCovers,
  selectedBook: state.book.selectedBook,
  selectedCover: state.book.selectedCover,
})

export default connect(mapStateToProps, { selectBook, selectCover, clearSelectedCover, getBookDetails, swapUserBookCover })(BookshelfBook)
