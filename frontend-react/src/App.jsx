import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Review from './components/Review/Review';
import Track from './components/Track/Track';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/Navbar/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="page-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/review" component={Review} />
            <ProtectedRoute path="/track" component={Track} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
