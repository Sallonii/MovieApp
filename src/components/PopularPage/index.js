import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

class PopularPage extends Component {
  state = {moviesList: []}

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
    this.setState({moviesList: updatedMoviesList})
  }

  getPopularMoviesList = async () => {
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

  render() {
    const {moviesList} = this.state
    return (
      <div className="popular-page-container">
        <Header />
        <ul className="movie-items-ul-container">
          {moviesList.map(eachMovie => (
            <li key={eachMovie.id}>
              <img
                alt={eachMovie.title}
                src={eachMovie.posterPath}
                className="popular-movie-item"
              />
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
}

export default PopularPage
