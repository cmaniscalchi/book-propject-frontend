import React from "react"
import { connect } from 'react-redux'
import { selectBook, getBookDetails } from '../actions'
import { Grid, Image, Card } from 'semantic-ui-react'

const BookshelfBook = ({ book, selectBook, getBookDetails }) => {
  // console.log("BookshelfBook props:", book, selectBook)

  const handleBookSelect = book => {
    selectBook(book)
    getBookDetails(book.goodreads_book_id)
  }

  if (book) {
    let placeholder_image = "https://image.ibb.co/fzKNz9/Placeholder_Cover_Resize.png"
    let {author, image_url, publication_year, title} = book

    return (
      <Grid.Column>
        <Card>
          <Image onClick={() => handleBookSelect(book)} src={image_url.includes("nophoto") ? placeholder_image : image_url} alt={title} />
          <Card.Content>
            {publication_year ? (
              <div>
                <Card.Header as='h5'>{title} by {author}</Card.Header>
                <Card.Meta>{publication_year}</Card.Meta>
              </div>
            ) : <Card.Header>{title} by {author}</Card.Header>}
          </Card.Content>
        </Card>
      </Grid.Column>
    )

  }
}

export default connect(null, { selectBook, getBookDetails })(BookshelfBook)
