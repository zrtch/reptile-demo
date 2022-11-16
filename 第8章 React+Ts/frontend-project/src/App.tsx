import React  from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './Pages/Login'

const App: React.FC = () =>{
  return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
          </Switch>
        </HashRouter>
      </div>
  )
}

export default App