import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'
import LoginForm from '../components/LoginForm'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
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
  // console.log('%c APP Props: ', 'color: cyan', props)
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/bookshelf" />} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/bookshelf" component={Bookshelf}/>
        <Route exact path="/search" component={BookSearch}/>
      </Switch>
    </Fragment>
  )
}

export default withRouter(App)
