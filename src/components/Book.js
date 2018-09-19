import React from "react"
import { connect } from 'react-redux'

const Book = (props) => {
  console.log("Book props:", props)

  // let year = props.book.original_publication_year
  // let {title, image_url} = props.book.best_book
  // let author = props.book.best_book.author.name
  let {author, title, publication_year} = props.book
  //

  const handleClick = () => {
    props.dispatch({
      type: 'SELECT_BOOK',
      payload: props.book
    })
  }

  return (
    <div onClick={handleClick}>
      {/* <img src={image_url} alt={title} /> */}
      {/* <h3>{year ? `${title} by ${author} (${year})` : `${title} by ${author}`}</h3> */}
      <h3>{title} by {author} ({publication_year})</h3>
    </div>
  )
}

function mapDispatchToProps() {
  return {}
}

export default connect()(Book)
