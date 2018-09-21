import React from 'react'
import BookshelfList from '../components/BookSearchList'
// import BookDetail from '../components/BookDetail'
import { Container } from 'semantic-ui-react'

const Bookshelf = () => {
  // console.log("BookshelfList props:", props)
  return (
    <Container>
      <BookshelfList />
      {/* <BookDetail /> */}
    </Container>
  )
}

export default Bookshelf
