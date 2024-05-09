import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMessage: ''}

  onChangingUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangingPassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.push('/')
  }

  onLoginFailure = errorMessage => {
    console.log(errorMessage)
    this.setState({showErrorMsg: true, errorMessage})
  }

  onClickingSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const loginUrl = 'https://apis.ccbp.in/login'

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  renderUsernameField = () => (
    <div className="form-item">
      <label htmlFor="username">USERNAME</label>
      <input
        type="text"
        id="username"
        placeholder="Enter username"
        className="form-control"
        onChange={this.onChangingUsername}
      />
    </div>
  )

  renderPasswordField = () => (
    <div className="form-item">
      <label htmlFor="password">PASSWORD</label>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        className="form-control"
        onChange={this.onChangingPassword}
      />
    </div>
  )

  render() {
    const {showErrorMsg, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-bg-container">
        <Header />
        <div className="login-page-container">
          <form type="submit" className="form" onSubmit={this.onClickingSubmit}>
            <h1>Login</h1>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            {showErrorMsg && <p className="err-msg">{errorMessage}</p>}
            <button type="submit" className="sign-in-button">
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
