import React from 'react'
import { connect } from 'react-redux'
import Book from './Book'
import { Grid } from 'semantic-ui-react'

const BookshelfList = ({ books }) => {

  console.log("BookshelfList props:", books)
  function componentDidMount() {
  }

  return (
    <div>
      <Grid relaxed columns={4}>
        {books.length > 0 ? books.map(book => <Book book={book} key={book.goodreads_book_id} />) : null}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  books: state.user.user.books
})

export default connect(mapStateToProps)(BookshelfList)
