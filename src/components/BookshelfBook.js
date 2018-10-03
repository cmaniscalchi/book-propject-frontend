import React from "react"
import { connect } from 'react-redux'
import { selectBook, selectCover, clearSelectedCover, swapUserBookCover, getBookDetails } from '../actions'
import { Grid, Image, Card, Modal, Header, Button, Icon } from 'semantic-ui-react'

const BookshelfBook = ({ book, cover, selectBook, selectCover, clearSelectedCover, swapUserBookCover, getBookDetails, bookCovers, selectedBook, selectedCover, modalOpen }) => {
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
          <Image onClick={() => handleBookSelect(book)} src={image_url} style={{minWidth:'236px', minHeight:'177px'}} alt={title} />
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
    let { id, title } = selectedCover
    let newCover = cover.thumbnail.replace('&zoom=1&edge=curl', '&zoom=0')
    return (
      <Grid.Column>
        <Card>
          <Modal trigger={<Image src={newCover} style={{minWidth:'255px', minHeight:'191px'}} alt={title} />} >
            <Header icon='book' content='Change a Book Cover' />
            <Modal.Content>
              <p>Are you positive you'd like to make this change?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={clearSelectedCover}>
                <Icon name='remove' /> No, Please Take Me Back
              </Button>
              <Button onClick={() => handleCoverSwap(newCover, id)}>
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
  modalOpen: state.book.modalOpen
})

export default connect(mapStateToProps, { selectBook, selectCover, clearSelectedCover, getBookDetails, swapUserBookCover })(BookshelfBook)
