
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Users, Plus, Search, Edit2, Trash2, X, Filter, Check, AlertCircle } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SingleSearchDropdown } from '../components/ui/SingleSearchDropdown';
import Pagination from '../components/ui/Pagination';

const mockUsers = [
  { id: 'EMP-1001', name: 'Ankita Verma', mobile: '9876543210', email: 'ankita.verma@example.com', manager: 'Rahul Singh', manager2: 'Priya Sharma', bu: 'Customer Support', sbu: 'Order Support', role: 'Manager', designation: 'Support Lead' },
  { id: 'EMP-1002', name: 'Rahul Singh', mobile: '9123456780', email: 'rahul.s@example.com', manager: 'Priya Sharma', manager2: '', bu: 'Finance', sbu: 'Refunds', role: 'Agent', designation: 'Finance Agent' },
  { id: 'EMP-1003', name: 'Priya Sharma', mobile: '9988776655', email: 'priya.s@example.com', manager: 'Amit Kumar', manager2: '', bu: 'Onboarding', sbu: 'KYC', role: 'Admin', designation: 'Onboarding Lead' },
  { id: 'EMP-1004', name: 'Amit Kumar', mobile: '9001122334', email: 'amit.k@example.com', manager: '—', manager2: '', bu: 'Account Ops', sbu: 'Profile', role: 'Manager', designation: 'Ops Manager' },
  { id: 'EMP-1005', name: 'Sumit Rawat', mobile: '8948985423', email: 'sumit.r@example.com', manager: 'Ankita Verma', manager2: '', bu: 'Customer Support', sbu: 'Tier 1', role: 'Agent', designation: 'Support Agent' },
  { id: 'EMP-1006', name: 'Anoop M', mobile: '8953997805', email: 'anoop.m@example.com', manager: 'Priya Sharma', manager2: '', bu: 'Retail', sbu: 'Store Ops', role: 'Agent', designation: 'Retail Ops' },
  { id: 'EMP-1007', name: 'Sujeet Singh', mobile: '9718982159', email: 'sujeet.s@example.com', manager: 'Amit Kumar', manager2: '', bu: 'Quality', sbu: 'Audit', role: 'Agent', designation: 'QA Agent' },
  { id: 'EMP-1008', name: 'Mangesh Mistry', mobile: '9665958060', email: 'mangesh.m@example.com', manager: 'Rahul Singh', manager2: '', bu: 'Finance', sbu: 'Reporting', role: 'Viewer', designation: 'Analyst' },
  { id: 'EMP-1009', name: 'Shlok Barot', mobile: '9665958060', email: 'shlok.b@example.com', manager: 'Ankita Verma', manager2: '', bu: 'Customer Support', sbu: 'Tier 2', role: 'Agent', designation: 'Support Escalation' },
  { id: 'EMP-1010', name: 'Mani Sai', mobile: '9347917238', email: 'mani.s@example.com', manager: '—', manager2: '', bu: 'Leadership', sbu: 'Executive', role: 'Admin', designation: 'Exec' },
  { id: 'EMP-1011', name: 'Jane Doe', mobile: '9876543211', email: 'jane.d@example.com', manager: 'Ankita Verma', manager2: '', bu: 'Customer Support', sbu: 'Tier 1', role: 'Agent', designation: 'Support Agent' },
  { id: 'EMP-1012', name: 'John Smith', mobile: '9876543212', email: 'john.s@example.com', manager: 'Rahul Singh', manager2: '', bu: 'Finance', sbu: 'Reporting', role: 'Viewer', designation: 'Analyst' },
  { id: 'EMP-1013', name: 'Alice Johnson', mobile: '9876543213', email: 'alice.j@example.com', manager: 'Priya Sharma', manager2: '', bu: 'Onboarding', sbu: 'KYC', role: 'Agent', designation: 'Onboarding Agent' },
  { id: 'EMP-1014', name: 'Bob Williams', mobile: '9876543214', email: 'bob.w@example.com', manager: 'Amit Kumar', manager2: '', bu: 'Account Ops', sbu: 'Profile', role: 'Agent', designation: 'Ops Agent' },
  { id: 'EMP-1015', name: 'Charlie Brown', mobile: '9876543215', email: 'charlie.b@example.com', manager: 'Mani Sai', manager2: '', bu: 'Leadership', sbu: 'Executive', role: 'Manager', designation: 'Director' }
];

const BU_SBU_MAP: Record<string, string[]> = {
  'Customer Support': ['Order Support', 'Refunds', 'Tier 1', 'Tier 2', 'Support Escalation'],
  'Finance': ['Reporting', 'Refunds'],
  'Onboarding': ['KYC', 'Compliance'],
  'Retail': ['Store Ops', 'Inventory'],
  'Leadership': ['Executive'],
  'Account Ops': ['Profile'],
  'Quality': ['Audit']
};
const BUs = Object.keys(BU_SBU_MAP);
const ROLES = ['Admin', 'Manager', 'Agent', 'Viewer'];

export default function InternalUsers({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);
  
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  
  // Toast
  const [toast, setToast] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Filter logic
  
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
      u.id.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.mobile.includes(s)
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
      case 'Admin': return 'error';
      case 'Manager': return 'warning';
      case 'Agent': return 'success';
      case 'Viewer': return 'neutral';
      default: return 'primary';
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({
      id: '', name: '', mobile: '', email: '', designation: '', role: '', manager: '', manager2: '', bu: '', sbu: ''
    });
    setErrors({});
    setIsDrawerOpen(true);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({ ...user });
    setErrors({});
    setIsDrawerOpen(true);
  };

  const confirmDelete = (id: string) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      showToast('User deleted successfully');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.id?.trim()) newErrors.id = 'Employee ID is required';
    if (!formData.name?.trim()) newErrors.name = 'User Name is required';
    if (!formData.role?.trim()) newErrors.role = 'Role is required';
    if (!formData.bu?.trim()) newErrors.bu = 'Business Unit is required';
    if (!formData.sbu?.trim()) newErrors.sbu = 'Sub Business Unit is required';
    
    if (formData.id && users.some(u => u.id === formData.id && u.id !== editingUser?.id)) {
      newErrors.id = 'Employee ID already exists';
    }
    
    if (formData.email && users.some(u => u.email === formData.email && u.id !== editingUser?.id)) {
      newErrors.email = 'Email already exists';
    }
    
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }
    
    if (formData.email && !/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      showToast('User updated successfully');
    } else {
      setUsers([{ ...formData }, ...users]);
      showToast('User created successfully');
    }
    setIsDrawerOpen(false);
  };

  // Extract manager options
  const managerOptions = useMemo(() => {
    const opts = users.map(u => u.name);
    if (!opts.includes('—')) opts.unshift('—');
    return opts;
  }, [users]);
  
  // Dependent SBU options
  const currentSBUOptions = useMemo(() => {
    return formData.bu ? (BU_SBU_MAP[formData.bu] || []) : [];
  }, [formData.bu]);

  return (
    <div className="flex flex-col bg-bg-page w-full h-full relative">
      <div className="p-8 max-w-[1400px] mx-auto w-full space-y-6">
        
        {/* Breadcrumb & Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
            <span className="hover:text-text-primary cursor-pointer transition-colors" onClick={() => onNavigate('settings')}>Settings</span>
            <span>/</span>
            <span className="text-text-secondary font-medium">Internal Users</span>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                <Users size={24} className="text-text-secondary" />
                Internal Users
              </h1>
              <p className="text-text-secondary mt-1">Manage agents, managers, and admins who access the support workspace.</p>
            </div>
            <Button variant="primary" icon={Plus} onClick={handleCreate}>Create User</Button>
          </div>
        </div>

        {/* Search & List */}
        <div className="card-base bg-bg-surface overflow-hidden border border-border-default shadow-sm">
          <div className="p-4 border-b border-border-subtle flex justify-between items-center">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search by name, employee ID, email, mobile..." 
                className="w-full pl-9 pr-4 py-2 bg-bg-page border border-border-default rounded-md text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="text-sm text-text-muted">
              {totalItems} users
            </div>
          </div>

          <div className="overflow-x-auto min-h-[400px]">
            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-brand-500" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">No Internal Users Found</h3>
                <p className="text-sm text-text-secondary mb-4">Try adjusting your search or create a new user.</p>
                <Button variant="primary" icon={Plus} onClick={handleCreate}>Create User</Button>
              </div>
            ) : (
              <>
              <table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">
                <thead>
                  <tr className="border-b border-border-default bg-bg-page">
                    <th className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Employee ID</th>
                    <th className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">User Name</th>
                    <th className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Mobile Number</th>
                    <th className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Reporting Manager</th>
                    <th className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Business Unit</th>
                    <th className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Sub Business Unit</th>
                    <th className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {paginatedUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-bg-surface-hover transition-colors group">
                      <td className="px-4 py-3"><span className="text-xs font-mono text-text-secondary">{user.id}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-text-primary">{user.name}</span>
                          <span className="text-[11px] text-text-muted">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{user.mobile || '—'}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{user.manager || '—'}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{user.bu}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{user.sbu}</td>
                      <td className="px-4 py-3">
                        <Badge variant={getRoleBadgeVariant(user.role) as any} className="py-1 px-2 text-[10px] uppercase tracking-wider font-bold">{user.role}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-3 text-text-muted">
                          <button onClick={() => handleEdit(user)} className="hover:text-text-primary transition-colors p-1" title="Edit User">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => confirmDelete(user.id)} className="hover:text-error-text transition-colors p-1" title="Delete User">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
                {paginatedUsers.map((user, index) => (
                  <div key={user.id} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-text-primary">{user.name}</span>
                        <span className="text-[11px] text-text-muted">{user.email}</span>
                      </div>
                      <Badge variant={getRoleBadgeVariant(user.role) as any} className="py-1 px-2 text-[10px] uppercase tracking-wider font-bold">
                        {user.role}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-text-secondary">
                      <span className="font-mono text-text-secondary">{user.id}</span>
                      <span>{user.bu} • {user.sbu}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-border-subtle">
                      <span className="text-xs text-text-secondary">Manager: {user.manager || '—'}</span>
                      <div className="flex items-center gap-3 text-text-muted">
                        <button onClick={() => handleEdit(user)} className="hover:text-text-primary transition-colors p-1" title="Edit User">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => confirmDelete(user.id)} className="hover:text-error-text transition-colors p-1" title="Delete User">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </>
            )}
          </div>
          
          {totalItems > 0 && (
            <Pagination 
              totalItems={totalItems} 
              itemsPerPage={itemsPerPage} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setItemsPerPage(size);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      </div>

      {/* Slide-out Drawer for Create/Edit User */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="relative w-full max-w-[500px] bg-bg-surface h-full shadow-2xl border-l border-border-strong flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border-default bg-bg-page">
              <div>
                <h2 className="text-xl font-bold text-text-primary tracking-tight">{editingUser ? 'Edit User' : 'Create User'}</h2>
                <p className="text-sm text-text-secondary mt-1">{editingUser ? "Update the user's details and organization mapping." : "Add a new internal user to the workspace."}</p>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-bg-surface-hover transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Personal Info */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-text-primary border-b border-border-subtle pb-2 uppercase tracking-wider">Personal Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Employee ID *</label>
                    <input 
                      type="text" 
                      className={'w-full bg-bg-page border ' + (errors.id ? 'border-error-text' : 'border-border-default') + ' rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-500 disabled:opacity-50'}
                      value={formData.id || ''}
                      onChange={e => {
                        setFormData({...formData, id: e.target.value});
                        if (errors.id) setErrors({...errors, id: ''});
                      }}
                      disabled={!!editingUser}
                      placeholder="EMP-1234"
                    />
                    {errors.id && <p className="text-[10px] text-error-text font-medium">{errors.id}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">User Name *</label>
                    <input 
                      type="text" 
                      className={'w-full bg-bg-page border ' + (errors.name ? 'border-error-text' : 'border-border-default') + ' rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-500'}
                      value={formData.name || ''}
                      onChange={e => {
                        setFormData({...formData, name: e.target.value});
                        if (errors.name) setErrors({...errors, name: ''});
                      }}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-[10px] text-error-text font-medium">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Mobile Number</label>
                    <input 
                      type="text" 
                      className={'w-full bg-bg-page border ' + (errors.mobile ? 'border-error-text' : 'border-border-default') + ' rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-500'}
                      value={formData.mobile || ''}
                      onChange={e => {
                        setFormData({...formData, mobile: e.target.value});
                        if (errors.mobile) setErrors({...errors, mobile: ''});
                      }}
                      placeholder="9876543210"
                    />
                    {errors.mobile && <p className="text-[10px] text-error-text font-medium">{errors.mobile}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Email ID</label>
                    <input 
                      type="email" 
                      className={'w-full bg-bg-page border ' + (errors.email ? 'border-error-text' : 'border-border-default') + ' rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-500'}
                      value={formData.email || ''}
                      onChange={e => {
                        setFormData({...formData, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: ''});
                      }}
                      placeholder="user@company.com"
                    />
                    {errors.email && <p className="text-[10px] text-error-text font-medium">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Designation</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-page border border-border-default rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                      value={formData.designation || ''}
                      onChange={e => setFormData({...formData, designation: e.target.value})}
                      placeholder="Support Lead"
                    />
                  </div>
                  
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Role *</label>
                    <SingleSearchDropdown 
                      options={ROLES}
                      value={formData.role || ''}
                      onChange={(val) => {
                        setFormData({...formData, role: val});
                        if (errors.role) setErrors({...errors, role: ''});
                      }}
                      placeholder="Select role"
                      className={'px-3 py-2 bg-bg-page border ' + (errors.role ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong'}
                    />
                    {errors.role && <p className="text-[10px] text-error-text font-medium">{errors.role}</p>}
                  </div>
                </div>
              </section>

              {/* Organization Structure */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-text-primary border-b border-border-subtle pb-2 uppercase tracking-wider">Organization Structure</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Reporting Manager</label>
                    <SingleSearchDropdown 
                      options={managerOptions}
                      value={formData.manager || ''}
                      onChange={(val) => setFormData({...formData, manager: val})}
                      placeholder="Select manager"
                      className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong"
                    />
                  </div>
                  
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Reporting Manager 2</label>
                    <SingleSearchDropdown 
                      options={managerOptions}
                      value={formData.manager2 || ''}
                      onChange={(val) => setFormData({...formData, manager2: val})}
                      placeholder="Select manager"
                      className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong"
                    />
                  </div>
                  
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Business Unit *</label>
                    <SingleSearchDropdown 
                      options={BUs}
                      value={formData.bu || ''}
                      onChange={(val) => {
                        setFormData({...formData, bu: val, sbu: ''}); // Reset SBU when BU changes
                        if (errors.bu) setErrors({...errors, bu: ''});
                      }}
                      placeholder="Select business unit"
                      className={'px-3 py-2 bg-bg-page border ' + (errors.bu ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong'}
                    />
                    {errors.bu && <p className="text-[10px] text-error-text font-medium">{errors.bu}</p>}
                  </div>
                  
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Sub Business Unit *</label>
                    <SingleSearchDropdown 
                      options={currentSBUOptions}
                      value={formData.sbu || ''}
                      onChange={(val) => {
                        setFormData({...formData, sbu: val});
                        if (errors.sbu) setErrors({...errors, sbu: ''});
                      }}
                      placeholder="Select sub-unit"
                      className={'px-3 py-2 bg-bg-page border ' + (errors.sbu ? 'border-error-text' : 'border-border-default') + ' rounded-md text-sm text-text-primary shadow-sm hover:border-border-strong'}
                    />
                    {errors.sbu && <p className="text-[10px] text-error-text font-medium">{errors.sbu}</p>}
                  </div>
                </div>
              </section>
            </div>
            
            <div className="p-6 border-t border-border-default flex justify-end gap-3 bg-bg-page">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSave}>{editingUser ? 'Save Changes' : 'Create User'}</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="relative bg-bg-surface w-[400px] rounded-xl shadow-xl border border-border-default overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-error-bg flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-error-text" />
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Delete User?</h2>
              <p className="text-sm text-text-secondary">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
            </div>
            <div className="p-4 bg-bg-surface-hover border-t border-border-subtle flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="!bg-error-text hover:!bg-red-600" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-text-primary text-bg-page px-4 py-3 rounded-lg shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 rounded-full bg-success-text/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-400" />
          </div>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
