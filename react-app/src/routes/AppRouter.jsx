import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Accueil from '../pages/Accueil';
import AutrePage from '../pages/AutrePage';
import SimpleCrud from '../pages/SimpleCrud';
import Dashboard from '../pages/parc/Dashboard';
import Reset from '../pages/Reset/Reset';
import Login from '../pages/Auth/Login';
import PrivateRoute from '../components/PrivateRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées par PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/accueil" replace />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/autre-page" element={<AutrePage />} />
            <Route path="/crud" element={<SimpleCrud />} />
            <Route path="/parc/dashboard" element={<Dashboard />} />
            <Route path="/reset" element={<Reset />} />
          </Route>
        </Route>

        {/* Redirection pour toute autre route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
