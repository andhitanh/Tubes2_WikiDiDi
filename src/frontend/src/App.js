import wikididilogo from './assets/logo.png';
import './App.css';
// import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const NavLinks = () => {
    return (
        <div className='nav-links'>
            <a href="https://github.com/andhitanh/Tubes2_WikiDiDi" className="nav-link" target="_blank" rel="noopener noreferrer">Youtube</a>
            <span className="separator"> | </span> 
            <a href="https://github.com/andhitanh/Tubes2_WikiDiDi" className="nav-link" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
    );
}

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="nav-bar">
            <div className="nav-brand">
            </div>
            <div className="nav-toggle" onClick={toggleNavbar}>
                {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </div>
            <div className={`nav-links ${isOpen ? 'show' : 'hide'}`}>
                <NavLinks />
            </div>
        </nav>
    );
}

function App() {
  return (
    <div className="App-header">
      <header className="App-header">
        <img src={wikididilogo} className="App-logo" alt="logo" />
        <Nav />
      </header>
    </div>
  );
}

export default App;
