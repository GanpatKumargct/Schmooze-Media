import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, TrendingUp, Users, AlertTriangle, Crosshair, Server } from 'lucide-react';
import apiClient from '../api/client';

export default function IdeaDetails() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const response = await apiClient.get(`/ideas/${id}`);
        setIdea(response.data);
      } catch (err) {
        setError('Failed to load idea details.');
      } finally {
        setLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  if (loading) return <div className="loader"></div>;
  if (error || !idea) return <div className="text-center">{error || "Idea not found"}</div>;

  const report = idea.report || {};

  return (
    <div>
      <Link to="/" className="btn btn-secondary mb-4" style={{ padding: '0.5rem 1rem' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      
      <div className="glass mb-4" style={{ padding: '2rem' }}>
         <h1 className="mb-1">{idea.title}</h1>
         <p className="text-secondary">{idea.description}</p>
      </div>

      <div className="grid">
         {/* Score Card */}
         <div className="glass flex items-center" style={{ padding: '2rem', justifyContent: 'center', flexDirection: 'column' }}>
            <h3 className="text-secondary text-sm mb-2 uppercase">Profitability Score</h3>
            <div style={{
                position: 'relative', width: '120px', height: '120px', borderRadius: '50%',
                background: `conic-gradient(var(--success-color) ${report.profitability_score || 0}%, var(--surface-color) 0)`
            }}>
                <div style={{ 
                    position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px',
                    background: 'var(--bg-color)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', fontWeight: 'bold'
                }}>
                    {report.profitability_score || 0}
                </div>
            </div>
            <p className="text-sm text-secondary mt-4 text-center">
              {report.risk_level && <span className={`badge badge-${report.risk_level.toLowerCase()} mb-2`}>{report.risk_level} Risk</span>}
            </p>
         </div>

         {/* Market & Users */}
         <div className="glass" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
            <h3 className="flex items-center gap-2 mb-2"><Crosshair size={20} color="var(--primary-color)" /> Market Overview</h3>
            <p className="text-sm text-secondary mb-4">{report.market || "No data"}</p>
            
            <h3 className="flex items-center gap-2 mb-2"><Users size={20} color="var(--accent-color)" /> Customer Persona</h3>
            <p className="text-sm text-secondary mb-4">{report.customer || "No data"}</p>

            <h3 className="flex items-center gap-2 mb-2"><Target size={20} color="var(--danger-color)" /> Core Problem</h3>
            <p className="text-sm text-secondary">{report.problem || "No data"}</p>
         </div>
      </div>

      <div className="grid mt-4">
         {/* Competitors */}
         <div className="glass" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
             <h3 className="flex items-center gap-2 mb-4"><TrendingUp size={20} color="#fbbf24" /> Competitor Analysis</h3>
             {Array.isArray(report.competitor) ? (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {report.competitor.map((c, i) => {
                        // Handle both string format and object format {name, differentiation}
                        const name = typeof c === 'object' ? (c.name || c.competitor || Object.keys(c)[0]) : c;
                        const diff = typeof c === 'object' ? (c.differentiation || c.description || Object.values(c)[1] || '') : '';
                        return (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--primary-color)' }}>
                                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{name}</div>
                                {diff && <div className="text-sm text-secondary">{diff}</div>}
                            </div>
                        );
                    })}
                 </div>
             ) : (
                 <p className="text-sm text-secondary">{JSON.stringify(report.competitor) || "No data"}</p>
             )}
         </div>

         {/* Tech Stack & Justification */}
         <div className="glass" style={{ padding: '1.5rem' }}>
             <h3 className="flex items-center gap-2 mb-4"><Server size={20} color="var(--success-color)" /> Suggested Tech Stack</h3>
             {Array.isArray(report.tech_stack) ? (
                 <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                     {report.tech_stack.map((tech, i) => (
                         <span key={i} className="badge badge-low">{tech}</span>
                     ))}
                 </div>
             ) : (
                 <p className="text-sm text-secondary mb-4">{JSON.stringify(report.tech_stack) || "No data"}</p>
             )}

             <h3 className="flex items-center gap-2 mb-2"><AlertTriangle size={20} color="var(--danger-color)" /> Justification</h3>
             <p className="text-sm text-secondary">{report.justification || "No justification provided."}</p>
         </div>
      </div>
    </div>
  );
}
