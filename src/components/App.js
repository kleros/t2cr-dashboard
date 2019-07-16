import './App.css';
import React from 'react';
import SideBar from './SideBar';
import HomePage from './HomePage';
import TokensPage from './TokensPage';
import BadgesPage from './BadgesPage';
import Footer from './Footer';
import { HashRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div className="Row">
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
