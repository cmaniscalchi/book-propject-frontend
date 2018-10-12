import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, Tab, Form, Message, Grid, Header, Image } from 'semantic-ui-react'
import { loginUser, signUpUser } from '../actions'

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
    this.props.signUpUser(this.state.name, this.state.password)
    this.setState({ name: '', password: '' })
  }

  render() {
    let { authenticatingUser, failedLogin, error, loggedIn } = this.props
    let { name, password } = this.state

    const nameInput = (
      <Form.Input
        label="Username"
        placeholder="Username"
        name="name"
        onChange={this.handleInputChange}
        value={name}
      />
    )

    const passwordInput = (
      <Form.Input
        type="password"
        label="Password"
        placeholder="Password"
        name="password"
        onChange={this.handleInputChange}
        value={password}
      />
    )

    const loginImage = require('../assets/img/Maxfield-Parrish.jpg')
    const signupImage = require('../assets/img/Isaac-Israels.jpg')

    const logInForm = (
      <div>
        <Header as='h2' textAlign='center'>Log In to Your Account</Header>
        <Image src={loginImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}/>
        <br />
        <Form size='large'
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
      </div>
      )

      const signUpForm = (
        <div>
          <Header as='h2' textAlign='center'>Create a New Ex Libris Account</Header>
          <Image src={signupImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '80%' }}/>
          <br />
          <Form size='large'
            onSubmit={this.handleSignUpSubmit}
            loading={authenticatingUser}
            error={failedLogin}
          >
            <Message error header={failedLogin ? error : null} />
            <Form.Group widths="equal">
              {nameInput}
              {passwordInput}
            </Form.Group>
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
        )

        const panes = [
          { menuItem: 'Log In', render: () => <Tab.Pane>{logInForm}</Tab.Pane> },
          { menuItem: 'Sign Up', render: () => <Tab.Pane>{signUpForm}</Tab.Pane> }
        ]

        return loggedIn ? <Redirect to="/bookshelf" /> : (
          <div>
            <br />
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 800 }}>
                <Tab style={{ width: 800 }} panes={panes} />
              </Grid.Column>
            </Grid>
          </div>
        )
      }
    }

    const mapStateToProps = ({ user: { authenticatingUser, failedLogin, error, loggedIn } }) => (
      { authenticatingUser, failedLogin, error, loggedIn }
    )

    export default withRouter(connect(mapStateToProps, { loginUser, signUpUser })(LoginSignupForm))
