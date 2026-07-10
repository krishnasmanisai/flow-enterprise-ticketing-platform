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
import Reports from './pages/Reports';
import Workflows from './pages/Workflows';
import EditWorkflow from './pages/EditWorkflow';
import ClientConfiguration from './pages/ClientConfiguration';
import ClientDetails from './pages/ClientDetails';
import { CreateTicketFlow } from './pages/CreateTicketFlow';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import InternalUsers from './pages/InternalUsers';
import ProjectConfiguration from './pages/ProjectConfiguration';

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
        <div className="md:hidden h-14 flex items-center justify-between px-4 border-b border-border-default bg-bg-surface shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-md">
              <Menu size={20} />
            </button>
            <div className="font-sans text-sm font-semibold text-text-primary">FLOW</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shrink-0 text-bg-surface font-semibold text-xs shadow-sm">
            MS
          </div>
        </div>
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
            <Route path="/reports" element={<Reports onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/client_configuration" element={<ClientConfiguration onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/client_details" element={<ClientDetails onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/project_configuration" element={<ProjectConfiguration onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/workflows" element={<Workflows onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/edit_workflow" element={<EditWorkflow onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/team_management" element={<TeamManagement onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/internal_users" element={<InternalUsers onNavigate={(p) => navigate(p.startsWith('/') ? p : `/${p}`)} />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        
        {isCreateDrawerOpen && <CreateTicketFlow type={newParam} onClose={closeDrawer} />}
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
