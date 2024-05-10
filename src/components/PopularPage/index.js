import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class PopularPage extends Component {
  state = {moviesList: [], pageStatus: apiConstants.initial}

  componentDidMount() {
    this.getPopularMoviesList()
  }

  onSuccess = moviesList => {
    const updatedMoviesList = moviesList.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      backdropPath: eachMovie.backdrop_path,
      posterPath: eachMovie.poster_path,
    }))
    this.setState({
      moviesList: updatedMoviesList,
      pageStatus: apiConstants.success,
    })
  }

  getPopularMoviesList = async () => {
    this.setState({pageStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const apiUrl = `https://apis.ccbp.in/movies-app/popular-movies`

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.results)
    }
  }

  renderPopularPage = () => {
    const {moviesList} = this.state
    return (
      <ul className="movie-items-ul-container">
        {moviesList.map(eachMovie => (
          <Link
            to={`/movies/${eachMovie.id}`}
            key={eachMovie.id}
            className="nav-item"
          >
            <li>
              <img
                alt={eachMovie.title}
                src={eachMovie.posterPath}
                className="popular-movie-item"
              />
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderList = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case apiConstants.success:
        return this.renderPopularPage()
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-page-container">
        <Header />
        {this.renderList()}
        <Footer />
      </div>
    )
  }
}

export default PopularPage
