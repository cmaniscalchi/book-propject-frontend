import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookshelfBook from './BookshelfBook'
import { Grid } from 'semantic-ui-react'
import { clearSelectedBook, clearSelectedCover, setDefaultBookshelf, setShelvedBooks } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    let { books, clearSelectedBook, clearSelectedCover, currentBookshelf, setDefaultBookshelf, setShelvedBooks } = this.props
    if (!currentBookshelf) {
      setDefaultBookshelf()
      setShelvedBooks(books)
      clearSelectedBook()
      clearSelectedCover()
    } else {
      clearSelectedBook()
      clearSelectedCover()
    }
  }

  render() {
    // console.log("BookshelfList props:", this.props)
    let { books, bookCovers } = this.props
    return (
        <div>
          <Grid relaxed columns={4}>
            {books.length > 0 && bookCovers.length === 0 ? books.map(book => <BookshelfBook book={book} key={book.goodreads_book_id} />).reverse() : null}
            {books.length > 0 && bookCovers.length > 0 ? bookCovers.map(cover => <BookshelfBook cover={cover} key={cover.imageId} />) : null}
          </Grid>
        </div>
    )
  }
}

const mapStateToProps = ({ book: { bookCovers }, user: { currentBookshelf, user: { books } } }) => ({ bookCovers, books, currentBookshelf })

export default connect(mapStateToProps, { clearSelectedBook, clearSelectedCover, setDefaultBookshelf, setShelvedBooks })(BookshelfList)
