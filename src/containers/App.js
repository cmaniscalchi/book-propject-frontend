import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'
import LoginSignupForm from '../components/LoginSignupForm'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'

const App = () => {

  const background = require('../assets/imgs/exclusive_paper/exclusive_paper_@2X.png')

  return (
    <Fragment>
      <NavBar />
      <div style={{
        backgroundImage: `url(${background})`,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        height: "100%",
        width: "100%"
      }}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/bookshelf" />} />
          <Route exact path="/login" component={LoginSignupForm} />
          <Route exact path="/bookshelf" component={Bookshelf}/>
          <Route exact path="/search" component={BookSearch}/>
        </Switch>
      </div>
    </Fragment>
  )
}

export default withRouter(App)
