import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

import Footer from '../Footer'

const {format} = require('date-fns')

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class MovieDetails extends Component {
  state = {movieDetails: {}, movieStatus: apiConstants.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  onSuccess = movieDetails => {
    const updatedSimilarMovies = movieDetails.similar_movies.map(
      eachSimilarMovie => ({
        id: eachSimilarMovie.id,
        title: eachSimilarMovie.title,
        posterPath: eachSimilarMovie.poster_path,
        backdropPath: eachSimilarMovie.backdrop_path,
      }),
    )

    const updatedLanguages = movieDetails.spoken_languages.map(
      eachLanguage => ({
        id: eachLanguage.id,
        englishName: eachLanguage.english_name,
      }),
    )
    const updatedMovieDetails = {
      adult: movieDetails.adult,
      backdropPath: movieDetails.backdrop_path,
      budget: movieDetails.budget,
      id: movieDetails.id,
      overview: movieDetails.overview,
      posterPath: movieDetails.poster_path,
      releaseDate: movieDetails.release_date,
      runtime: movieDetails.runtime,
      title: movieDetails.title,
      voteAverage: movieDetails.vote_average,
      voteCount: movieDetails.vote_count,
      genres: movieDetails.genres,
      similarMovies: updatedSimilarMovies,
      languages: updatedLanguages,
    }
    this.setState({
      movieDetails: updatedMovieDetails,
      movieStatus: apiConstants.success,
    })
  }

  getMovieDetails = async () => {
    this.setState({movieStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.onSuccess(data.movie_details)
    }
  }

  renderLoader = () => (
    <div className="movie-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMovieDetails = () => {
    const {movieDetails} = this.state
    const {
      adult,
      overview,
      releaseDate,
      title,
      runtime,
      posterPath,
    } = movieDetails
    const year = releaseDate.split('-')[0]
    const runtimeHours = Math.round(runtime / 60)
    const runtimeMinutes = runtime % 60
    return (
      <>
        <div
          className="movie-container"
          style={{backgroundImage: `url('${posterPath}')`}}
        >
          <div className="content-container">
            <h1>{title}</h1>
            <div className="date-year">
              <p className="date-item">{`${runtimeHours}h ${runtimeMinutes}m`}</p>
              {!adult && <p className="date-item ua">U/A</p>}
              <p className="date-item">{year}</p>
            </div>
            <p>{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        {this.renderMovieDetailsBottomPage()}
      </>
    )
  }

  renderMovieDetailsBottomPage = () => {
    const {movieDetails} = this.state
    const {
      genres,
      languages,
      voteCount,
      voteAverage,
      budget,
      releaseDate,
      similarMovies,
    } = movieDetails
    const inputDate = new Date(releaseDate)
    const formattedDate = format(inputDate, 'do MMMM yyyy')
    return (
      <div className="movie-details-bottom-container">
        <ul className="movie-details-ul-container">
          <li>
            <h1 className="list-content-heading">Genres</h1>
            <ul className="genre-ul-cont">
              {genres.map(eachGenre => (
                <li key={eachGenre.id}>
                  <p className="list-content-item">{eachGenre.name}</p>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h1 className="list-content-heading">Audio Available</h1>
            <ul className="genre-ul-cont">
              {languages.map(eachLanguages => (
                <li key={eachLanguages.id}>
                  <p className="list-content-item">
                    {eachLanguages.englishName}
                  </p>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h1 className="list-content-heading">Rating Count</h1>
            <p className="list-content-item">{voteCount}</p>
            <h1 className="list-content-heading">Rating Average</h1>
            <p className="list-content-item">{voteAverage}</p>
          </li>
          <li>
            <h1 className="list-content-heading">Budget</h1>
            <p className="list-content-item">{budget}</p>
            <h1 className="list-content-heading">Release Date</h1>
            <p className="list-content-item">{formattedDate}</p>
          </li>
        </ul>
        <h1>More Like This</h1>
        <ul className="similar-movies-container">
          {similarMovies.map(eachMovie => (
            <li className="list-item" key={eachMovie.id}>
              <img
                alt={eachMovie.title}
                src={eachMovie.backdropPath}
                className="similar-image"
              />
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderMovies = () => {
    const {movieStatus} = this.state

    switch (movieStatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderMovieDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-main-container">
        <Header />
        {this.renderMovies()}
      </div>
    )
  }
}

export default MovieDetails
