import React from "react"
import { connect } from 'react-redux'
import { selectBook } from '../actions'
import { Grid, Image } from 'semantic-ui-react'

// import * as actions from '../actions'

const Book = props => {
  // console.log("Book props:", props)

  // const handleClick = () => {
  //   props.dispatch({
  //     type: 'SELECT_BOOK',
  //     payload: props.book
  //   })
  // }
  if (props.book) {


// Formatting Book cards using data fetched from Goodreads
    if (props.book.books_count) {
      let publication_year = props.book.original_publication_year
      let {title, image_url} = props.book.best_book
      let author = props.book.best_book.author.name

      return (
        <Grid.Column>
          <Image onClick={() => props.selectBook(props.book)} src={image_url} alt={title} />
          <h3>{publication_year ? `${title} by ${author} (${publication_year})` : `${title} by ${author}`}</h3>
        </Grid.Column>
      )

    } else {
      // Formatting Book cards with data from backend database
      let {author, image_url, publication_year, title} = props.book

      return (
        <Grid.Column>
          {image_url ? <Image src={image_url} alt={title} /> : null}
          <h3>{publication_year ? `${title} by ${author} (${publication_year})` : `${title} by ${author}`}</h3>
        </Grid.Column>
      )
    }
  }
}

  // function mapDispatchToProps(dispatch) {
  //   return {
  //     selectBook: (book) => dispatch(selectBookAction(book))
  //   }
  // }

  export default connect(null, { selectBook })(Book)
