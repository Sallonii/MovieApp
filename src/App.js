import {Switch, Route} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import PopularPage from './components/PopularPage'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/popular" component={PopularPage} />
    <Route exact path="/movies/:id" component={MovieDetails} />
  </Switch>
)

export default App
