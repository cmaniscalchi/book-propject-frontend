import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter, Redirect } from 'react-router-dom'
import { Button, Form, Segment } from 'semantic-ui-react'

class LoginForm extends Component {
  state = { name: '', password: '' }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log("LoginForm:", this.props, this.state)
    // return this.props.loggedIn ? (
    //   <Redirect to="/profile" />
    // ) : (
    return (
      <Segment>
        <Form
          // onSubmit={this.handleLoginSubmit}
          // loading={this.props.authenticatingUser}
          // error={this.props.failedLogin}
        >
          {/* <Message error header={this.props.failedLogin ? this.props.error : null} /> */}
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

  const mapStateToProps = state => {
    let {authenticatingUser, failedLogin, error, user, loggedIn} = state.user
    return {authenticatingUser, failedLogin, error, user, loggedIn}
  }

  export default connect(mapStateToProps)(LoginForm)
