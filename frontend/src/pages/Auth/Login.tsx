import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuthStore();

    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setError('');
          setLoading(true);
          try {
                  await login(username, password);
          } catch (err: any) {
                  setError(err.message || 'Credenciales incorrectas');
          } finally {
                  setLoading(false);
          }
    };

    return (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
                  <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 16px rgba(0,0,0,0.1)', width: '360px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                        <h1 style={{ color: '#1890ff', fontSize: '28px', fontWeight: 700, margin: 0 }}>WispHub</h1>h1>
                                        <p style={{ color: '#666', marginTop: '8px' }}>Gestión ISP</p>p>
                            </div>div>
                            <form onSubmit={handleSubmit}>
                                        <div style={{ marginBottom: '16px' }}>
                                                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Usuario</label>label>
                                                      <input
                                                                      type="text"
                                                                      value={username}
                                                                      onChange={e => setUsername(e.target.value)}
                                                                      required
                                                                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                                                                      placeholder="Ingresa tu usuario"
                                                                    />
                                        </div>div>
                                        <div style={{ marginBottom: '24px' }}>
                                                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Contraseña</label>label>
                                                      <input
                                                                      type="password"
                                                                      value={password}
                                                                      onChange={e => setPassword(e.target.value)}
                                                                      required
                                                                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                                                                      placeholder="Ingresa tu contraseña"
                                                                    />
                                        </div>div>
                              {error && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>{error}</div>div>}
                                        <button
                                                      type="submit"
                                                      disabled={loading}
                                                      style={{ width: '100%', padding: '10px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                                                    >
                                          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                                        </button>button>
                            </form>form>
                  </div>div>
          </div>div>
        );
};

export default Login;</button>
