import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X, Award, Briefcase, User, Mail, Phone, MapPin, Code, Database, Layout, FileText } from 'lucide-react';

// Color scheme: Magenta, Violet, Shining Blood Red
const COLORS = {
  primary: '#FF1493',
  secondary: '#9370DB',
  accent: '#DC143C',
  dark: '#1a0a1f',
  light: '#fdf4ff'
};

const PortfolioApp = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [portfolioData, setPortfolioData] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  // Sample portfolio data - in production, this comes from API
  const sampleData = {
    personal: {
      name: 'John Developer',
      title: 'Full Stack Developer',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      location: 'San Francisco, CA',
      bio: 'Passionate developer with 5+ years of experience building scalable web applications'
    },
    skills: [
      { id: 1, name: 'React', level: 90 },
      { id: 2, name: 'FastAPI', level: 85 },
      { id: 3, name: 'PostgreSQL', level: 80 },
      { id: 4, name: 'Python', level: 88 }
    ],
    experience: [
      { id: 1, title: 'Senior Developer', company: 'Tech Corp', period: '2021-Present', description: 'Led development of microservices architecture' },
      { id: 2, title: 'Developer', company: 'StartUp Inc', period: '2019-2021', description: 'Built customer-facing applications' }
    ],
    certificates: [
      {
        id: 1,
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023',
        proofUrl: 'https://example.com/cert1.pdf',
        description: 'Professional level certification for cloud architecture'
      },
      {
        id: 2,
        name: 'React Developer Certification',
        issuer: 'Meta',
        date: '2022',
        proofUrl: 'https://example.com/cert2.pdf',
        description: 'Advanced React patterns and best practices'
      }
    ],
    projects: [
      { id: 1, name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', description: 'Full-featured online shopping platform' },
      { id: 2, name: 'Analytics Dashboard', tech: 'React, FastAPI, PostgreSQL', description: 'Real-time data visualization dashboard' }
    ]
  };

  useEffect(() => {
    // Load data from API in production
    setPortfolioData(sampleData);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // In production: API call to verify credentials
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      alert('Admin access granted!');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleEdit = (section, item) => {
    setEditMode(true);
    setEditData({ section, item });
  };

  const handleSave = () => {
    // In production: API call to update data
    console.log('Saving:', editData);
    setEditMode(false);
    setEditData(null);
    alert('Data updated successfully!');
  };

  const handleDelete = (section, id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      // In production: API call to delete
      console.log('Deleting:', section, id);
      alert('Item deleted successfully!');
    }
  };

  if (!portfolioData) return <div className="flex items-center justify-center min-h-screen" style={{ background: COLORS.dark, color: COLORS.light }}>Loading...</div>;

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: `linear-gradient(135deg, ${COLORS.dark} 0%, #2d1b3d 100%)`, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Admin Login Button (Hidden backdoor - press Ctrl+L to show) */}
      {!isAdmin && (
        <button
          onClick={() => setShowLogin(!showLogin)}
          className="fixed top-4 right-4 opacity-10 hover:opacity-100 transition-opacity z-50"
          style={{ background: COLORS.accent, color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
        >
          Admin
        </button>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="p-8 rounded-2xl max-w-md w-full mx-4" style={{ background: COLORS.dark, border: `2px solid ${COLORS.primary}` }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Admin Login</h2>
              <button onClick={() => setShowLogin(false)} style={{ color: COLORS.light }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full p-3 rounded-lg"
                style={{ background: '#2d1b3d', color: COLORS.light, border: `1px solid ${COLORS.secondary}` }}
              />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full p-3 rounded-lg"
                style={{ background: '#2d1b3d', color: COLORS.light, border: `1px solid ${COLORS.secondary}` }}
              />
              <button
                type="submit"
                className="w-full p-3 rounded-lg font-bold"
                style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`, color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.9)' }} onClick={() => setSelectedCert(null)}>
          <div className="p-8 rounded-2xl max-w-2xl w-full" style={{ background: COLORS.dark, border: `2px solid ${COLORS.primary}` }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <Award size={48} style={{ color: COLORS.accent }} />
              <button onClick={() => setSelectedCert(null)} style={{ color: COLORS.light }}>
                <X size={24} />
              </button>
            </div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>{selectedCert.name}</h3>
            <div className="space-y-3" style={{ color: COLORS.light }}>
              <p><strong style={{ color: COLORS.secondary }}>Issuer:</strong> {selectedCert.issuer}</p>
              <p><strong style={{ color: COLORS.secondary }}>Date:</strong> {selectedCert.date}</p>
              <p><strong style={{ color: COLORS.secondary }}>Description:</strong> {selectedCert.description}</p>
              <div className="mt-6 p-4 rounded-lg text-center" style={{ background: '#2d1b3d', border: `1px dashed ${COLORS.secondary}` }}>
                <FileText size={64} className="mx-auto mb-2" style={{ color: COLORS.primary }} />
                <p className="text-sm" style={{ color: COLORS.secondary }}>Certificate Proof</p>
                <p className="text-xs mt-2">{selectedCert.proofUrl}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Portfolio - Bento Grid */}
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8 p-8 rounded-3xl" style={{ background: `linear-gradient(135deg, ${COLORS.primary}22 0%, ${COLORS.secondary}22 100%)`, border: `2px solid ${COLORS.primary}` }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)` }}>
              <User size={64} color="white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-2" style={{ color: COLORS.light }}>{portfolioData.personal.name}</h1>
              <p className="text-2xl mb-4" style={{ color: COLORS.secondary }}>{portfolioData.personal.title}</p>
              <p className="text-lg" style={{ color: COLORS.light }}>{portfolioData.personal.bio}</p>
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <span className="flex items-center gap-2" style={{ color: COLORS.primary }}><Mail size={18} />{portfolioData.personal.email}</span>
                <span className="flex items-center gap-2" style={{ color: COLORS.primary }}><Phone size={18} />{portfolioData.personal.phone}</span>
                <span className="flex items-center gap-2" style={{ color: COLORS.primary }}><MapPin size={18} />{portfolioData.personal.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Skills Box */}
          <div className="p-6 rounded-3xl" style={{ background: `linear-gradient(135deg, ${COLORS.secondary}22 0%, ${COLORS.primary}22 100%)`, border: `2px solid ${COLORS.secondary}` }}>
            <div className="flex items-center gap-3 mb-4">
              <Code size={32} style={{ color: COLORS.primary }} />
              <h2 className="text-2xl font-bold" style={{ color: COLORS.light }}>Skills</h2>
            </div>
            {portfolioData.skills.map(skill => (
              <div key={skill.id} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span style={{ color: COLORS.light }}>{skill.name}</span>
                  <span style={{ color: COLORS.secondary }}>{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#2d1b3d' }}>
                  <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Box */}
          <div className="p-6 rounded-3xl" style={{ background: `linear-gradient(135deg, ${COLORS.accent}22 0%, ${COLORS.secondary}22 100%)`, border: `2px solid ${COLORS.accent}` }}>
            <div className="flex items-center gap-3 mb-4">
              <Briefcase size={32} style={{ color: COLORS.accent }} />
              <h2 className="text-2xl font-bold" style={{ color: COLORS.light }}>Experience</h2>
            </div>
            {portfolioData.experience.map(exp => (
              <div key={exp.id} className="mb-6 pb-6 border-b" style={{ borderColor: COLORS.secondary + '44' }}>
                <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>{exp.title}</h3>
                <p style={{ color: COLORS.secondary }}>{exp.company} • {exp.period}</p>
                <p className="mt-2" style={{ color: COLORS.light }}>{exp.description}</p>
                {isAdmin && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEdit('experience', exp)} className="px-3 py-1 rounded text-sm" style={{ background: COLORS.secondary, color: 'white' }}>Edit</button>
                    <button onClick={() => handleDelete('experience', exp.id)} className="px-3 py-1 rounded text-sm" style={{ background: COLORS.accent, color: 'white' }}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certificates Box */}
          <div className="p-6 rounded-3xl" style={{ background: `linear-gradient(135deg, ${COLORS.primary}22 0%, ${COLORS.accent}22 100%)`, border: `2px solid ${COLORS.primary}` }}>
            <div className="flex items-center gap-3 mb-4">
              <Award size={32} style={{ color: COLORS.accent }} />
              <h2 className="text-2xl font-bold" style={{ color: COLORS.light }}>Certificates</h2>
            </div>
            {portfolioData.certificates.map(cert => (
              <div
                key={cert.id}
                className="mb-4 p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform"
                style={{ background: '#2d1b3d', border: `1px solid ${COLORS.secondary}` }}
                onClick={() => setSelectedCert(cert)}
              >
                <div className="flex items-center gap-3">
                  <Award size={24} style={{ color: COLORS.primary }} />
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: COLORS.light }}>{cert.name}</h3>
                    <p className="text-sm" style={{ color: COLORS.secondary }}>{cert.issuer} • {cert.date}</p>
                  </div>
                  <Eye size={20} style={{ color: COLORS.accent }} />
                </div>
                {isAdmin && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={(e) => { e.stopPropagation(); handleEdit('certificates', cert); }} className="px-3 py-1 rounded text-sm" style={{ background: COLORS.secondary, color: 'white' }}>Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete('certificates', cert.id); }} className="px-3 py-1 rounded text-sm" style={{ background: COLORS.accent, color: 'white' }}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Projects Box - Spans 2 columns */}
          <div className="md:col-span-2 p-6 rounded-3xl" style={{ background: `linear-gradient(135deg, ${COLORS.secondary}22 0%, ${COLORS.accent}22 100%)`, border: `2px solid ${COLORS.secondary}` }}>
            <div className="flex items-center gap-3 mb-4">
              <Layout size={32} style={{ color: COLORS.secondary }} />
              <h2 className="text-2xl font-bold" style={{ color: COLORS.light }}>Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioData.projects.map(project => (
                <div key={project.id} className="p-4 rounded-xl" style={{ background: '#2d1b3d', border: `1px solid ${COLORS.primary}` }}>
                  <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>{project.name}</h3>
                  <p className="text-sm mb-2" style={{ color: COLORS.secondary }}>{project.tech}</p>
                  <p style={{ color: COLORS.light }}>{project.description}</p>
                  {isAdmin && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => handleEdit('projects', project)} className="px-3 py-1 rounded text-sm" style={{ background: COLORS.secondary, color: 'white' }}>Edit</button>
                      <button onClick={() => handleDelete('projects', project.id)} className="px-3 py-1 rounded text-sm" style={{ background: COLORS.accent, color: 'white' }}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Database Status (Admin only) */}
          {isAdmin && (
            <div className="p-6 rounded-3xl" style={{ background: `linear-gradient(135deg, ${COLORS.accent}22 0%, ${COLORS.primary}22 100%)`, border: `2px solid ${COLORS.accent}` }}>
              <div className="flex items-center gap-3 mb-4">
                <Database size={32} style={{ color: COLORS.accent }} />
                <h2 className="text-2xl font-bold" style={{ color: COLORS.light }}>Admin Panel</h2>
              </div>
              <p style={{ color: COLORS.secondary }}>Database: Connected</p>
              <p style={{ color: COLORS.secondary }}>Status: Active</p>
              <button
                onClick={() => setIsAdmin(false)}
                className="mt-4 w-full p-2 rounded-lg font-bold"
                style={{ background: COLORS.accent, color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 pb-8" style={{ color: COLORS.secondary }}>
        <p>© 2024 Portfolio System | Built with FastAPI & React</p>
      </div>
    </div>
  );
};

export default PortfolioApp;