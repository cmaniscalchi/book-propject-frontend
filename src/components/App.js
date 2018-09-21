import React from 'react'
import Bookshelf from './Bookshelf'
import SearchBar from './SearchBar'
import BookSearchList from './BookSearchList'
import BookDetail from './BookDetail'
import '../assets/css/App.css'

const App = props => {

  // TEST User Create
  //   componentDidMount() {
  //     fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           name: 'Rose',
  //           password: 'hi',
  //           email: 'rose@dummyemail.com'
  //         }
  //       })
  //     })
  //     .then(r => r.json())
  //     .then(console.log)
  //   }

  return (
    <div>
      <Bookshelf />
      <SearchBar />
      <BookSearchList />
      <BookDetail />
    </div>
  )
}

export default App
