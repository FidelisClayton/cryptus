import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import {
  auth,
  addUser,
  googleAuth,
  facebookAuth,
  twitterAuth,
  githubAuth,
  userRef
} from '../firebase'

import InputGroup from './InputGroup'
import Button from './Button'
import AuthProviders from './AuthProviders'

export default class Register extends Component {
  constructor () {
    super()

    this.state = {
      email: null,
      password: null,
      error: null,
      redirectToHome: false
    }
  }

  onInputChange = inputName =>
    event => this.setState({
      [inputName]: event.target.value
    })

  handleAuthProviderLoginError = (error) => {
    this.setState({
      error: error.message
    })

    return error
  }

  handleAuthSuccess = () => {
    this.setState({
      redirectToHome: true
    })
  }

  handleFormSubmit = event => {
    const {
      email,
      password
    } = this.state

    event.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          email: null,
          password: null,
          error: null,
          redirectToHome: true
        })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  render () {
    const { from } = this.props.location.state || '/'

    return (
      <div className="login">
        { this.state.redirectToHome && (
            <Redirect to={from || '/home'} />
          )
        }

        <div className="auth__wrapper">
          <h2 className="heading u-text-center">Welcome back to Cryptus!</h2>
          <h3 className="heading-description u-text-center">Register to have access to the best Crypto portfolio tracker</h3>

          <form
            className="auth__login-form"
            onSubmit={this.handleFormSubmit}
          >
            <InputGroup
              inputSize="small"
              inputProps={{
                placeholder: 'Email address',
                type: 'email'
              }}
              onChange={this.onInputChange('email')}
            />

            <InputGroup
              type="password"
              inputSize="small"
              inputProps={{
                placeholder: 'Password',
                type: 'password'
              }}
              onChange={this.onInputChange('password')}
            />

            <div className="auth__submit">
              <button
                type="submit"
                className="button__primary button--small"
              >
                Register
              </button>
            </div>

            <AuthProviders
              handleAuthSuccess={this.handleAuthSuccess}
              handleAuthProviderLoginError={this.handleAuthProviderLoginError}
            />

            { this.state.error && (
                <div className="auth__error">
                  { this.state.error }
                </div>
              )
            }
          </form>
        </div>
      </div>
    )
  }
}
