
import './App.css'
import {  Route, Switch } from "wouter";
import MemeDiv from './components/meme-template';
import Hero from './components/hero';
import Advanced from './components/explore';
import Explore from './components/explore';


function App() {

  return (
    <>
    {/* 
      Routes below are matched exclusively -
      the first matched route gets rendered
    */}
    <Switch>
      <Route path='/' component={Hero} />
      <Route path="/meme-template" component={MemeDiv} />

      <Route path="/users/:name">
        {(params) => <>Hello, {params.name}!</>}
      </Route>
<Route path="/explore" component={Explore}/>
      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  </>
  )
}

export default App
