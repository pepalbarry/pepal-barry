import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar'
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';

const products = [
  {
    id: 1,
    name: 'Fruit Coconut Cookies',
    description: 'Soft, gooey chocolate chip cookies baked fresh daily.',
    price: 199,
    image: '/fruit_cocunut_product.png', 
  },
  {
    id: 2,
    name: 'Honey Almond Cookies',
    description: 'Healthy almond cookies with juicy raisins.',
    price: 179,
    image: '/honey_almond_product.png',
  },
 
  {
    id:3,
    name: 'Chocolate Ragi Cookies',
    description: 'Intensely chocolatey cookies for chocolate addicts.',
    price: 209,
    image: '/chocolate_ragi_product.png', 
  },
];

export default function Home() {
  return (
    <div className=''>
      <Navbar />
      <Hero />
      {products.map((product, index) => (
        <ProductSection
          key={product.id}
          product={product}
          reverse={index % 2 !== 0} 
        />
      ))}
      <Footer/>
    </div>
  );
}
