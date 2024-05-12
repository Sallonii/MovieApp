import './index.css'

import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <h1>Lost Your Way?</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <p>Please go back to the homepage</p>
    <Link to="/" className="nav-item">
      <button type="button" className="go-home-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
