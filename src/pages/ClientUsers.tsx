import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, UserCheck, Plus, Search, Edit2, Trash2, X, AlertCircle, Building2 } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SingleSearchDropdown } from '../components/ui/SingleSearchDropdown';
import Pagination from '../components/ui/Pagination';

export interface ClientUserItem {
  id: string;
  client: string;
  name: string;
  mobile: string;
  email: string;
  role: string;
  tenantBu: string;
  status: 'Active' | 'Inactive';
}

const mockClientUsers: ClientUserItem[] = [
  { id: 'CLU-2001', client: 'ADCOOP', name: 'Zaid Mansoor', mobile: '+971 50 123 4567', email: 'zaid.m@adcoop.ae', role: 'Client Admin', tenantBu: 'Customer Experience', status: 'Active' },
  { id: 'CLU-2002', client: 'ADDRESS HOME', name: 'Fatima Al-Khatib', mobile: '+971 55 987 6543', email: 'fatima.k@addresshome.com', role: 'Client Manager', tenantBu: 'Retail Commerce', status: 'Active' },
  { id: 'CLU-2003', client: 'AIKYAM', name: 'Rohan Mehta', mobile: '+91 98200 11223', email: 'rohan.mehta@aikyam.in', role: 'Client User', tenantBu: 'Finance & Accounting', status: 'Active' },
  { id: 'CLU-2004', client: 'ATLANCE LOYALTY CLUB', name: 'Elena Rostova', mobile: '+44 7700 900123', email: 'elena.r@atlance.org', role: 'Client Admin', tenantBu: 'Operations & Logistics', status: 'Active' },
  { id: 'CLU-2005', client: 'Actif Club', name: 'Marc Dupont', mobile: '+33 6 12 34 56 78', email: 'marc.d@actifclub.fr', role: 'Client Viewer', tenantBu: 'Customer Experience', status: 'Inactive' },
  { id: 'CLU-2006', client: 'Al Jaroodi', name: 'Khalid Al-Jaroodi', mobile: '+966 50 555 4321', email: 'khalid@aljaroodi.sa', role: 'Client Admin', tenantBu: 'Corporate Services', status: 'Active' },
  { id: 'CLU-2007', client: 'ADCOOP', name: 'Sara Al-Nuaimi', mobile: '+971 52 333 7890', email: 'sara.n@adcoop.ae', role: 'Client User', tenantBu: 'Retail Commerce', status: 'Active' },
  { id: 'CLU-2008', client: 'Apex Retail', name: 'David Miller', mobile: '+1 415 555 2671', email: 'david.miller@apexretail.com', role: 'Client Manager', tenantBu: 'Operations & Logistics', status: 'Active' },
  { id: 'CLU-2009', client: 'Nexus Global', name: 'Pooja Nair', mobile: '+91 98450 67890', email: 'pooja.nair@nexusglobal.com', role: 'Client User', tenantBu: 'IT & Technology', status: 'Inactive' },
  { id: 'CLU-2010', client: 'ADDRESS HOME', name: 'Tariq Hassan', mobile: '+971 54 888 1234', email: 'tariq.h@addresshome.com', role: 'Client Viewer', tenantBu: 'Customer Experience', status: 'Active' },
  { id: 'CLU-2011', client: 'ATLANCE LOYALTY CLUB', name: 'Sophia Chen', mobile: '+65 9123 4567', email: 'sophia.chen@atlance.org', role: 'Client User', tenantBu: 'Customer Experience', status: 'Active' },
  { id: 'CLU-2012', client: 'Actif Club', name: 'Chloe Laurent', mobile: '+33 6 98 76 54 32', email: 'chloe.l@actifclub.fr', role: 'Client User', tenantBu: 'Retail Commerce', status: 'Active' }
];

const CLIENT_OPTIONS = [
  'ADCOOP',
  'ADDRESS HOME',
  'AIKYAM',
  'ATLANCE LOYALTY CLUB',
  'Actif Club',
  'Al Jaroodi',
  'Apex Retail',
  'BLACKBERRYS',
  'Nexus Global'
];

const TENANT_BUS = [
  'Customer Experience',
  'Finance & Accounting',
  'IT & Technology',
  'Operations & Logistics',
  'Retail Commerce',
  'Corporate Services'
];

const ROLES = [
  'Client Admin',
  'Client Manager',
  'Client User',
  'Client Viewer'
];

const STATUS_OPTIONS = ['Active', 'Inactive'];

export default function ClientUsers({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<ClientUserItem[]>(mockClientUsers);
  
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ClientUserItem | null>(null);
  const [formData, setFormData] = useState<Partial<ClientUserItem>>({});
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<ClientUserItem | null>(null);
  
  // Toast
  const [toast, setToast] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsDeleteModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const filteredUsers = useMemo(() => {
    const s = search.toLowerCase();
    return users.filter(u => 
      u.name.toLowerCase().includes(s) || 
      u.client.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.mobile.toLowerCase().includes(s) ||
      u.role.toLowerCase().includes(s) ||
      u.tenantBu.toLowerCase().includes(s) ||
      u.status.toLowerCase().includes(s)
    );
  }, [users, search]);
  
  const totalItems = filteredUsers.length;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Client Admin': return 'error';
      case 'Client Manager': return 'warning';
      case 'Client User': return 'success';
      case 'Client Viewer': return 'neutral';
      default: return 'brand';
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({
      client: '',
      name: '',
      mobile: '',
      email: '',
      role: '',
      tenantBu: '',
      status: 'Active'
    });
    setErrors({});
    setIsDrawerOpen(true);
  };

  const handleEdit = (user: ClientUserItem) => {
    setEditingUser(user);
    setFormData({ ...user });
    setErrors({});
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (user: ClientUserItem) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      showToast(`Client user ${userToDelete.name} deleted successfully`);
    }
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.client?.trim()) newErrors.client = 'Client is required';
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile?.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email ID is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.role?.trim()) newErrors.role = 'Role is required';
    if (!formData.tenantBu?.trim()) newErrors.tenantBu = 'Tenant Business Unit is required';
    if (!formData.status?.trim()) newErrors.status = 'Status is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...(formData as ClientUserItem) } : u));
      showToast('Client user updated successfully');
    } else {
      const nextId = `CLU-${2000 + users.length + 1}`;
      const newUser: ClientUserItem = {
        id: nextId,
        client: formData.client || '',
        name: formData.name || '',
        mobile: formData.mobile || '',
        email: formData.email || '',
        role: formData.role || 'Client User',
        tenantBu: formData.tenantBu || '',
        status: (formData.status as 'Active' | 'Inactive') || 'Active'
      };
      setUsers([newUser, ...users]);
      showToast('Client user created successfully');
    }
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-page relative pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-text-primary text-bg-surface px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-5">
          <div className="w-2 h-2 rounded-full bg-success-text shrink-0" />
          <span>{toast}</span>
          <button onClick={() => setToast('')} className="ml-2 hover:opacity-75">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <button 
            onClick={() => onNavigate('settings')} 
            className="hover:text-text-primary transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft size={14} />
            <span>Settings</span>
          </button>
          <span>/</span>
          <span className="text-text-primary font-semibold">Client Users</span>
        </div>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-default pb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-500/20 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <UserCheck className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">
                  Client Users
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-bg-surface-alt border border-border-default text-text-secondary">
                  {users.length} Total
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                Manage external client accounts, organizations, tenant business units, and role permissions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button 
              variant="primary" 
              icon={Plus} 
              onClick={handleCreate} 
              className="bg-brand-500 hover:bg-brand-600 text-white shadow-sm font-semibold"
            >
              Add Client User
            </Button>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-surface p-4 rounded-xl border border-border-default shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by client, name, email, mobile, role..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-bg-page border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-text-secondary font-medium">
              Showing {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
            </span>
          </div>
        </div>

        {/* Listing Section */}
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-bg-surface border border-border-default rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-bg-page flex items-center justify-center text-text-muted mb-3">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-1">No Client Users Found</h3>
            <p className="text-xs text-text-secondary max-w-sm mb-4">
              {search ? 'No users matched your search criteria. Try a different query or clear filters.' : 'There are currently no client users configured. Add a new client user to get started.'}
            </p>
            {search ? (
              <Button variant="outline" size="sm" onClick={() => setSearch('')}>
                Clear Search
              </Button>
            ) : (
              <Button variant="primary" size="sm" icon={Plus} onClick={handleCreate}>
                Add First Client User
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-bg-surface border border-border-default rounded-xl shadow-xs overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-default bg-bg-page">
                    <th className="px-5 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Client</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Mobile Number</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Email ID</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Role</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Tenant Business Unit</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-bg-surface-hover transition-colors group">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Building2 size={15} className="text-text-muted shrink-0" />
                          <span className="text-sm font-semibold text-text-primary">{user.client}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center text-xs font-bold shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-text-primary">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary font-mono">{user.mobile || '—'}</td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary">{user.email || '—'}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant={getRoleBadgeVariant(user.role) as any} className="py-0.5 px-2 text-[11px] font-semibold">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary">{user.tenantBu}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant={user.status === 'Inactive' ? 'neutral' : 'success'} className="py-0.5 px-2 text-[10px] font-semibold">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2 text-text-muted">
                          <button 
                            onClick={() => handleEdit(user)} 
                            className="hover:text-text-primary transition-colors p-1.5 rounded hover:bg-bg-surface-alt" 
                            title="Edit Client User"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(user)} 
                            className="hover:text-error-text transition-colors p-1.5 rounded hover:bg-error-bg" 
                            title="Delete Client User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden flex flex-col divide-y divide-border-subtle">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 mb-0.5">
                        <Building2 size={13} />
                        <span>{user.client}</span>
                      </div>
                      <h3 className="text-base font-bold text-text-primary">{user.name}</h3>
                      <span className="text-xs text-text-secondary">{user.email}</span>
                    </div>
                    <Badge variant={user.status === 'Inactive' ? 'neutral' : 'success'} className="py-0.5 px-2 text-[10px]">
                      {user.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border-subtle text-text-secondary">
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase tracking-wider">Mobile</span>
                      <span className="font-mono">{user.mobile || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase tracking-wider">Role</span>
                      <Badge variant={getRoleBadgeVariant(user.role) as any} className="py-0 px-1.5 text-[10px]">
                        {user.role}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-text-muted block uppercase tracking-wider">Tenant Business Unit</span>
                      <span>{user.tenantBu}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
                    <Button variant="outline" size="sm" icon={Edit2} onClick={() => handleEdit(user)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" icon={Trash2} onClick={() => handleDeleteClick(user)} className="text-error-text border-error-text/30 hover:bg-error-bg">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalItems > 0 && (
              <div className="p-4 border-t border-border-default bg-bg-page flex items-center justify-between">
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={(size) => {
                    setItemsPerPage(size);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================================================
          CREATE / EDIT SLIDE-OVER DRAWER
          Fields:
          1. client dropdown
          2. Name text field
          3. Mobile number text field
          4. email id text field
          5. role dropdown
          6. tenant business unit dropdown
          7. active inactive dropdown
         ========================================================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in" 
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative w-full max-w-md md:max-w-lg bg-bg-surface h-full shadow-2xl flex flex-col z-10 border-l border-border-default animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-border-default flex items-center justify-between bg-bg-page">
              <div>
                <h2 className="text-lg font-bold text-text-primary tracking-tight">
                  {editingUser ? 'Edit Client User' : 'Add Client User'}
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  {editingUser ? `Update credentials and assignments for ${editingUser.name}` : 'Create a new client user account with tenant affiliation.'}
                </p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-surface-hover rounded-lg transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-28">
              
              {/* Field 1: Client dropdown */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Client *</label>
                <SingleSearchDropdown
                  options={CLIENT_OPTIONS}
                  value={formData.client || ''}
                  onChange={(val) => {
                    setFormData({ ...formData, client: val });
                    if (errors.client) setErrors({ ...errors, client: '' });
                  }}
                  placeholder="Select client"
                  className={'px-3 py-2 bg-bg-page border ' + (errors.client ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong'}
                />
                {errors.client && <p className="text-[10px] text-error-text font-medium">{errors.client}</p>}
              </div>

              {/* Field 2: Name text field */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Name *</label>
                <input 
                  type="text" 
                  value={formData.name || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Enter full name"
                  className={'px-3 py-2 bg-bg-page border ' + (errors.name ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500'}
                />
                {errors.name && <p className="text-[10px] text-error-text font-medium">{errors.name}</p>}
              </div>

              {/* Field 3: Mobile number text field */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Mobile Number *</label>
                <input 
                  type="tel" 
                  value={formData.mobile || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, mobile: e.target.value });
                    if (errors.mobile) setErrors({ ...errors, mobile: '' });
                  }}
                  placeholder="e.g. +971 50 123 4567"
                  className={'px-3 py-2 bg-bg-page border ' + (errors.mobile ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500'}
                />
                {errors.mobile && <p className="text-[10px] text-error-text font-medium">{errors.mobile}</p>}
              </div>

              {/* Field 4: Email ID text field */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Email ID *</label>
                <input 
                  type="email" 
                  value={formData.email || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="e.g. user@client.com"
                  className={'px-3 py-2 bg-bg-page border ' + (errors.email ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500'}
                />
                {errors.email && <p className="text-[10px] text-error-text font-medium">{errors.email}</p>}
              </div>

              {/* Field 5: Role dropdown */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Role *</label>
                <SingleSearchDropdown
                  options={ROLES}
                  value={formData.role || ''}
                  onChange={(val) => {
                    setFormData({ ...formData, role: val });
                    if (errors.role) setErrors({ ...errors, role: '' });
                  }}
                  placeholder="Select client role"
                  className={'px-3 py-2 bg-bg-page border ' + (errors.role ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong'}
                />
                {errors.role && <p className="text-[10px] text-error-text font-medium">{errors.role}</p>}
              </div>

              {/* Field 6: Tenant Business Unit dropdown */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Tenant Business Unit *</label>
                <SingleSearchDropdown
                  options={TENANT_BUS}
                  value={formData.tenantBu || ''}
                  onChange={(val) => {
                    setFormData({ ...formData, tenantBu: val });
                    if (errors.tenantBu) setErrors({ ...errors, tenantBu: '' });
                  }}
                  placeholder="Select tenant business unit"
                  className={'px-3 py-2 bg-bg-page border ' + (errors.tenantBu ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong'}
                />
                {errors.tenantBu && <p className="text-[10px] text-error-text font-medium">{errors.tenantBu}</p>}
              </div>

              {/* Field 7: Active / Inactive dropdown */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Status *</label>
                <SingleSearchDropdown
                  options={STATUS_OPTIONS}
                  value={formData.status || 'Active'}
                  onChange={(val) => {
                    setFormData({ ...formData, status: val as 'Active' | 'Inactive' });
                    if (errors.status) setErrors({ ...errors, status: '' });
                  }}
                  placeholder="Select status"
                  className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong"
                />
                <p className="text-[11px] text-text-muted mt-0.5">
                  Active users have portal access and receive ticket notifications. Inactive users are disabled.
                </p>
                {errors.status && <p className="text-[10px] text-error-text font-medium">{errors.status}</p>}
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-border-default flex justify-end gap-3 bg-bg-page">
              <Button 
                variant="outline" 
                onClick={() => setIsDrawerOpen(false)}
                className="font-medium"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSubmit} 
                className="bg-brand-500 hover:bg-brand-600 text-white font-semibold"
              >
                {editingUser ? 'Save Changes' : 'Create User'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          DELETE CONFIRMATION MODAL
         ========================================================= */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <div className="relative bg-bg-surface border border-border-default rounded-xl p-6 max-w-sm w-full shadow-2xl z-10 animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-error-bg text-error-text flex items-center justify-center mb-4">
              <Trash2 size={20} />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-1">Delete Client User</h3>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-text-primary">{userToDelete.name}</span> ({userToDelete.client})? This action will revoke their access immediately.
            </p>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={confirmDelete} 
                className="bg-error-text hover:bg-error-text/90 text-white"
              >
                Delete User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
