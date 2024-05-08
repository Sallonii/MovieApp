import {Component} from 'react'
import Slider from 'react-slick'

import Cookies from 'js-cookie'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

class ReactSlick extends Component {
  state = {moviesList: []}

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

    this.setState({moviesList: updatedMoviesList})
  }

  getMoviesList = async () => {
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
    }
  }

  render() {
    const settings = {
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
    }
    const {moviesList} = this.state
    console.log(moviesList)
    return (
      <div className="slider-container">
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
      </div>
    )
  }
}

export default ReactSlick
