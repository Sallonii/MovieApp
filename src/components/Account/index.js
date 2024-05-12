import './index.css'

import Header from '../Header'

const Account = () => (
  <div className="account-main-container">
    <Header />
    <div className="account-card-container">
      <h1>Account</h1>
      <hr />
      <div className="alignment-container">
        <h1 className="heading-text">Membership</h1>
        <div>
          <p className="username">username@224</p>
          <p className="password">Password: ******</p>
        </div>
      </div>
      <hr />
      <div className="alignment-container">
        <h1 className="heading-text">Plan details</h1>
        <p className="username">
          Premium <span>Ultra HD</span>
        </p>
      </div>
      <hr />
      <div className="btn-container">
        <button type="button" className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  </div>
)

export default Account
