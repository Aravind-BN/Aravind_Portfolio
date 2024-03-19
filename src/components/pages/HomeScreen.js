import '../../App.css';
import React from 'react';
import Cards from './Cards';
import Footer from '../commonitems/Footer';
import Home from '../pages/Home';
import Aboutsection from '../pages/Aboutsection'


function HomeScreen () {
  return (
    <>
    <Home />
    <Aboutsection />
    <Cards />
    <Footer />
    
    </>
  )
}

export default HomeScreen;