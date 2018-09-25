import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Loader } from 'semantic-ui-react'

const withAuth = WrappedComponent => {
  class AuthorizedComponent extends Component {

    componentDidMount() {
      if (localStorage.getItem('jwt') && !this.props.loggedIn) {
        this.props.fetchCurrentUser()
      }
    }

    render() {
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent />
      } else if (localStorage.getItem('jwt') && this.props.authenticatingUser) {
        return <Loader active inline="centered" />
      } else {
        return <Redirect to="/login" />
      }
    }
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.user.loggedIn,
      authenticatingUser: state.user.authenticatingUser
    }
  }

  return connect(mapStateToProps, actions)(AuthorizedComponent)
}

export default withAuth
