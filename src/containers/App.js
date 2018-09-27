import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'
import LoginSignupForm from '../components/LoginSignupForm'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import '../assets/css/App.css'

const App = () => {

  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/bookshelf" />} />
        <Route exact path="/login" component={LoginSignupForm} />
        <Route exact path="/bookshelf" component={Bookshelf}/>
        <Route exact path="/search" component={BookSearch}/>
      </Switch>
    </Fragment>
  )
}

export default withRouter(App)
