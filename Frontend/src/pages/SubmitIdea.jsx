import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { Send, Sparkles } from 'lucide-react';

export default function SubmitIdea() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/ideas', { title, description });
      navigate(`/ideas/${response.data.id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to validate idea. Make sure the backend is running and OpenAI API key is set.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="glass" style={{ padding: '2rem' }}>
        <div className="flex items-center gap-2 mb-4">
           <Sparkles color="var(--primary-color)" />
           <h2 style={{ margin: 0 }}>Analyze Your Startup Idea</h2>
        </div>
        
        {error && <div className="mb-4 text-sm" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', borderRadius: 'var(--radius)' }}>{error}</div>}

        {loading ? (
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <div className="loader"></div>
            <h3 className="mb-1">AI is validating your idea...</h3>
            <p className="text-secondary text-sm">Analyzing market, generating customer personas, finding competitors.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Startup Name or Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Uber for dog walkers"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Detailed Description</label>
              <textarea 
                className="form-control" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={6}
                placeholder="Describe what problem you are solving, who your target users are, and how it works..."
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={18} />
              Generate Validation Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
