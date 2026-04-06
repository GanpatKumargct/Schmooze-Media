import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Trash2 } from 'lucide-react';
import apiClient from '../api/client';

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIdeas = async () => {
    try {
      const response = await apiClient.get('/ideas');
      setIdeas(response.data);
    } catch (err) {
      setError('Failed to fetch ideas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const deleteIdea = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this idea?")) return;
    try {
      await apiClient.delete(`/ideas/${id}`);
      fetchIdeas();
    } catch (err) {
      alert("Failed to delete idea.");
    }
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div>
      <h2 className="mb-4">Your Validated Ideas</h2>
      {error && <div className="text-secondary mb-4">{error}</div>}
      
      {ideas.length === 0 ? (
        <div className="glass text-center" style={{ padding: '4rem 2rem' }}>
          <Lightbulb size={48} color="var(--text-secondary)" className="mb-2" />
          <h3>No ideas found</h3>
          <p className="text-secondary mb-4">You haven't validated any ideas yet.</p>
          <Link to="/submit" className="btn btn-primary">Submit your first idea</Link>
        </div>
      ) : (
        <div className="grid">
          {ideas.map((idea) => {
            const score = idea.report?.profitability_score || 0;
            const risk = idea.report?.risk_level || 'Unknown';
            return (
              <Link to={`/ideas/${idea.id}`} key={idea.id} style={{ textDecoration: 'none' }}>
                <div className="glass" style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>{idea.title}</h3>
                  <p className="text-secondary text-sm mb-4" style={{ flexGrow: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {idea.description}
                  </p>
                  
                  <div className="flex items-center" style={{ justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
                    <div className="flex items-center gap-2">
                       <div style={{
                         width: '32px', height: '32px', borderRadius: '50%',
                         background: `conic-gradient(var(--success-color) ${score}%, transparent 0)`,
                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                         fontSize: '0.7rem', fontWeight: 'bold'
                       }}>
                         <div style={{ background: 'var(--surface-color)', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {score}
                         </div>
                       </div>
                       <span className={`badge badge-${risk.toLowerCase()}`}>{risk} Risk</span>
                    </div>
                    
                    <button 
                      onClick={(e) => deleteIdea(e, idea.id)}
                      className="btn" 
                      style={{ padding: '0.5rem', background: 'transparent', color: 'var(--danger-color)' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
