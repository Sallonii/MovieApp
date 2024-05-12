import {Component} from 'react'

import {Link} from 'react-router-dom'
import {IoMdCloseCircle} from 'react-icons/io'

import {RiListSettingsFill} from 'react-icons/ri'
import {FaSearch} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Search extends Component {
  state = {
    hamburgerClicked: false,
    searchText: '',
    movieList: [],
    searchStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getSearchResults()
  }

  onSuccess = movieList => {
    const updatedMovieList = movieList.map(eachMovie => ({
      id: eachMovie.id,
      backdropPath: eachMovie.backdrop_path,
      posterPath: eachMovie.poster_path,
      title: eachMovie.title,
    }))
    this.setState({
      movieList: updatedMovieList,
      searchStatus: apiConstants.success,
    })
  }

  getSearchResults = async () => {
    this.setState({searchStatus: apiConstants.inProgress})

    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.results)
    } else {
      this.setState({searchStatus: apiConstants.failure})
    }
  }

  onChangingSearchInput = event => {
    this.setState({searchText: event.target.value}, this.getSearchResults)
  }

  onClickingHamburgerIcon = () => {
    this.setState(prevState => ({
      hamburgerClicked: !prevState.hamburgerClicked,
    }))
  }

  onClickingCloseButton = () => {
    this.setState({hamburgerClicked: false})
  }

  renderHeader = () => {
    const {hamburgerClicked} = this.state
    return (
      <>
        <div className="header-container">
          <Link to="/" className="nav-item">
            <h1 className="logo">MOVIES</h1>
          </Link>
          <div className="search-hamburger-container">
            <Link to="/search">
              <button
                type="button"
                className="input-container"
                testid="searchButton"
              >
                <FaSearch className="react-icon" />
                <input
                  type="text"
                  className="input-element"
                  onChange={this.onChangingSearchInput}
                />
              </button>
            </Link>
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

  getMoviesList = () => {
    const {movieList} = this.state

    if (movieList.length === 0) {
      return this.renderNoSearchResults()
    }
    return (
      <ul className="searched-movies-ul-container">
        {movieList.map(eachMovie => (
          <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
            <img
              alt={eachMovie.title}
              src={eachMovie.backdropPath}
              className="searched-movie-image"
            />
          </Link>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="search-page-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderNoSearchResults = () => {
    const {searchText} = this.state
    return (
      <div className="no-search-container">
        <img
          src="https://res.cloudinary.com/dwj8ezxgi/image/upload/v1715488390/Group_7394_wc5vva.png"
          alt="no movies"
        />
        <p>{`Your search for ${searchText} did not find any matches.`}</p>
      </div>
    )
  }

  renderMovies = () => {
    const {searchStatus} = this.state
    switch (searchStatus) {
      case apiConstants.success:
        return this.getMoviesList()
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-page-container">
        {this.renderHeader()}
        {this.renderMovies()}
      </div>
    )
  }
}

export default Search
