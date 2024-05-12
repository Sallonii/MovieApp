import {Switch, Route} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import PopularPage from './components/PopularPage'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import Search from './components/Search'
import Account from './components/Account'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/popular" component={PopularPage} />
    <Route exact path="/movies/:id" component={MovieDetails} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/account" component={Account} />
  </Switch>
)

export default App
