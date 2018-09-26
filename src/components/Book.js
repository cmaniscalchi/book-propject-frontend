import React from "react"
import { connect } from 'react-redux'
import { selectBook } from '../actions'
import { Grid, Image } from 'semantic-ui-react'

const Book = ({ book, selectBook }) => {
  // console.log("Book props:", book, selectBook, modalOpen)

  // Only try to render books if a user has either books shelved or books returned in search results
  if (book) {
    let placeholder_image = "https://image.ibb.co/fzKNz9/Placeholder_Cover_Resize.png"

    // Formatting Books using data fetched from Goodreads (for rendering in Book Search results & posting to Rails)
    if (book.books_count) {
      let {title, id} = book.best_book
      let image_url = book.best_book.image_url.replace("m/", "l/").replace("m/", "l/").replace("col/", "com/")
      let {name} = book.best_book.author
      let authorId = book.best_book.author.id
      let publication_year = book.original_publication_year
      let formattedBook = {
        title, image_url, publication_year, author: name, goodreads_book_id: id, goodreads_author_id: authorId
      }

      return (
        <Grid.Column>
          <Image onClick={() => selectBook(formattedBook)} src={image_url.includes("nophoto") ? placeholder_image : image_url} alt={title} />
          <h3>{publication_year ? `${title} by ${name} (${publication_year})` : `${title} by ${name}`}</h3>
        </Grid.Column>
      )

    } else {
      // Formatting for Books with data fetched from backend (for rendering in a user's Bookshelf)
      let {author, image_url, publication_year, title} = book

      return (
        <Grid.Column>
          <Image onClick={() => selectBook(book)} src={image_url.includes("nophoto") ? placeholder_image : image_url} alt={title} />
          <h3>{publication_year ? `${title} by ${author} (${publication_year})` : `${title} by ${author}`}</h3>
        </Grid.Column>
      )
    }
  }
}

export default connect(null, { selectBook })(Book)
