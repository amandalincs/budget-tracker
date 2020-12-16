import './App.css';
import React  from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainNav  from './components/Standard/Navigation.js';
import Dashboard from './components/Pages/Dashboard'
import AddItems from './components/Pages/AddItems'


  function App()  {

    return (
      <Router>
        <div>
          <MainNav />

          <Switch>
            {/* <Route exact path="/" component={Dashboard}/> */}
            <Route exact path="/" component={AddItems}/>
            
          </Switch>
        </div>
      </Router>
    );
  
}

export default App;

