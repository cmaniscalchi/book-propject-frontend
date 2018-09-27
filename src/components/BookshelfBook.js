import React from "react"
import { connect } from 'react-redux'
import { selectBook } from '../actions'
import { Grid, Image, Card } from 'semantic-ui-react'

const BookshelfBook = ({ book, selectBook }) => {
  // console.log("BookshelfBook props:", book, selectBook, modalOpen)
  // Only try to render books if a user has either books shelved or books returned in search results
  if (book) {
    let placeholder_image = "https://image.ibb.co/fzKNz9/Placeholder_Cover_Resize.png"
    let {author, image_url, publication_year, title} = book

    return (
      <Grid.Column>
        <Card>
          <Image onClick={() => selectBook(book)} src={image_url.includes("nophoto") ? placeholder_image : image_url} alt={title} />
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

export default connect(null, { selectBook })(BookshelfBook)
