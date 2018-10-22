import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookshelfBook from './BookshelfBook'
import { Grid } from 'semantic-ui-react'
import { clearSelectedBook, clearSelectedCover, setDefaultBookshelf } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    let { clearSelectedBook, clearSelectedCover, currentBookshelf, setDefaultBookshelf } = this.props
    if (!currentBookshelf) {
      setDefaultBookshelf()
      clearSelectedBook()
      clearSelectedCover()
    } else {
      clearSelectedBook()
      clearSelectedCover()
    }
  }

  render() {
    // console.log("BookshelfList props:", this.props)
    let { user, bookCovers, currentBookshelf } = this.props
    if (currentBookshelf) {
      return (
        <div>
          <Grid relaxed columns={4}>
            {user.books.length > 0 && bookCovers.length === 0 ? user.books.filter(book => book.bookshelf_id === currentBookshelf.id).sort((bookA, bookB) => bookA.publication_year - bookB.publication_year).map(book => <BookshelfBook book={book} key={book.goodreads_book_id} />) : null}
            {user.books.length > 0 && bookCovers.length > 0 ? bookCovers.map(cover => <BookshelfBook cover={cover} key={cover.imageId} />) : null}
          </Grid>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = ({ book: { bookCovers }, user: { currentBookshelf, user } }) => ({ bookCovers, user, currentBookshelf })

export default connect(mapStateToProps, { clearSelectedBook, clearSelectedCover, setDefaultBookshelf })(BookshelfList)
