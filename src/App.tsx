import { useState } from "react";
import { Menu, X } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Page } from './types';
import Login from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import Sidebar from './components/Sidebar';
import MyTickets from './pages/MyTickets';
import TicketDetails from './pages/TicketDetails';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import TicketExplorer from './pages/TicketExplorer';
import TicketHistory from './pages/TicketHistory';
import CreatedByMe from './pages/CreatedByMe';
import Settings from './pages/Settings';
import ConfigProjects from './pages/config/ConfigProjects';
import ConfigRequestTypes from './pages/config/ConfigRequestTypes';
import ConfigFormBuilder from './pages/config/ConfigFormBuilder';
import ConfigFieldLibrary from './pages/config/ConfigFieldLibrary';
import ConfigDatasets from './pages/config/ConfigDatasets';
import ConfigRelationships from './pages/config/ConfigRelationships';
import ConfigFormTemplates from './pages/config/ConfigFormTemplates';
import Reports from './pages/Reports';
import Workflows from './pages/Workflows';
import EditWorkflow from './pages/EditWorkflow';
import ClientConfiguration from './pages/ClientConfiguration';
import ClientDetails from './pages/ClientDetails';
import { CreateTicketFlow } from './pages/CreateTicketFlow';
import { FloatingDialer } from './components/FloatingDialer';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import InternalUsers from './pages/InternalUsers';
import ClientUsers from './pages/ClientUsers';
import ProjectConfiguration from './pages/ProjectConfiguration';

import { NotificationBell } from './components/notifications/NotificationBell';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.substring(1) || 'dashboard';
  const searchParams = new URLSearchParams(location.search);
  const newParam = searchParams.get('new');
  const isCreateDrawerOpen = ['ticket', 'internal_task', 'jira_task'].includes(newParam || '');

  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeDrawer = () => {
    navigate(location.pathname);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-page text-text-primary">
      <Sidebar currentPage={currentPath as Page} onNavigate={(p) => { navigate(p.startsWith('/') ? p : `/${p}`); setIsMobileMenuOpen(false); }} isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <header className="h-14 flex items-center justify-between px-4 border-b border-border-default bg-bg-surface shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-md">
              <Menu size={20} />
            </button>
            <div className="md:hidden font-sans text-sm font-semibold text-text-primary">FLOW</div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <NotificationBell />
            <div className="md:hidden w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shrink-0 text-bg-surface font-semibold text-xs shadow-sm">
              MS
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-bg-page relative">
          <Routes>
            <Route path="/dashboard" element={<Dashboard onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/my_tickets" element={<MyTickets onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/ticket_details" element={<TicketDetails onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/tasks" element={<Tasks onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/task_details" element={<TaskDetails onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/ticket_explorer" element={<TicketExplorer onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/ticket_history" element={<TicketHistory onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/created_by_me" element={<CreatedByMe onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/settings" element={<Settings onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/config_projects" element={<ConfigProjects onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/config_request_types" element={<ConfigRequestTypes onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/config_form_builder" element={<ConfigFormBuilder onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/config_field_library" element={<ConfigFieldLibrary onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/config_datasets" element={<ConfigDatasets onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/config_relationships" element={<ConfigRelationships onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/config_form_templates" element={<ConfigFormTemplates onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/reports" element={<Reports onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/client_configuration" element={<ClientConfiguration onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/client_details" element={<ClientDetails onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/project_configuration" element={<ProjectConfiguration onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/workflows" element={<Workflows onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/edit_workflow" element={<EditWorkflow onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/team_management" element={<TeamManagement onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/internal_users" element={<InternalUsers onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/client_users" element={<ClientUsers onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        
        {isCreateDrawerOpen && <CreateTicketFlow type={newParam} onClose={closeDrawer} />}
        <FloatingDialer />
      </div>
    </div>
  );
}

function RootRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.hash === '#reset-password') {
    return <ResetPassword onBackToLogin={() => { window.location.hash = ''; navigate('/login'); }} />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => navigate('/dashboard')} />} />
      <Route path="/forgot_password" element={<ForgotPassword onBack={() => navigate('/login')} />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  );
}
