import React from "react"
import { connect } from 'react-redux'
import { saveBook } from '../actions'

const BookDetail = props => {
  // console.log("BookDetail props:", props)

  let {author, title, publication_year} = props.book

  // const saveBook = book => {
  //   props.dispatch({
  //     type: 'SAVE_BOOK',
  //     payload: props.book
  //   })
  // }

  return (
    <div>
      <h1>{title} by {author} ({publication_year})</h1>
      <button onClick={() => props.saveBook(props.book)}>Save Book to Bookshelf</button>
    </div>
  )
}

function mapStateToProps(state) {
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
