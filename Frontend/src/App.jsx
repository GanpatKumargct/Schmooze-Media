import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Rocket, Code2, Globe, Mail } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import SubmitIdea from './pages/SubmitIdea';
import IdeaDetails from './pages/IdeaDetails';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="container" style={{ flex: 1 }}>
          <header className="header-nav">
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Rocket size={28} color="var(--primary-color)" />
              <h1>IdeaValidator AI</h1>
            </Link>
            <Link to="/submit" className="btn btn-primary">
              Validate New Idea
            </Link>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/submit" element={<SubmitIdea />} />
              <Route path="/ideas/:id" element={<IdeaDetails />} />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid var(--surface-border)',
          padding: '1.5rem 2rem',
          marginTop: '3rem',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              © {new Date().getFullYear()} <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Ganpat Kumar</span>. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <a
                href="https://www.linkedin.com/in/ganpatkumar1/"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.875rem' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0A66C2'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Globe size={18} /> LinkedIn
              </a>
              <a
                href="https://github.com/GanpatKumargct"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.875rem' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Code2 size={18} /> GitHub
              </a>
              <a
                href="mailto:ganpatkumardev@gmail.com"
                title="Email"
                style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.875rem' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--success-color)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Mail size={18} /> ganpatkumardev@gmail.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

