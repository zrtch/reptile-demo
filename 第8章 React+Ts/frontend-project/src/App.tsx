import React  from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './Pages/Login'
import HomePage from './Pages/Home'

const App: React.FC = () =>{
  return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
          </Switch>
        </HashRouter>
      </div>
  )
}

export default App