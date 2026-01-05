// src/pages/PageNotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 text-center">
      <h1 className="text-9xl font-display font-bold text-primary/20 mb-4">404</h1>
      <h2 className="text-3xl font-display font-semibold text-heading mb-4">Page Not Found</h2>
      <p className="text-lg text-subtle mb-10 max-w-md">
        Oops! It seems you've wandered off the path. The page you're looking for doesn't exist or has been moved.
      </p>
      <Button onClick={() => navigate('/')}>
        Return Home
      </Button>
    </div>
  );
}
