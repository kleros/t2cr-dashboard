import './App.css';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import SideBar from '../sidebar/SideBar';
import HomePage from '../pages/HomePage';
import TokensPage from '../pages/TokensPage';
import BadgesPage from '../pages/BadgesPage';
import Footer from '../footer/Footer';


function App() {
  return (
    <div className="App">
      <HashRouter>
        <div className="App__Row">
          <SideBar/>
          <Route path="/" exact component={HomePage} />
          <Route path="/tokens" component={TokensPage} />
          <Route path="/badges" component={BadgesPage} />
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
