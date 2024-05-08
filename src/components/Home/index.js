import './index.css'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <div className="home-main-container">
        <Header />
        <div className="home-content-container">
          <h1 className="super-man-heading">Super Man</h1>
          <p className="super-man-description">
            Superman is a fictional superhero who first appeared in American
            comic books published by DC Comics.
          </p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
      <div className="movies-list-container">
        <h1 className="home-heading">Trending Now</h1>
        <ReactSlick movieType="trending-movies" />
        <h1 className="home-heading">Originals</h1>
        <ReactSlick movieType="originals" />
        <Footer />
      </div>
    </>
  )
}

export default Home
