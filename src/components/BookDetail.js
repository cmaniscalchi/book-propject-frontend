import React from "react"
import { connect } from 'react-redux'

const BookDetail = props => {
  console.log("BookDetail props:", props)

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
    book: state.selectedBook
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveBook: book => {
      dispatch({
        type: 'SAVE_BOOK',
        payload: book
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
