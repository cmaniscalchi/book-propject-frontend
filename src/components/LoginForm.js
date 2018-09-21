import React, { Component } from "react"
import { Button, Form, Segment } from 'semantic-ui-react'

export default class LoginForm extends Component {
  state = {
    name: '',
    password: ''
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => console.log("Input:", this.state))
  }

  render() {
    // return this.props.loggedIn ? (
    //   <Redirect to="/profile" />
    // ) : (
    return (
      <Segment>
        <Form
          // onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
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
