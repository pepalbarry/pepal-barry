import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios'
import Hero from '../components/Hero';
import Navbar from '../components/Navbar'
import Product from '../components/Product';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className=''>
      <Navbar />
      <Hero />
      <Product/>
      <Footer/>
    </div>
  );
}
