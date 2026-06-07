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
import GLPIImageImportPageV2 from '../pages/backoffice/Import/GLPIImageImportPageV2';
import Login from '../pages/Auth/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import ComputerList from '../pages/backoffice/parc/computer/ComputerList';
import ComputerDetail from '../pages/backoffice/parc/computer/ComputerDetail';
import MonitorList from '../pages/backoffice/parc/monitor/MonitorList';
import MonitorDetail from '../pages/backoffice/parc/monitor/MonitorDetail';
import SoftwareList from '../pages/backoffice/parc/software/SoftwareList';
import SoftwareDetail from '../pages/backoffice/parc/software/SoftwareDetail';
import PrinterList from '../pages/backoffice/parc/printer/PrinterList';
import PrinterDetail from '../pages/backoffice/parc/printer/PrinterDetail';
import PDUList from '../pages/backoffice/parc/pdu/PDUList';
import PDUDetail from '../pages/backoffice/parc/pdu/PDUDetail';
import RackList from '../pages/backoffice/parc/rack/RackList';
import RackDetail from '../pages/backoffice/parc/rack/RackDetail';
import PhoneList from '../pages/backoffice/parc/phone/PhoneList';
import PhoneDetail from '../pages/backoffice/parc/phone/PhoneDetail';
import ChassisList from '../pages/backoffice/parc/chassis/ChassisList';
import ChassisDetail from '../pages/backoffice/parc/chassis/ChassisDetail';
import NetworkList from '../pages/backoffice/parc/network/NetworkList';
import NetworkDetail from '../pages/backoffice/parc/network/NetworkDetail';
import LicenseList from '../pages/backoffice/parc/license/LicenseList';
import LicenseDetail from '../pages/backoffice/parc/license/LicenseDetail';
// FrontOffice
import FrontOfficeAccueil from '../pages/frontoffice/Accueil';
import FrontOfficeElementsList from '../pages/frontoffice/ElementsList';
import FrontOfficeTicketList from '../pages/frontoffice/TicketList';
import TicketCreate from '../pages/frontoffice/TicketCreate';
import TicketUpdate from '../pages/frontoffice/TicketUpdate';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />

        {/* FrontOffice Routes */}
        <Route path="/frontoffice" element={<FrontOfficeAccueil />} />
        <Route path="/frontoffice/elements" element={<FrontOfficeElementsList />} />
        {/* FrontOffice Tickets - protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="/frontoffice/tickets" element={<FrontOfficeTicketList />} />
          <Route path="/frontoffice/tickets/add" element={<TicketCreate />} />
          <Route path="/frontoffice/tickets/:id" element={<TicketUpdate />} />
        </Route>

        {/* Routes protégées par ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/accueil" replace />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/autre-page" element={<AutrePage />} />
            <Route path="/crud" element={<SimpleCrud />} />
            <Route path="/parc/dashboard" element={<Dashboard />} />
            <Route path="/parc/computers" element={<ComputerList />} />
            <Route path="/parc/computers/:id" element={<ComputerDetail />} />
            <Route path="/parc/monitors" element={<MonitorList />} />
            <Route path="/parc/monitors/:id" element={<MonitorDetail />} />
            <Route path="/parc/software" element={<SoftwareList />} />
            <Route path="/parc/software/:id" element={<SoftwareDetail />} />
            <Route path="/parc/printers" element={<PrinterList />} />
            <Route path="/parc/printers/:id" element={<PrinterDetail />} />
            <Route path="/parc/pdus" element={<PDUList />} />
            <Route path="/parc/pdus/:id" element={<PDUDetail />} />
            <Route path="/parc/racks" element={<RackList />} />
            <Route path="/parc/racks/:id" element={<RackDetail />} />
            <Route path="/parc/phones" element={<PhoneList />} />
            <Route path="/parc/phones/:id" element={<PhoneDetail />} />
            <Route path="/parc/chassis" element={<ChassisList />} />
            <Route path="/parc/chassis/:id" element={<ChassisDetail />} />
            <Route path="/parc/network" element={<NetworkList />} />
            <Route path="/parc/network/:id" element={<NetworkDetail />} />
            <Route path="/parc/licenses" element={<LicenseList />} />
            <Route path="/parc/licenses/:id" element={<LicenseDetail />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/tickets" element={<TicketList />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
            <Route path="/import" element={<GLPIImportPage />} />
            <Route path="/import-images" element={<GLPIImageImportPageV2 />} />
          </Route>
        </Route>

        {/* Redirection pour toute autre route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
