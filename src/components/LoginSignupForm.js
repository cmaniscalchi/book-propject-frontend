import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, Tab, Form, Message } from 'semantic-ui-react'
import { loginUser, signUpUser } from '../actions/userActions'

class LoginSignupForm extends Component {
  state = { name: '', password: '' }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginSubmit = () => {
    this.props.loginUser(this.state.name, this.state.password)
    this.setState({ name: '', password: '' })
  }

  handleSignUpSubmit = () => {
    console.log("I hit the sign up submit function")
    this.props.signUpUser(this.state.name, this.state.password)
    this.setState({ name: '', password: '' })
  }

  render() {
    let { authenticatingUser, failedLogin, error, loggedIn } = this.props

    const nameInput = (
      <Form.Input
        label="Username"
        placeholder="Username"
        name="name"
        onChange={this.handleInputChange}
        value={this.state.name}
      />
    )

    const passwordInput = (
      <Form.Input
        type="password"
        label="Password"
        placeholder="Password"
        name="password"
        onChange={this.handleInputChange}
        value={this.state.password}
      />
    )

    const logInForm = (
      <Form
        onSubmit={this.handleLoginSubmit}
        loading={authenticatingUser}
        error={failedLogin}
      >
        <Message error header={failedLogin ? error : null} />
        <Form.Group widths="equal">
          {nameInput}
          {passwordInput}
        </Form.Group>
        <Button type="submit">Log In</Button>
      </Form>
      )

      const signUpForm = (
        <Form
          onSubmit={this.handleSignUpSubmit}
          loading={authenticatingUser}
          error={failedLogin}
        >
          {/* <Message error header={failedLogin ? error : null} /> */}
          <Form.Group widths="equal">
            {nameInput}
            {passwordInput}
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
        )

        const panes = [
          { menuItem: 'Log In', render: () => <Tab.Pane>{logInForm}</Tab.Pane> },
          { menuItem: 'Sign Up', render: () => <Tab.Pane>{signUpForm}</Tab.Pane> }
        ]

        return loggedIn ? <Redirect to="/bookshelf" /> : <Tab style={{width:'66%'}} panes={panes} />
      }
    }

    const mapStateToProps = ({ user: { authenticatingUser, failedLogin, error, loggedIn } }) => (
      { authenticatingUser, failedLogin, error, loggedIn }
    )

    export default withRouter(connect(mapStateToProps, { loginUser, signUpUser })(LoginSignupForm))
