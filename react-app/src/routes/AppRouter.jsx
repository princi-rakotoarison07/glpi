import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Accueil from '../pages/backoffice/Accueil';
import AutrePage from '../pages/backoffice/AutrePage';
import SimpleCrud from '../pages/backoffice/SimpleCrud';
import Dashboard from '../pages/backoffice/parc/Dashboard';
import Reset from '../pages/backoffice/Reset/Reset';
import TicketList from '../pages/backoffice/TicketList';
import TicketDetail from '../pages/backoffice/TicketDetail';
import GLPIImportPage from '../pages/backoffice/Import/GLPIImportPage';
import Login from '../pages/Auth/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées par ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/accueil" replace />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/autre-page" element={<AutrePage />} />
            <Route path="/crud" element={<SimpleCrud />} />
            <Route path="/parc/dashboard" element={<Dashboard />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/tickets" element={<TicketList />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
            <Route path="/import" element={<GLPIImportPage />} />
          </Route>
        </Route>

        {/* Redirection pour toute autre route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
