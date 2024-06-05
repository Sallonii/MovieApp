import {Component} from 'react'
import './index.css'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'
import FailureView from '../FailureView'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {homeDetails: {}, homeStatus: apiConstants.initial}

  componentDidMount() {
    this.getHomeDetails()
  }

  onSuccess = homeDetails => {
    const homePageDetails = homeDetails[Math.floor(Math.random() * 10)]
    const updatedHomePageDetails = {
      title: homePageDetails.title,
      backdropPath: homePageDetails.backdrop_path,
      overview: homePageDetails.overview,
      posterPath: homePageDetails.poster_path,
    }

    this.setState({
      homeDetails: updatedHomePageDetails,
      homeStatus: apiConstants.success,
    })
  }

  getHomeDetails = async () => {
    this.setState({homeStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.results)
    } else {
      this.setState({homeStatus: apiConstants.failure})
    }
  }

  renderHome = () => {
    const {homeDetails} = this.state
    const {title, overview} = homeDetails
    return (
      <div className="home-content-container">
        <h1 className="super-man-heading">{title}</h1>
        <p className="super-man-description">{overview}</p>
        <button type="button" className="play-btn">
          Play
        </button>
      </div>
    )
  }

  renderVideos = () => (
    <div className="movies-list-container">
      <h1 className="home-heading">Trending Now</h1>
      <ReactSlick movieType="trending-movies" />
      <h1 className="home-heading">Originals</h1>
      <ReactSlick movieType="originals" />
      <Footer />
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  reload = () => {
    this.getHomeDetails()
  }

  renderFailureView = () => <FailureView reload={this.reload} />

  renderHomePage = () => {
    const {homeStatus} = this.state
    switch (homeStatus) {
      case apiConstants.success:
        return this.renderHome()
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {homeDetails} = this.state
    const {posterPath, backdropPath} = homeDetails
    console.log(posterPath)
    console.log(backdropPath)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <div
          className="home-main-container"
          style={{backgroundImage: `url('${backdropPath}')`}} // Here, how do I implement different images based on different sizes
        >
          <Header />
          {this.renderHomePage()}
        </div>
        {this.renderVideos()}
      </>
    )
  }
}

export default Home
