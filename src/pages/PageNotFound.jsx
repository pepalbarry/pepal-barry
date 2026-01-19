// src/pages/PageNotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center pt-20">
        <h1 className="text-9xl font-display font-bold text-primary/20 mb-4">404</h1>
        <h2 className="text-3xl font-display font-semibold text-heading mb-4">Page Not Found</h2>
        <p className="text-lg text-subtle mb-10 max-w-md">
          Oops! It seems you've wandered off the path. The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')}>
          Return Home
        </Button>
      </main>
      <Footer />
    </div>
  );
}
