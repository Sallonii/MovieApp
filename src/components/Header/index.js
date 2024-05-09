import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoMdCloseCircle} from 'react-icons/io'
import './index.css'

import {RiListSettingsFill} from 'react-icons/ri'
import {FaSearch} from 'react-icons/fa'

class Header extends Component {
  state = {hamburgerClicked: false}

  onClickingCloseButton = () => {
    this.setState({hamburgerClicked: false})
  }

  onClickingHamburgerIcon = () => {
    this.setState(prevState => ({
      hamburgerClicked: !prevState.hamburgerClicked,
    }))
  }

  render() {
    const {hamburgerClicked} = this.state
    return (
      <>
        <div className="header-container">
          <h1 className="logo">MOVIES</h1>
          <div>
            <FaSearch className="react-icon" />
            <RiListSettingsFill
              className="react-icon"
              onClick={this.onClickingHamburgerIcon}
            />
          </div>
        </div>
        {hamburgerClicked && (
          <div className="hamburger-container">
            <Link to="/" className="link-item">
              <p>Home</p>
            </Link>
            <Link to="/popular" className="link-item">
              <p>Popular</p>
            </Link>
            <Link to="/account" className="link-item">
              <p>Account</p>
            </Link>
            <IoMdCloseCircle
              className="close-btn"
              onClick={this.onClickingCloseButton}
            />
          </div>
        )}
      </>
    )
  }
}

export default Header
