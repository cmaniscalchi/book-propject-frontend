import React, { Component } from 'react'
import '../assets/css/App.css'
import SearchBar from './SearchBar'
import BookSearchList from './BookSearchList'

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <BookSearchList />
      </div>
    )
  }
}

export default App
