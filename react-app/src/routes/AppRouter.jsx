import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Accueil from '../pages/Accueil';
import AutrePage from '../pages/AutrePage';
import SimpleCrud from '../pages/SimpleCrud';
import Dashboard from '../pages/parc/Dashboard';
import Reset from '../pages/Reset/Reset';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/accueil" replace />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/autre-page" element={<AutrePage />} />
          <Route path="/crud" element={<SimpleCrud />} />
          <Route path="/parc/dashboard" element={<Dashboard />} />
          <Route path="/reset" element={<Reset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
