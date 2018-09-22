import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import { loginUser } from '../actions/userActions'

class LoginForm extends Component {
  state = { name: '', password: '' }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginSubmit = () => {
    this.props.loginUser(this.state.name, this.state.password)
    this.setState({ name: '', password: '' })
  }

  render() {
    console.log("Login Form:", this.state, this.props)
    return this.props.loggedIn ? (
      <Redirect to="/bookshelf" />
    ) : (
      <Segment>
        <Form
          onSubmit={this.handleLoginSubmit}
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message error header={this.props.failedLogin ? this.props.error : null} />
          <Form.Group widths="equal">
            <Form.Input
              label="username"
              placeholder="username"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Segment>
      )
    }
  }

  const mapStateToProps = ({ user: { authenticatingUser, failedLogin, error, user, loggedIn } }) => (
    { authenticatingUser, failedLogin, error, user, loggedIn }
  )

  export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm))
