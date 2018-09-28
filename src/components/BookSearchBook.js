import React from "react"
import { connect } from 'react-redux'
import { selectBook, getBookDetails } from '../actions'
import { Grid, Image, Card } from 'semantic-ui-react'

const BookSearchBook = ({ book, selectBook, getBookDetails }) => {
  // console.log("BookSearchBook props:", book, selectBook)

  const handleBookSelect = book => {
    selectBook(book)
    getBookDetails(book.goodreads_book_id)
  }

  let placeholderImage = 'https://image.ibb.co/fzKNz9/Placeholder_Cover_Resize.png'

  if (book.best_book) {
    let originalImage = book.best_book.image_url.replace("m/", "l/").replace("m/", "l/").replace("col/", "com/")
    let image_url
    if (originalImage.includes("nophoto")) {
      image_url = placeholderImage
    } else {
      image_url = originalImage
    }

    let {title, id} = book.best_book
    let {name} = book.best_book.author
    let goodreads_author_id = book.best_book.author.id
    let publication_year = book.original_publication_year
    let formattedBook = { title, image_url, publication_year, goodreads_author_id, author: name, goodreads_book_id: id }

    return (
      <Grid.Column>
        <Card>
          <Image onClick={() => handleBookSelect(formattedBook)} src={image_url} alt={title} />
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
  } else {
    let originalImage = book.image_url.replace("m/", "l/").replace("m/", "l/").replace("col/", "com/")
    let image_url
    if (originalImage.includes("nophoto")) {
      image_url = placeholderImage
    } else {
      image_url = originalImage
    }

    let {title, id, publication_year} = book
    let {name} = book.authors.author
    let goodreads_author_id = book.authors.author.id
    let formattedBook = { title, image_url, publication_year, goodreads_author_id, author: name, goodreads_book_id: id }

    return (
      <Grid.Column>
        <Card>
          <Image onClick={() => handleBookSelect(formattedBook)} src={image_url} alt={title} />
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
