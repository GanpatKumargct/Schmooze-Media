import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import SubmitIdea from './pages/SubmitIdea';
import IdeaDetails from './pages/IdeaDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
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
    </BrowserRouter>
  );
}

export default App;
