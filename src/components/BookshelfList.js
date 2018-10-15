import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookshelfBook from './BookshelfBook'
import { Grid } from 'semantic-ui-react'
import { setShelvedBooks, clearSelectedCover, clearSelectedBook } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    let { setShelvedBooks, shelvedBooks, clearSelectedBook, selectedBook, clearSelectedCover, selectedCover } = this.props
    setShelvedBooks(shelvedBooks)
    clearSelectedBook(selectedBook)
    clearSelectedCover(selectedCover)
  }

  render() {
    // console.log("BookshelfList props:", this.props)
    let { shelvedBooks, bookCovers, selectedBook } = this.props
    return (
        <div>
          <Grid relaxed columns={4}>
            {shelvedBooks.length > 0 && bookCovers.length === 0 ? shelvedBooks.map(book => <BookshelfBook book={book} key={book.goodreads_book_id} />).reverse() : null}
            {shelvedBooks.length > 0 && bookCovers.length > 0 ? bookCovers.map(cover => <BookshelfBook book={selectedBook} cover={cover} key={cover.imageId} />) : null}
          </Grid>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  shelvedBooks: state.user.user.books,
  bookCovers: state.book.bookCovers,
  selectedBook: state.book.selectedBook,
  selectedCover: state.book.selectedCover
})

export default connect(mapStateToProps, { setShelvedBooks, clearSelectedCover, clearSelectedBook })(BookshelfList)
