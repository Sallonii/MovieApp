import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class MovieDetails extends Component {
  state = {movieDetails: {}}

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
    this.setState({movieDetails: updatedMovieDetails})
  }

  getMovieDetails = async () => {
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

  render() {
    return <h1>Hi</h1>
  }
}

export default MovieDetails
