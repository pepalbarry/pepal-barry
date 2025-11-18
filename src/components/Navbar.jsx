import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import logo from '/logo2.png';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
   <div className="fixed left-1/2 -translate-x-1/2 top-5 z-50 w-[90%] mx-auto flex items-center justify-between px-4 md:px-8 py-3 bg-background/70 backdrop-blur-2xl border border-background/80 shadow-lg rounded-full">


      
      {/* Logo */}
      <div className="flex-1 ">
        <Link to="/" className="text-xl font-bold text-primary ">
          <img src={logo} alt="logo" className='w-20 md:w-24'/>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex space-x-6 text-text font-medium">
          <li>
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-primary transition">
              Shop
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-primary transition">
              About
            </a>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Login/Profile */}
        {user ? (
          <div className="relative group">
            <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex items-center justify-center">
              <img
                src={user.picture.replace('s96-c', 's40-c')}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-background border border-primary rounded shadow-lg hidden group-hover:block">
              <ul className="flex flex-col text-text">
                <li className="px-4 py-2 hover:bg-secondary/30 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-secondary/30 cursor-pointer">Orders</li>
                <li className="px-4 py-2 hover:bg-secondary/30 cursor-pointer">
                  <button onClick={logout} className="w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/register"
              className="hidden md:inline-block px-4 py-2 font-semibold rounded-full text-primary border border-primary hover:bg-primary/20 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-primary text-background hover:bg-accent transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
