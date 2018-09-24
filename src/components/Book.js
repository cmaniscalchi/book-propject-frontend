import React from "react"
import { connect } from 'react-redux'
import { selectBook } from '../actions'
import { Grid, Image } from 'semantic-ui-react'

const Book = ({ book, selectBook }) => {
  // console.log("Book props:", book)

  // Only try to render books if a user has either books shelved or books returned in search results
  if (book) {

    // Formatting for Books using data fetched from Goodreads (for rendering in Book Search results)
    if (book.books_count) {
      let publication_year = book.original_publication_year
      let {title, image_url} = book.best_book
      let author = book.best_book.author.name

      return (
        <Grid.Column>
          <Image onClick={() => selectBook(book)} src={image_url} alt={title} />
          <h3>{publication_year ? `${title} by ${author} (${publication_year})` : `${title} by ${author}`}</h3>
        </Grid.Column>
      )

    } else {
      // Formatting for Books with data fetched from backend (for rendering in a user's Bookshelf)
      let {author, image_url, publication_year, title} = book

      return (
        <Grid.Column>
          {image_url ? <Image onClick={() => selectBook(book)} src={image_url} alt={title} /> : null}
          <h3>{publication_year ? `${title} by ${author} (${publication_year})` : `${title} by ${author}`}</h3>
        </Grid.Column>
      )
    }
  }
}

export default connect(null, { selectBook })(Book)
