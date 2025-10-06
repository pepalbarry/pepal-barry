import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthProvider';

export default function Navbar({ cartCount = 0}) {
 const {user,logout } = useAuth();
 console.log(user);
  return (
    <div className="sticky w-[90%] mx-auto navbar px-5 shadow-md top-5 rounded-full z-100 bg-white/20 backdrop-blur-lg border border-white/30">

      {/* Logo */}
      <div className="flex-1">
        <Link to="/"  className="btn btn-ghost normal-case text-xl">
          NutriBite
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/">Home</Link></li>
          <li><a >Shop</a></li>
          <li><a >About</a></li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex gap-4">
        {/* Cart */}
        <a  className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FiShoppingCart size={24} />
            {cartCount > 0 && <span className="badge badge-sm indicator-item">{cartCount}</span>}
          </div>
        </a>

        {/* Login/Profile */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl">
                <img 
          src={user.picture.replace("s96-c","s40-c")} 
          alt={user.name} 
        />
              </div>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
              <li><a>Profile</a></li>
              <li><a>Orders</a></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
         <Link to="/register" className="btn btn-ghost w-auto hidden md:inline-flex rounded-full font-semibold">Sign Up</Link>
         <Link to="/login" className="btn btn-neutral w-auto rounded-full">Login</Link>
          </>
        )}
        
      </div>
    </div>
  );
}
