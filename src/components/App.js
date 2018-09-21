import React, { Component } from 'react'
import '../assets/css/App.css'
import Bookshelf from './Bookshelf'
import SearchBar from './SearchBar'
import BookSearchList from './BookSearchList'
import BookDetail from './BookDetail'

class App extends Component {

// TEST User Create
  // componentDidMount() {
  //   fetch('http://localhost:3000/api/v1/users', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         name: 'Rose',
  //         password: 'hi',
  //         email: 'rose@dummyemail.com'
  //       }
  //     })
  //   })
  //   .then(r => r.json())
  //   .then(console.log)
  // }

  render() {
    return (
      <div>
        <Bookshelf />
        <SearchBar />
        <BookSearchList />
        <BookDetail />
      </div>
    )
  }
}

export default App
