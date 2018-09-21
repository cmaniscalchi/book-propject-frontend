import React from "react"
import { connect } from 'react-redux'
import { saveBook } from '../actions'
import { Container, Button } from 'semantic-ui-react'

const BookDetail = props => {

  // const saveBook = book => {
  //   props.dispatch({
  //     type: 'SAVE_BOOK',
  //     payload: props.book
  //   })
  // }
  if (props.book) {
    let {title} = props.book.best_book
    return (
      <Container>
        <h1>{title}</h1>
        <Button onClick={() => props.saveBook(props.book)}>Save Book to Bookshelf</Button>
      </Container>
    )
  } else {
    return null
  }
}

function mapStateToProps(state) {
  // console.log("BookDetail State:", state)
  return {
    book: state.book.selectedBook
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     saveBook: book => dispatch(saveBookAction(book))
//   }
// }

export default connect(mapStateToProps, { saveBook })(BookDetail)
