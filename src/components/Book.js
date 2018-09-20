import React from "react"
import { connect } from 'react-redux'
import { selectBook } from '../actions'
// import * as actions from '../actions'

const Book = props => {
  // console.log("Book props:", props)

  let year = props.book.original_publication_year
  let {title, image_url} = props.book.best_book
  let author = props.book.best_book.author.name

  // const handleClick = () => {
  //   props.dispatch({
  //     type: 'SELECT_BOOK',
  //     payload: props.book
  //   })
  // }

  return (
    <div onClick={() => props.selectBook(props.book)}>
      <img src={image_url} alt={title} />
      <h3>{year ? `${title} by ${author} (${year})` : `${title} by ${author}`}</h3>
    </div>
  )
}

// function mapDispatchToProps(dispatch) {
//   return {
//     selectBook: (book) => dispatch(selectBookAction(book))
//   }
// }

export default connect(null, { selectBook })(Book)
