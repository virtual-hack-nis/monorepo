import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { supabase } from './lib/supabase';
import { PrivateRoute } from './routing/PrivateRoute';
import Layout from './components/Layout';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Landing from './pages/landing/Landing';
import Register from './pages/register/Register';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <PrivateRoute>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}