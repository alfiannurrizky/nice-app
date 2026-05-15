import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, LogOut, Package, Users } from 'lucide-react';
import { getToken, removeToken } from '../utils/auth';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [productsRes, usersRes] = await Promise.all([
          fetch(`${API_URL}/products`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (productsRes.status === 401 || usersRes.status === 401 || productsRes.status === 403 || usersRes.status === 403) {
          removeToken();
          navigate('/login');
          return;
        }

        const productsData = await productsRes.json();
        const usersData = await usersRes.json();

        setProducts(productsData);
        setUsers(usersData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, API_URL]);

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen flex-center"><div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: '600' }}>Loading Dashboard...</div></div>;
  }

  return (
    <div className="container min-h-screen">
      <nav className="navbar">
        <div className="nav-brand">
          <Zap className="text-gradient" />
          <span>Dashboard</span>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{ border: 'none' }}>
          <LogOut size={18} /> Logout
        </button>
      </nav>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={18} /> Products
        </button>
        <button 
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} /> Users
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {activeTab === 'products' ? <><Package className="text-gradient" /> Products Directory</> : <><Users className="text-gradient" /> Users Directory</>}
        </h2>
        
        <div className="table-container">
          {activeTab === 'products' ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td style={{ fontWeight: '500' }}>{product.name}</td>
                    <td style={{ color: '#94a3b8' }}>{product.description}</td>
                    <td>${Number(product.price).toFixed(2)}</td>
                    <td>
                      <span style={{ 
                        background: product.stock > 10 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                        color: product.stock > 10 ? '#22c55e' : '#f59e0b',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        {product.stock} in stock
                      </span>
                    </td>
                  </tr>
                )) : <tr><td colSpan="5" style={{ textAlign: 'center' }}>No products found</td></tr>}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td style={{ fontWeight: '500' }}>{user.username}</td>
                    <td>
                      <span style={{ 
                        background: user.role === 'admin' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                        color: user.role === 'admin' ? '#8b5cf6' : '#3b82f6',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        textTransform: 'capitalize'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ color: '#94a3b8' }}>{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                )) : <tr><td colSpan="4" style={{ textAlign: 'center' }}>No users found</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
