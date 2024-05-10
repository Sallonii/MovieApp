import {Component} from 'react'
import Slider from 'react-slick'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class ReactSlick extends Component {
  state = {moviesList: [], movieStatus: apiConstants.initial}

  componentDidMount() {
    this.getMoviesList()
  }

  onSuccess = moviesList => {
    const updatedMoviesList = moviesList.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      backdropPath: eachMovie.backdrop_path,
      posterPath: eachMovie.poster_path,
      overview: eachMovie.overview,
    }))

    this.setState({
      moviesList: updatedMoviesList,
      movieStatus: apiConstants.success,
    })
  }

  getMoviesList = async () => {
    this.setState({movieStatus: apiConstants.inProgress})
    const {movieType} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = `https://apis.ccbp.in/movies-app/${movieType}`

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.results)
    } else {
      this.setState({movieStatus: apiConstants.failure})
    }
  }

  myMoviesList = () => {
    const {moviesList} = this.state
    const settings = {
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {moviesList.map(eachMovie => (
          <img
            className="movie-item"
            key={eachMovie.id}
            alt={eachMovie.title}
            src={eachMovie.backdropPath}
          />
        ))}
      </Slider>
    )
  }

  renderLoader = () => (
    <div className="slick-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMovies = () => {
    const {movieStatus} = this.state
    switch (movieStatus) {
      case apiConstants.success:
        return this.myMoviesList()
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="slider-container">{this.renderMovies()}</div>
  }
}

export default ReactSlick
