import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookshelfBook from './BookshelfBook'
import { Grid, Message, Button } from 'semantic-ui-react'
import { setShelvedBooks, clearSelectedCover } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    let { setShelvedBooks, shelvedBooks } = this.props
    setShelvedBooks(shelvedBooks)
  }

  render() {
    // console.log("BookshelfList props:", this.props)
    let { shelvedBooks, bookCovers, selectedBook, clearSelectedCover } = this.props
    return (
      <div>
        <div>
          {bookCovers.length > 0 ? (
            <div>
              <Message size='large' floating floated='left' content="Please note: The covers displayed here may not all match your book exactly; they are Google Books's best guess at covers for this work." />
              <Button fluid onClick={clearSelectedCover}>Cancel Book Cover Change</Button>
              <br />
            </div>
          ) : null}
        </div>
        <div>
          <Grid relaxed columns={4}>
            {shelvedBooks.length > 0 && bookCovers.length === 0 ? shelvedBooks.map(book => <BookshelfBook book={book} key={book.goodreads_book_id} />) : null}
            {shelvedBooks.length > 0 && bookCovers.length > 0 ? bookCovers.map(cover => <BookshelfBook book={selectedBook} cover={cover} key={cover.thumbnail} />) : null}
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shelvedBooks: state.user.user.books,
  bookCovers: state.book.bookCovers,
  selectedBook: state.book.selectedBook
})

export default connect(mapStateToProps, { setShelvedBooks, clearSelectedCover })(BookshelfList)
