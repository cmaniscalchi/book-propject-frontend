import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookshelfBook from './BookshelfBook'
import { Grid } from 'semantic-ui-react'
import { clearSelectedBook, clearSelectedCover, setShelvedBooks } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    let { books, clearSelectedBook, clearSelectedCover, setShelvedBooks } = this.props
    setShelvedBooks(books)
    clearSelectedBook()
    clearSelectedCover()
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

const mapStateToProps = ({ book: { bookCovers }, user: { user: { books } } }) => ({ bookCovers, books })

export default connect(mapStateToProps, { clearSelectedBook, clearSelectedCover, setShelvedBooks })(BookshelfList)
