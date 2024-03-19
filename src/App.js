import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import HomeScreen from './components/pages/HomeScreen';
import Achievements from './components/pages/Achievements';
import MorePage from './components/pages/MorePage';
import Life from './components/pages/Life';
import LearnMore from './components/pages/LearnMore';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <Router>
        <NavBar />
        <div>
          <Route path="/home" exact component={HomeScreen} />
          <Route path="/achievements" exact component={Achievements} />
          <Route path="/more" exact component={MorePage} />
          <Route path="/life" exact component={Life} />
          <Route path="/learn-more" exact component={LearnMore} />
        </div>
        <Router>
          <Footer />
        </Router>
    </Router>
    </>
  );
};

export default App;