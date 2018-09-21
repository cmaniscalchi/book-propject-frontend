import React, { Component } from 'react'
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// import NavBar from '../components/NavBar'
import LoginForm from '../components/LoginForm'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import '../assets/css/App.css'

class App extends Component {

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
  render() {
    // console.log("App:", props)
    return (
      <div>
        {/* <NavBar /> */}
        <LoginForm />
        <Bookshelf />
        <BookSearch />
      </div>
    )
  }
}

// export default withRouter(App)
// {/* <Switch> */}
// {/* </Switch> */}

export default App
