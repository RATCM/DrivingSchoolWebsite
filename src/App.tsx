import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const goToMainPage = () => {
    window.location.href = "/"; // reloads to root
  };

  return (
      <div className="App">

        {/* Topbar */}
        <div className="topbar">
            <img src={logo} className="topbar-logo" alt="logo" />
            <button onClick={goToMainPage}>Forside</button>
            <button onClick={goToMainPage}>Køreskoler</button>
            <button onClick={goToMainPage}>Min Side</button>
            <button onClick={goToMainPage}>Log in</button>

        </div>

        {/* Content */}
        <header className="App-header">
          <p>
            This is the start page.
          </p>
        </header>
      </div>
  );
}

export default App;