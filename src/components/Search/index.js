import {Component} from 'react'

import './index.css'

class Search extends Component {
  componentDidMount() {
    this.getSearchresults()
  }

  getSearchresults = async () => {
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search={searchText}`
  }

  render() {
    return (
      <div>
        <h1>Search</h1>
      </div>
    )
  }
}

export default Search
