import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '/delicious-cookies-arrangement.png'; // replace with your image

export default function Hero() {
  return (
    <section className="h-screen flex flex-col-reverse md:flex-row items-center justify-center px-5 md:px-20 relative overflow-hidden">
      
     

      {/* Left Side: Text */}
      <div className="md:w-1/2 text-center md:text-left z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold   mb-4">
          NutriGren
        </h1>

        <p className="text-2xl md:text-4xl  italic mb-8 ">
          Har Bite Mein Hai Maa Ka Pyaar
        </p>

        <Link
          to="#products"
          className="btn btn-primary btn-lg "
        >
          Shop Now
        </Link>
      </div>

      {/* Right Side: Image */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end z-10">
        <img
          src={heroImage}
          alt="NutriBite Cookies"
          className="w-80 md:w-[400px] rounded-xl  transform hover:rotate-6 hover:scale-105 transition-all duration-500"
        />
      </div>
    </section>
  );
}
