import React from "react"
import { connect } from 'react-redux'
import { selectBook, getBookDetails } from '../actions'
import { Grid, Image, Card } from 'semantic-ui-react'

const BookSearchBook = ({ book, selectBook, getBookDetails }) => {
  // console.log("BookSearchBook props:", book, selectBook, modalOpen)

  const handleBookSelect = book => {
    // debugger;
    selectBook(book)
    getBookDetails(book.goodreads_book_id)
  }

  if (book) {
    let placeholder_image = "https://image.ibb.co/fzKNz9/Placeholder_Cover_Resize.png"
    let {title, id} = book.best_book
    let image_url = book.best_book.image_url.replace("m/", "l/").replace("m/", "l/").replace("col/", "com/")
    let {name} = book.best_book.author
    let goodreads_author_id = book.best_book.author.id
    let publication_year = book.original_publication_year
    let formattedBook = { title, image_url, publication_year, goodreads_author_id, author: name, goodreads_book_id: id }

    return (
      <Grid.Column>
        <Card>
          <Image onClick={() => handleBookSelect(formattedBook)} src={image_url.includes("nophoto") ? placeholder_image : image_url} alt={title} />
          <Card.Content>
            {publication_year ? (
              <div>
                <Card.Header as='h5'>{title} by {name}</Card.Header>
                <Card.Meta>{publication_year}</Card.Meta>
              </div>
            ) : <Card.Header>{title} by {name}</Card.Header>}
          </Card.Content>
        </Card>
      </Grid.Column>
    )
  }
}

export default connect(null, { selectBook, getBookDetails })(BookSearchBook)
