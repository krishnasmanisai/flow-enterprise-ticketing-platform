import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, CheckSquare, Search, UserPlus, Settings, LogOut, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Page } from '../types';
import { Button } from './ui/Button';

export default function Sidebar({ currentPage, onNavigate, isMobileOpen = false, onMobileClose }: { currentPage: Page; onNavigate?: (page: Page) => void; isMobileOpen?: boolean; onMobileClose?: () => void; }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' as Page },
    { icon: Ticket, label: 'My Tickets', page: 'my_tickets' as Page },
    { icon: UserPlus, label: 'Created By Me', page: 'created_by_me' as Page },
    { icon: CheckSquare, label: 'Tasks', page: 'tasks' as Page },
    { icon: Search, label: 'Ticket Explorer', page: 'ticket_explorer' as Page },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onMobileClose}
        />
      )}

      <aside aria-label="Sidebar Navigation" className={`fixed inset-y-0 left-0 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative flex flex-col h-full flex-shrink-0 z-50 border-r border-border-default bg-bg-surface transition-all duration-300 ${isCollapsed ? 'w-[72px]' : 'w-64'}`}>
      <div className="h-14 flex items-center justify-between px-4 border-b border-border-default">
        <div className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 shrink-0 rounded-lg border border-brand-500/20 bg-brand-50 flex items-center justify-center font-bold text-xs text-brand-600 shadow-sm">
            ER
          </div>
          {!isCollapsed && (
            <div className="relative flex flex-col flex-1 min-w-0">
              <span className="font-sans text-sm font-bold text-text-primary truncate">Easyrewardz</span>
              <span className="text-[11px] font-medium text-text-muted truncate">
                Enterprise Support Ticketing
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 relative" 
           onMouseEnter={() => setIsNewMenuOpen(true)}
           onMouseLeave={() => setIsNewMenuOpen(false)}>
        {isCollapsed ? (
          <Button 
            variant="primary" 
            size="icon"
            className="w-10 h-10 mx-auto bg-brand-500 hover:bg-brand-600 text-white"
            icon={Plus}
            title="New"
            onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
          />
        ) : (
          <Button 
            variant="primary" 
            className="w-full justify-start bg-brand-500 hover:bg-brand-600 text-white"
            icon={Plus}
            onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
          >
            New
          </Button>
        )}
        
        {isNewMenuOpen && (
          <div className={`absolute top-14 ${isCollapsed ? 'left-14' : 'left-4 w-56'} bg-bg-surface border border-border-default rounded-md shadow-xl py-1 z-[100] animate-in fade-in duration-200`}>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-surface-hover transition-colors"
              onClick={() => navigate('?new=ticket')}
            >
              Create New Ticket
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-surface-hover transition-colors"
              onClick={() => navigate('?new=internal_task')}
            >
              Create New Internal Task
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-surface-hover transition-colors"
              onClick={() => navigate('?new=jira_task')}
            >
              Create New Jira Task
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          const activeClass = isActive 
            ? 'bg-bg-surface-hover text-text-primary font-medium shadow-sm border-border-default'
            : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary border-transparent';
            
          return (
            <Link
              key={item.page}
              to={`/${item.page}`}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center ${isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'w-full gap-2.5 px-3 py-2'} rounded-md text-sm transition-all duration-150 border ${activeClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
            >
              <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} shrink-0 ${isActive ? 'text-text-primary' : 'text-text-muted'}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border-default space-y-1">
        {/* User Profile */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-10 h-10 mx-auto mb-2' : 'w-full gap-3 px-3 py-2 mb-2'} rounded-md text-sm transition-colors`}>
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-sm">
            AV
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-text-primary truncate">Ankita Verma</span>
              <span className="text-[11px] text-text-muted truncate">ankita.verma@easyrewardz.com</span>
            </div>
          )}
        </div>

        <Link 
          to="/settings"
          title={isCollapsed ? "Settings" : undefined}
          className={`flex items-center ${isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'w-full gap-2.5 px-3 py-2'} rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 border ${
            currentPage === 'settings' 
              ? 'bg-bg-surface-hover text-text-primary font-medium border-border-default shadow-sm' 
              : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary border-transparent'
          }`}
        >
          <Settings className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} shrink-0 ${currentPage === 'settings' ? 'text-text-primary' : 'text-text-muted'}`} />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <Link 
          to="/login"
          title={isCollapsed ? "Logout" : undefined}
          className={`flex items-center ${isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'w-full gap-2.5 px-3 py-2'} rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 text-text-secondary hover:bg-error-bg hover:text-error-text border border-transparent`}
        >
          <LogOut className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} shrink-0 text-text-muted`} />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>

      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 bg-bg-surface hidden md:flex border border-border-default rounded-full flex items-center justify-center text-text-muted hover:text-text-primary shadow-sm hover:border-border-strong transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
    </>
  );
}
