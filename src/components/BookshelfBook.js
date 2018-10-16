import React from "react"
import { connect } from 'react-redux'
import { selectBook, selectCover, clearSelectedCover, swapUserBookCover, getBookDetails, openModal } from '../actions'
import { Grid, Image, Card } from 'semantic-ui-react'

const BookshelfBook = ({ book, cover, selectBook, selectCover, clearSelectedCover, swapUserBookCover, getBookDetails, bookCovers, selectedBook, selectedCover, openModal }) => {
  // console.log("BookshelfBook props:", book, cover, bookCovers, selectedBook, selectedCover)

  let placeholderImage = 'https://image.ibb.co/fzKNz9/Placeholder_Cover_Resize.png'

  const handleBookSelect = book => {
    selectBook(book)
    getBookDetails(book.goodreads_book_id)
  }

  const handleCoverSelect = cover => {
    selectCover(cover)
    openModal()
  }

  // the book prop, inherited from BookshelfList, indicates a shelved book
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
    // the cover prop, inherited from BookshelfList, indicates an alternate cover search result
  } else if (cover && selectedBook) {
    let { title } = selectedBook

    return (
      <Grid.Column>
        <Card>
          <Image onClick={() => handleCoverSelect(cover)} src={cover.contentUrl} onError={event => event.target.src = placeholderImage} style={{minWidth: '135px', minHeight: '67px', display: 'block', width: '100%', height: 'auto'}} alt={title} />
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

export default connect(mapStateToProps, { selectBook, selectCover, clearSelectedCover, getBookDetails, swapUserBookCover, openModal })(BookshelfBook)
