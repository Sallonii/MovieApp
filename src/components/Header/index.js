import './index.css'

import {RiListSettingsFill} from 'react-icons/ri'
import {FaSearch} from 'react-icons/fa'

const Header = () => (
  <div className="header-container">
    <h1 className="logo">MOVIES</h1>
    <div>
      <FaSearch className="react-icon" />
      <RiListSettingsFill className="react-icon" />
    </div>
  </div>
)

export default Header
