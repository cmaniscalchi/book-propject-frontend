import React from "react"
import { connect } from 'react-redux'
import { selectBook, selectCover, clearSelectedCover, swapUserBookCover, getBookDetails } from '../actions'
import { Grid, Image, Card } from 'semantic-ui-react'

const BookshelfBook = ({ book, cover, selectBook, selectCover, clearSelectedCover, swapUserBookCover, getBookDetails, bookCovers, selectedBook, selectedCover }) => {
  // console.log("BookshelfBook props:", book, cover, bookCovers, selectedBook, selectedCover)

  const handleBookSelect = book => {
    selectBook(book)
    selectCover(book)
    getBookDetails(book.goodreads_book_id)
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
    let { id, title } = selectedCover

    return (
      <Grid.Column>
        <Card>
          <Image src={cover.contentUrl} style={{minWidth: '135px', minHeight: '67px', display: 'block', width: '100%', height: 'auto'}} alt={title} />
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
