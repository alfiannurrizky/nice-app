import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="container min-h-screen flex-center" style={{ flexDirection: 'column' }}>
      <nav className="navbar" style={{ width: '100%' }}>
        <Link to="/" className="nav-brand">
          <Zap className="text-gradient" />
          <span>Nice App</span>
        </Link>
        <Link to="/login" className="btn btn-outline">
          Log In
        </Link>
      </nav>

      <main style={{ textAlign: 'center', marginTop: '4rem', flex: 1 }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Welcome to <span className="text-gradient">Nice Application</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          A premium full-stack experience built with React, Express, and MySQL. 
          Containerized with Docker and ready for the modern web.
        </p>

        <div className="grid-2" style={{ marginTop: '4rem', textAlign: 'left' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <Rocket className="text-gradient" size={32} style={{ marginBottom: '1rem' }} />
            <h3>Blazing Fast</h3>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
              Built on Vite and Express for maximum performance and rapid development cycles.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <Shield className="text-gradient" size={32} style={{ marginBottom: '1rem' }} />
            <h3>Secure by Design</h3>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
              Featuring JWT authentication, password hashing, and protected API routes.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Get Started Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Landing;
