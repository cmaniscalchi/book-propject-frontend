import React from 'react'
import { connect } from 'react-redux'
import Book from './Book'
import { Container, Grid } from 'semantic-ui-react'

const Bookshelf = props => {
  // console.log("Bookshelf props:", props)
  return (
    <div>
      <Container>
        <Grid relaxed columns={4}>
          {props.books.length > 0 ? props.books.map(book => <Book book={book} key={book.goodreads_book_id} />) : null}
        </Grid>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  // console.log("Bookshelf state:", state)
  return {
    books: state.book.shelvedBooks
  }
}

export default connect(mapStateToProps)(Bookshelf)
