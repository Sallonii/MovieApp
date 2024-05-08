import {Switch, Route} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import PopularPage from './components/PopularPage'
import Home from './components/Home'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/popular-movies" component={PopularPage} />
  </Switch>
)

export default App
