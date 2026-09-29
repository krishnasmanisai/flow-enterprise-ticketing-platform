import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronRight, 
  Search, 
  Building, 
  ArrowLeft, 
  Edit2, 
  Plus, 
  X, 
  Copy, 
  Check, 
  Terminal, 
  Key, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Code2, 
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  Server
} from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import Pagination from '../components/ui/Pagination';
import { SingleSearchDropdown } from '../components/ui/SingleSearchDropdown';

export interface SandboxConfig {
  baseApiUrl: string;
  programCode: string;
  userName: string;
  userPassword?: string;
  devId: string;
  appId: string;
  securityUser?: string;
  storeCode: string;
}

export interface ClientEntity {
  id: string;
  name: string;
  displayName: string;
  programCode: string;
  ticketPrefix: string;
  status: 'Active' | 'Inactive';
  queues: string;
  modified: string;
  sandbox: SandboxConfig;
}

const DEFAULT_SANDBOX_BASE_URL = 'https://lpaaswebapi.easyrewardz.com/api/';

const initialClients: ClientEntity[] = [
  { 
    id: 'CL-101', 
    name: 'ADCOOP', 
    displayName: 'Abu Dhabi Co-operative Society', 
    programCode: 'ADCOOP_REWARDS', 
    ticketPrefix: 'ADC',
    status: 'Active', 
    queues: '6/33', 
    modified: 'Jun 19, 2026',
    sandbox: {
      baseApiUrl: DEFAULT_SANDBOX_BASE_URL,
      programCode: 'ADCOOP_SBX',
      userName: 'adcoop_sbx_user',
      userPassword: 'Adcoop@Sandbox2026#',
      devId: 'DEV-ADC-9921',
      appId: 'APP-ADC-4402',
      securityUser: 'adcoop_api_sec',
      storeCode: 'STR-AUH-01'
    }
  },
  { 
    id: 'CL-102', 
    name: 'ADDRESS HOME', 
    displayName: 'Address Home Luxury Living', 
    programCode: 'ADDR_HOME_VIP', 
    ticketPrefix: 'ADH',
    status: 'Active', 
    queues: '6/33', 
    modified: 'Jul 3, 2026',
    sandbox: {
      baseApiUrl: DEFAULT_SANDBOX_BASE_URL,
      programCode: 'ADDR_HOME_SBX',
      userName: 'addresshome_api',
      userPassword: 'Home@DevVault99!',
      devId: 'DEV-ADH-7712',
      appId: 'APP-ADH-2018',
      securityUser: 'address_auth_usr',
      storeCode: 'STR-DEL-101'
    }
  },
  { 
    id: 'CL-103', 
    name: 'AIKYAM', 
    displayName: 'Aikyam Retail Ventures', 
    programCode: 'AIKYAM_CORE', 
    ticketPrefix: 'AIK',
    status: 'Inactive', 
    queues: '4/28', 
    modified: 'Jun 17, 2026',
    sandbox: {
      baseApiUrl: DEFAULT_SANDBOX_BASE_URL,
      programCode: 'AIKYAM_SBX',
      userName: 'aikyam_gateway',
      userPassword: 'Aikyam#DevTest2026',
      devId: 'DEV-AIK-3104',
      appId: 'APP-AIK-8821',
      securityUser: 'aikyam_sec_mgr',
      storeCode: 'STR-BOM-05'
    }
  },
  { 
    id: 'CL-104', 
    name: 'ATLANCE LOYALTY CLUB', 
    displayName: 'Atlance Premier Loyalty Club', 
    programCode: 'ATLANCE_PREMIER', 
    ticketPrefix: 'ATL',
    status: 'Active', 
    queues: '8/40', 
    modified: 'Jun 17, 2026',
    sandbox: {
      baseApiUrl: DEFAULT_SANDBOX_BASE_URL,
      programCode: 'ATLANCE_SBX',
      userName: 'atlance_svc_acc',
      userPassword: 'Atlance@Key99Pass',
      devId: 'DEV-ATL-5510',
      appId: 'APP-ATL-1109',
      securityUser: 'atlance_auth_lead',
      storeCode: 'STR-LON-42'
    }
  },
  { 
    id: 'CL-105', 
    name: 'Actif Club', 
    displayName: 'Actif Fitness & Wellness Club', 
    programCode: 'ACTIF_WELLNESS', 
    ticketPrefix: 'ACT',
    status: 'Active', 
    queues: '5/20', 
    modified: 'Jul 3, 2026',
    sandbox: {
      baseApiUrl: DEFAULT_SANDBOX_BASE_URL,
      programCode: 'ACTIF_SBX',
      userName: 'actif_partner_api',
      userPassword: 'Actif@Paris2026!',
      devId: 'DEV-ACT-8291',
      appId: 'APP-ACT-7033',
      securityUser: 'actif_sec_ops',
      storeCode: 'STR-PAR-02'
    }
  },
  { 
    id: 'CL-106', 
    name: 'Al Jaroodi', 
    displayName: 'Al Jaroodi Group Global', 
    programCode: 'JAROODI_ENT', 
    ticketPrefix: 'ALJ',
    status: 'Active', 
    queues: '6/33', 
    modified: 'Jul 2, 2026',
    sandbox: {
      baseApiUrl: DEFAULT_SANDBOX_BASE_URL,
      programCode: 'JAROODI_SBX',
      userName: 'jaroodi_cloud_usr',
      userPassword: 'Jaroodi#Secure91',
      devId: 'DEV-JAR-1094',
      appId: 'APP-JAR-9452',
      securityUser: 'jaroodi_sysadmin',
      storeCode: 'STR-RUH-18'
    }
  },
  { 
    id: 'CL-107', 
    name: 'BLACKBERRYS', 
    displayName: 'Blackberrys Menswear & Apparel', 
    programCode: 'BLACKBERRYS_REWARDS', 
    ticketPrefix: 'BLB',
    status: 'Active', 
    queues: '7/35', 
    modified: 'Jul 14, 2026',
    sandbox: {
      baseApiUrl: DEFAULT_SANDBOX_BASE_URL,
      programCode: 'BLACKBERRYS_SBX',
      userName: 'blackberrys_sbx_user',
      userPassword: 'Blb@Sandbox2026#',
      devId: 'DEV-BLB-8831',
      appId: 'APP-BLB-5520',
      securityUser: 'blb_api_sec',
      storeCode: 'STR-BLB-01'
    }
  },
];

export default function ClientConfiguration({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [clients, setClients] = useState<ClientEntity[]>(initialClients);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Drawer / Modal states
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientEntity | null>(null);
  
  // Sandbox Consumer Drawer state
  const [activeSandboxClient, setActiveSandboxClient] = useState<ClientEntity | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isTestingSandbox, setIsTestingSandbox] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<{
    name: string;
    displayName: string;
    programCode: string;
    ticketPrefix: string;
    status: 'Active' | 'Inactive';
    sandboxBaseUrl: string;
    sandboxProgramCode: string;
    sandboxUserName: string;
    sandboxUserPassword: string;
    sandboxDevId: string;
    sandboxAppId: string;
    sandboxSecurityUser: string;
    sandboxStoreCode: string;
  }>({
    name: '',
    displayName: '',
    programCode: '',
    ticketPrefix: '',
    status: 'Active',
    sandboxBaseUrl: DEFAULT_SANDBOX_BASE_URL,
    sandboxProgramCode: '',
    sandboxUserName: '',
    sandboxUserPassword: '',
    sandboxDevId: '',
    sandboxAppId: '',
    sandboxSecurityUser: '',
    sandboxStoreCode: ''
  });
  
  const [formTab, setFormTab] = useState<'details' | 'sandbox'>('details');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filter logic
  const filteredClients = useMemo(() => {
    const s = search.toLowerCase();
    return clients.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(s) ||
        c.displayName.toLowerCase().includes(s) ||
        c.programCode.toLowerCase().includes(s) ||
        (c.ticketPrefix && c.ticketPrefix.toLowerCase().includes(s)) ||
        c.sandbox.storeCode.toLowerCase().includes(s);
      
      const matchesStatus = 
        statusFilter === 'All Statuses' || c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, statusFilter]);

  const totalItems = filteredClients.length;
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, currentPage, pageSize]);

  // Open "Add Client"
  const handleOpenAddClient = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      displayName: '',
      programCode: '',
      ticketPrefix: '',
      status: 'Active',
      sandboxBaseUrl: DEFAULT_SANDBOX_BASE_URL,
      sandboxProgramCode: '',
      sandboxUserName: '',
      sandboxUserPassword: '',
      sandboxDevId: '',
      sandboxAppId: '',
      sandboxSecurityUser: '',
      sandboxStoreCode: ''
    });
    setErrors({});
    setFormTab('details');
    setIsClientModalOpen(true);
  };

  // Open "Edit Client" (Specifically changing Display Name or any metadata)
  const handleOpenEditClient = (client: ClientEntity) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      displayName: client.displayName,
      programCode: client.programCode,
      ticketPrefix: client.ticketPrefix || '',
      status: client.status,
      sandboxBaseUrl: client.sandbox.baseApiUrl || DEFAULT_SANDBOX_BASE_URL,
      sandboxProgramCode: client.sandbox.programCode || client.programCode,
      sandboxUserName: client.sandbox.userName || '',
      sandboxUserPassword: client.sandbox.userPassword || '',
      sandboxDevId: client.sandbox.devId || '',
      sandboxAppId: client.sandbox.appId || '',
      sandboxSecurityUser: client.sandbox.securityUser || '',
      sandboxStoreCode: client.sandbox.storeCode || ''
    });
    setErrors({});
    setFormTab('details');
    setIsClientModalOpen(true);
  };

  // Open "Sandbox Section" to consume sandbox details
  const handleOpenSandboxConsumer = (client: ClientEntity) => {
    setActiveSandboxClient(client);
    setTestResult(null);
    setShowPassword(false);
  };

  // Handshake test for sandbox
  const handleTestSandboxHandshake = () => {
    if (!activeSandboxClient) return;
    setIsTestingSandbox(true);
    setTestResult(null);
    setShowPassword(false);

    setTimeout(() => {
      setIsTestingSandbox(false);
      setTestResult({
        status: 'success',
        message: `Handshake verified: 200 OK (${activeSandboxClient.sandbox.programCode} on ${activeSandboxClient.sandbox.baseApiUrl})`
      });
    }, 1000);
  };

  // Form Validation
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Client name is required';
    if (!formData.displayName.trim()) errs.displayName = 'Client display name is required';
    if (!formData.programCode.trim()) errs.programCode = 'Programcode is required';
    if (!formData.ticketPrefix.trim()) {
      errs.ticketPrefix = 'Ticket prefix is required (e.g. BLB for Blackberrys)';
    } else if (formData.ticketPrefix.trim().length < 2 || formData.ticketPrefix.trim().length > 6) {
      errs.ticketPrefix = 'Ticket prefix must be between 2 and 6 characters (e.g. BLB)';
    }
    if (!formData.status) errs.status = 'Status is required';

    if (formData.sandboxBaseUrl && !formData.sandboxBaseUrl.startsWith('http')) {
      errs.sandboxBaseUrl = 'Base API URL must start with http:// or https://';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Save client
  const handleSaveClient = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) {
      setFormTab('details');
      return;
    }

    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (editingClient) {
      // Update existing client
      setClients(clients.map(c => {
        if (c.id === editingClient.id) {
          return {
            ...c,
            name: formData.name.trim().toUpperCase(),
            displayName: formData.displayName.trim(),
            programCode: formData.programCode.trim().toUpperCase(),
            ticketPrefix: formData.ticketPrefix.trim().toUpperCase(),
            status: formData.status,
            modified: todayStr,
            sandbox: {
              baseApiUrl: formData.sandboxBaseUrl.trim() || DEFAULT_SANDBOX_BASE_URL,
              programCode: formData.sandboxProgramCode.trim() || formData.programCode.trim(),
              userName: formData.sandboxUserName.trim(),
              userPassword: formData.sandboxUserPassword,
              devId: formData.sandboxDevId.trim(),
              appId: formData.sandboxAppId.trim(),
              securityUser: formData.sandboxSecurityUser.trim(),
              storeCode: formData.sandboxStoreCode.trim()
            }
          };
        }
        return c;
      }));
      showToast(`Client "${formData.displayName}" updated successfully`);
    } else {
      // Add new client
      const newClient: ClientEntity = {
        id: `CL-${100 + clients.length + 1}`,
        name: formData.name.trim().toUpperCase(),
        displayName: formData.displayName.trim(),
        programCode: formData.programCode.trim().toUpperCase(),
        ticketPrefix: formData.ticketPrefix.trim().toUpperCase(),
        status: formData.status,
        queues: '0/0',
        modified: todayStr,
        sandbox: {
          baseApiUrl: formData.sandboxBaseUrl.trim() || DEFAULT_SANDBOX_BASE_URL,
          programCode: formData.sandboxProgramCode.trim() || formData.programCode.trim(),
          userName: formData.sandboxUserName.trim(),
          userPassword: formData.sandboxUserPassword,
          devId: formData.sandboxDevId.trim(),
          appId: formData.sandboxAppId.trim(),
          securityUser: formData.sandboxSecurityUser.trim(),
          storeCode: formData.sandboxStoreCode.trim()
        }
      };
      setClients([newClient, ...clients]);
      showToast(`Client "${formData.displayName}" created successfully`);
    }

    setIsClientModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-page pb-12">
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

      <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full space-y-6 flex flex-col">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <button 
            onClick={() => onNavigate('settings')} 
            className="hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Settings</span>
          </button>
          <ChevronRight className="w-3 h-3 text-text-muted" />
          <span className="text-text-primary">Client Configuration</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-default pb-6">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-lg bg-brand-50 border border-brand-500/20 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <SlidersHorizontal className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">
                  Client Configuration
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-bg-surface-alt border border-border-default text-text-secondary">
                  {clients.length} Clients
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                Manage client parameters, display branding, program codes, and sandbox API web service integration.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button 
              variant="primary" 
              icon={Plus} 
              onClick={handleOpenAddClient}
              className="bg-brand-500 hover:bg-brand-600 text-white shadow-sm font-semibold"
            >
              Add New Client
            </Button>
          </div>
        </div>

        {/* Clients Card */}
        <div className="bg-bg-surface border border-border-default rounded-xl shadow-xs overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-border-default bg-bg-surface flex flex-wrap gap-4 justify-between items-center z-10">
            <div className="relative w-full sm:w-[360px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search by client, display name, programcode..." 
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-bg-page border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
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
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-48 shrink-0">
                <SingleSearchDropdown 
                  value={statusFilter}
                  onChange={(val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                  }}
                  options={['All Statuses', 'Active', 'Inactive']}
                  placeholder="Filter Status"
                  className="px-3 py-2 bg-bg-page border border-border-default rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto bg-bg-surface">
            {filteredClients.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <Building className="w-10 h-10 text-text-muted mb-2" />
                <h3 className="text-base font-semibold text-text-primary">No clients found</h3>
                <p className="text-xs text-text-secondary mt-1 max-w-sm mb-4">
                  {search ? 'No clients match your filter criteria.' : 'Get started by creating your first client organization.'}
                </p>
                {search ? (
                  <Button variant="outline" size="sm" onClick={() => { setSearch(''); setStatusFilter('All Statuses'); }}>
                    Clear Filters
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAddClient}>
                    Add New Client
                  </Button>
                )}
              </div>
            ) : (
              <table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">
                <thead>
                  <tr className="border-b border-border-default bg-bg-page">
                    <th className="px-4 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider w-[18%]">CLIENT NAME</th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider w-[22%]">DISPLAY NAME</th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider w-[11%]">TICKET PREFIX</th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider w-[13%]">PROGRAM CODE</th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider w-[9%]">STATUS</th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider w-[12%]">SANDBOX API</th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider w-[7%]">QUEUES</th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-sm">
                  {paginatedClients.map((client) => (
                    <tr key={client.id} className="hover:bg-bg-surface-hover transition-colors group">
                      {/* Client Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg border border-border-default bg-bg-page flex items-center justify-center text-text-muted shrink-0 shadow-xs font-bold text-xs">
                            {client.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-text-primary text-xs">{client.name}</span>
                            <span className="text-[10px] text-text-muted font-mono">{client.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Display Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text-primary text-sm">{client.displayName}</span>
                          <button 
                            type="button"
                            onClick={() => handleOpenEditClient(client)}
                            className="text-text-muted hover:text-brand-600 transition-colors p-1 opacity-0 group-hover:opacity-100"
                            title="Edit Client & Display Name"
                          >
                            <Edit2 size={13} />
                          </button>
                        </div>
                      </td>

                      {/* Ticket Prefix */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded font-mono text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                            {client.ticketPrefix || '—'}
                          </span>
                          {client.ticketPrefix && (
                            <span className="text-[10px] text-text-muted font-mono hidden xl:inline">
                              ({client.ticketPrefix}-1001)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Program Code */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded font-mono text-[11px] bg-bg-page text-text-secondary border border-border-default font-medium">
                          {client.programCode}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <Badge variant={client.status === 'Inactive' ? 'neutral' : 'success'} className="py-0.5 px-2 text-[10px] font-semibold">
                          {client.status}
                        </Badge>
                      </td>

                      {/* Sandbox Section link / preview */}
                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          onClick={() => handleOpenSandboxConsumer(client)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 transition-colors"
                          title="View and Consume Sandbox Details"
                        >
                          <Terminal size={12} className="text-brand-600" />
                          <span>Sandbox API</span>
                        </button>
                      </td>

                      {/* Queues */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-medium bg-bg-page text-text-secondary border border-border-default">
                          {client.queues}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            icon={Edit2}
                            onClick={() => handleOpenEditClient(client)}
                            className="text-xs h-8"
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => onNavigate('client_details')}
                            className="text-xs h-8"
                          >
                            Configure
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Mobile Card List View */}
            <div className="md:hidden flex flex-col divide-y divide-border-subtle">
              {paginatedClients.map((client) => (
                <div key={client.id} className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded border border-border-default flex items-center justify-center text-xs font-bold bg-bg-page">
                        {client.name.substring(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-text-primary text-sm">{client.name}</h3>
                          <Badge variant={client.status === 'Inactive' ? 'neutral' : 'success'} className="py-0 px-1.5 text-[9px]">
                            {client.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-text-secondary font-medium">{client.displayName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-border-subtle text-text-secondary">
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase tracking-wider">Prefix</span>
                      <span className="font-mono text-[11px] font-bold text-brand-700">{client.ticketPrefix || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase tracking-wider">Program</span>
                      <span className="font-mono text-[11px] truncate block">{client.programCode}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase tracking-wider">Queues</span>
                      <span className="font-mono text-[11px]">{client.queues}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border-subtle">
                    <button
                      type="button"
                      onClick={() => handleOpenSandboxConsumer(client)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800"
                    >
                      <Terminal size={13} />
                      <span>Sandbox Details</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" icon={Edit2} onClick={() => handleOpenEditClient(client)}>
                        Edit
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => onNavigate('client_details')}>
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {totalItems > 0 && (
            <div className="p-4 border-t border-border-default bg-bg-page flex items-center justify-between">
              <Pagination 
                totalItems={totalItems} 
                itemsPerPage={pageSize} 
                currentPage={currentPage} 
                onPageChange={setCurrentPage} 
                onPageSizeChange={setPageSize}
              />
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MODAL: ADD NEW CLIENT / EDIT CLIENT
          Fields requested:
          1. Client name
          2. Client display name
          3. Programcode
          4. Active inactive dropdown
          Plus Sandbox credentials section!
         ========================================================================= */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in" 
            onClick={() => setIsClientModalOpen(false)}
          />
          <div className="relative w-full max-w-lg md:max-w-xl bg-bg-surface h-full shadow-2xl flex flex-col z-10 border-l border-border-default animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-border-default flex items-center justify-between bg-bg-page shrink-0">
              <div>
                <h2 className="text-lg font-bold text-text-primary tracking-tight">
                  {editingClient ? `Edit Client: ${editingClient.displayName}` : 'Add New Client'}
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  {editingClient 
                    ? 'Update client display name, programcode, active status, and sandbox API details.' 
                    : 'Register a new client entity with program code and sandbox API parameters.'}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setIsClientModalOpen(false)}
                className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-surface-hover rounded-lg transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs inside Drawer */}
            <div className="flex border-b border-border-default bg-bg-page px-6 gap-6 shrink-0">
              <button
                type="button"
                onClick={() => setFormTab('details')}
                className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  formTab === 'details' 
                    ? 'border-brand-500 text-brand-600' 
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                1. Client Information
              </button>
              <button
                type="button"
                onClick={() => setFormTab('sandbox')}
                className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 ${
                  formTab === 'sandbox' 
                    ? 'border-brand-500 text-brand-600' 
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Terminal size={13} />
                <span>2. Sandbox API Section</span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
              
              {formTab === 'details' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  
                  {/* Field 1: Client Name */}
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                      Client Name *
                    </label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value.toUpperCase() });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. ADCOOP, ADDRESS_HOME"
                      className={`px-3 py-2 bg-bg-page border ${errors.name ? 'border-error-text' : 'border-border-default'} rounded-md text-sm text-text-primary uppercase font-mono shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500`}
                    />
                    <p className="text-[11px] text-text-muted">Unique internal entity identifier (uppercase letters/underscores).</p>
                    {errors.name && <p className="text-[10px] text-error-text font-medium">{errors.name}</p>}
                  </div>

                  {/* Field 2: Client Display Name */}
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                      Client Display Name *
                    </label>
                    <input 
                      type="text" 
                      value={formData.displayName}
                      onChange={(e) => {
                        setFormData({ ...formData, displayName: e.target.value });
                        if (errors.displayName) setErrors({ ...errors, displayName: '' });
                      }}
                      placeholder="e.g. Blackberrys Menswear & Apparel, Abu Dhabi Co-op"
                      className={`px-3 py-2 bg-bg-page border ${errors.displayName ? 'border-error-text' : 'border-border-default'} rounded-md text-sm text-text-primary shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500`}
                    />
                    <p className="text-[11px] text-text-muted">Customer-facing branded title used across dashboards, headers, and communications.</p>
                    {errors.displayName && <p className="text-[10px] text-error-text font-medium">{errors.displayName}</p>}
                  </div>

                  {/* Field 3: Ticket Prefix */}
                  <div className="space-y-1.5 flex flex-col">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        Ticket Prefix *
                      </label>
                      {formData.ticketPrefix.trim() ? (
                        <span className="text-[11px] font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                          Preview: {formData.ticketPrefix.trim().toUpperCase()}-1001
                        </span>
                      ) : (
                        formData.name.trim() && (
                          <button
                            type="button"
                            onClick={() => {
                              const auto = formData.name.trim().replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase();
                              setFormData({ ...formData, ticketPrefix: auto });
                              if (errors.ticketPrefix) setErrors({ ...errors, ticketPrefix: '' });
                            }}
                            className="text-[10.5px] font-medium text-brand-600 hover:text-brand-800 underline"
                          >
                            Suggest from name: {formData.name.trim().replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase()}
                          </button>
                        )
                      )}
                    </div>
                    <input 
                      type="text" 
                      maxLength={6}
                      value={formData.ticketPrefix}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                        setFormData({ ...formData, ticketPrefix: val });
                        if (errors.ticketPrefix) setErrors({ ...errors, ticketPrefix: '' });
                      }}
                      placeholder="e.g. BLB, ADC, ADH"
                      className={`px-3 py-2 bg-bg-page border ${errors.ticketPrefix ? 'border-error-text' : 'border-border-default'} rounded-md text-sm text-text-primary uppercase font-mono font-bold tracking-wider shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500`}
                    />
                    <p className="text-[11px] text-text-muted">
                      Unique alphanumeric prefix for all support tickets created for this client (for example: for Blackberrys set <span className="font-semibold text-text-primary font-mono">BLB</span> to generate tickets like <span className="font-mono text-brand-700 font-semibold">BLB-1001</span>).
                    </p>
                    {errors.ticketPrefix && <p className="text-[10px] text-error-text font-medium">{errors.ticketPrefix}</p>}
                  </div>

                  {/* Field 4: Programcode */}
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                      Programcode *
                    </label>
                    <input 
                      type="text" 
                      value={formData.programCode}
                      onChange={(e) => {
                        setFormData({ ...formData, programCode: e.target.value.toUpperCase() });
                        if (errors.programCode) setErrors({ ...errors, programCode: '' });
                      }}
                      placeholder="e.g. ADCOOP_REWARDS, ADDR_HOME_VIP"
                      className={`px-3 py-2 bg-bg-page border ${errors.programCode ? 'border-error-text' : 'border-border-default'} rounded-md text-sm text-text-primary uppercase font-mono shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500`}
                    />
                    <p className="text-[11px] text-text-muted">LPaaS loyalty program identifier linking web services and transactions.</p>
                    {errors.programCode && <p className="text-[10px] text-error-text font-medium">{errors.programCode}</p>}
                  </div>

                  {/* Field 5: Active Inactive Dropdown */}
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                      Status (Active / Inactive) *
                    </label>
                    <SingleSearchDropdown 
                      options={['Active', 'Inactive']}
                      value={formData.status}
                      onChange={(val) => {
                        setFormData({ ...formData, status: val as 'Active' | 'Inactive' });
                        if (errors.status) setErrors({ ...errors, status: '' });
                      }}
                      placeholder="Select status"
                      className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary shadow-xs"
                    />
                    <p className="text-[11px] text-text-muted">Active clients can process tickets, queue integrations, and authenticate sandbox requests.</p>
                    {errors.status && <p className="text-[10px] text-error-text font-medium">{errors.status}</p>}
                  </div>

                  {/* Sandbox Banner */}
                  <div className="p-4 bg-brand-50/50 border border-brand-200 rounded-lg flex items-start gap-3 mt-4">
                    <Terminal className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-900">Sandbox API Integration Available</h4>
                      <p className="text-[11px] text-brand-700 mt-0.5">
                        Configure EasyRewardz LPaaS web API credentials for this client in the next tab to consume sandbox endpoints.
                      </p>
                      <button 
                        type="button"
                        onClick={() => setFormTab('sandbox')}
                        className="text-xs font-bold text-brand-600 hover:underline mt-2 inline-flex items-center gap-1"
                      >
                        <span>Configure Sandbox Parameters</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* Sandbox Section Form */}
              {formTab === 'sandbox' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="p-3 bg-bg-page border border-border-default rounded-lg">
                    <span className="text-xs font-semibold text-text-primary block">EasyRewardz LPaaS Web API Sandbox Parameters</span>
                    <span className="text-[11px] text-text-secondary block mt-0.5">
                      Enter sandbox authentication details for this client. These credentials will be available in the sandbox consumption drawer.
                    </span>
                  </div>

                  {/* Base API URL */}
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                      Base API URL *
                    </label>
                    <input 
                      type="text" 
                      value={formData.sandboxBaseUrl}
                      onChange={(e) => setFormData({ ...formData, sandboxBaseUrl: e.target.value })}
                      placeholder="https://lpaaswebapi.easyrewardz.com/api/"
                      className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary font-mono shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <span className="text-[11px] text-text-muted">Default endpoint: https://lpaaswebapi.easyrewardz.com/api/</span>
                  </div>

                  {/* ProgramCode & UserName */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        ProgramCode
                      </label>
                      <input 
                        type="text" 
                        value={formData.sandboxProgramCode}
                        onChange={(e) => setFormData({ ...formData, sandboxProgramCode: e.target.value.toUpperCase() })}
                        placeholder={formData.programCode || 'e.g. ADCOOP_SBX'}
                        className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary font-mono uppercase shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        UserName
                      </label>
                      <input 
                        type="text" 
                        value={formData.sandboxUserName}
                        onChange={(e) => setFormData({ ...formData, sandboxUserName: e.target.value })}
                        placeholder="e.g. api_sandbox_user"
                        className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary font-mono shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  {/* UserPassword */}
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                      UserPassword
                    </label>
                    <input 
                      type="password" 
                      value={formData.sandboxUserPassword}
                      onChange={(e) => setFormData({ ...formData, sandboxUserPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary font-mono shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  {/* DevId & AppId */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        DevId
                      </label>
                      <input 
                        type="text" 
                        value={formData.sandboxDevId}
                        onChange={(e) => setFormData({ ...formData, sandboxDevId: e.target.value })}
                        placeholder="e.g. DEV-ADC-9921"
                        className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary font-mono shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        AppId
                      </label>
                      <input 
                        type="text" 
                        value={formData.sandboxAppId}
                        onChange={(e) => setFormData({ ...formData, sandboxAppId: e.target.value })}
                        placeholder="e.g. APP-ADC-4402"
                        className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary font-mono shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  {/* UserName (Security/Secondary) & StoreCode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        UserName (Secondary / Security)
                      </label>
                      <input 
                        type="text" 
                        value={formData.sandboxSecurityUser}
                        onChange={(e) => setFormData({ ...formData, sandboxSecurityUser: e.target.value })}
                        placeholder="e.g. adcoop_sec_auth"
                        className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary font-mono shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        StoreCode
                      </label>
                      <input 
                        type="text" 
                        value={formData.sandboxStoreCode}
                        onChange={(e) => setFormData({ ...formData, sandboxStoreCode: e.target.value.toUpperCase() })}
                        placeholder="e.g. STR-AUH-01"
                        className="px-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary font-mono uppercase shadow-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-default flex justify-between items-center bg-bg-page shrink-0">
              {formTab === 'sandbox' ? (
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setFormTab('details')}
                >
                  Back to Details
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setIsClientModalOpen(false)}
                >
                  Cancel
                </Button>
              )}

              <div className="flex gap-2">
                {formTab === 'details' && (
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => setFormTab('sandbox')}
                  >
                    Next: Sandbox API
                  </Button>
                )}
                <Button 
                  variant="primary" 
                  type="button"
                  onClick={handleSaveClient}
                  className="bg-brand-500 hover:bg-brand-600 text-white font-semibold"
                >
                  {editingClient ? 'Save Changes' : 'Create Client'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DRAWER: SANDBOX SECTION CONSUMER
          Allows consuming the relevant sandbox details of this client:
          Base API URL: https://lpaaswebapi.easyrewardz.com/api/
          ProgramCode
          UserName
          UserPassword
          DevId
          AppId
          UserName (Secondary / Security)
          StoreCode
         ========================================================================= */}
      {activeSandboxClient && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in" 
            onClick={() => setActiveSandboxClient(null)}
          />
          <div className="relative w-full max-w-lg md:max-w-xl bg-bg-surface h-full shadow-2xl flex flex-col z-10 border-l border-border-default animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-border-default bg-bg-page shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600">
                    <Terminal size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-text-primary tracking-tight">
                      Sandbox API Environment
                    </h2>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Client: <span className="font-semibold text-text-primary">{activeSandboxClient.displayName}</span> ({activeSandboxClient.name})
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-text-muted uppercase font-semibold">Ticket Prefix:</span>
                      <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-1.5 py-0.2 rounded">
                        {activeSandboxClient.ticketPrefix || '—'}
                      </span>
                      <span className="text-[10px] text-text-muted font-mono">
                        (Tickets: {activeSandboxClient.ticketPrefix || 'TCK'}-1001)
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setActiveSandboxClient(null)}
                  className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-surface-hover rounded-lg transition-colors"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Handshake test bar */}
              <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-text animate-pulse" />
                  <span className="text-xs font-medium text-text-secondary">EasyRewardz LPaaS Web API</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleTestSandboxHandshake} 
                  disabled={isTestingSandbox}
                  className="text-xs h-7 gap-1"
                >
                  <RefreshCw size={12} className={isTestingSandbox ? 'animate-spin' : ''} />
                  <span>{isTestingSandbox ? 'Pinging...' : 'Test Connection'}</span>
                </Button>
              </div>

              {testResult && (
                <div className="mt-3 p-2.5 bg-success-bg border border-success-text/30 text-success-text rounded-md text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <ShieldCheck size={14} className="shrink-0" />
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>

            {/* Credential Cards */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
              
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Sandbox Credentials & Headers
                </h3>
                <button 
                  type="button"
                  onClick={() => {
                    const payload = JSON.stringify({
                      ClientName: activeSandboxClient.name,
                      DisplayName: activeSandboxClient.displayName,
                      TicketPrefix: activeSandboxClient.ticketPrefix,
                      BaseUrl: activeSandboxClient.sandbox.baseApiUrl,
                      ProgramCode: activeSandboxClient.sandbox.programCode,
                      UserName: activeSandboxClient.sandbox.userName,
                      UserPassword: activeSandboxClient.sandbox.userPassword,
                      DevId: activeSandboxClient.sandbox.devId,
                      AppId: activeSandboxClient.sandbox.appId,
                      SecurityUser: activeSandboxClient.sandbox.securityUser,
                      StoreCode: activeSandboxClient.sandbox.storeCode
                    }, null, 2);
                    copyToClipboard(payload, 'all');
                  }}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  {copiedKey === 'all' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                  <span>{copiedKey === 'all' ? 'Copied JSON!' : 'Copy All JSON'}</span>
                </button>
              </div>

              {/* 1. Base API URL */}
              <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Base API URL</span>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(activeSandboxClient.sandbox.baseApiUrl, 'baseApiUrl')}
                    className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                    title="Copy Base API URL"
                  >
                    {copiedKey === 'baseApiUrl' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="font-mono text-xs text-text-primary break-all select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                  {activeSandboxClient.sandbox.baseApiUrl}
                </div>
              </div>

              {/* 2. ProgramCode */}
              <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">ProgramCode</span>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(activeSandboxClient.sandbox.programCode, 'programCode')}
                    className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                  >
                    {copiedKey === 'programCode' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                  {activeSandboxClient.sandbox.programCode}
                </div>
              </div>

              {/* 3. UserName */}
              <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">UserName</span>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(activeSandboxClient.sandbox.userName, 'userName')}
                    className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                  >
                    {copiedKey === 'userName' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                  {activeSandboxClient.sandbox.userName || '—'}
                </div>
              </div>

              {/* 4. UserPassword */}
              <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">UserPassword</span>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(activeSandboxClient.sandbox.userPassword || '', 'userPassword')}
                      className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                    >
                      {copiedKey === 'userPassword' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
                <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                  {showPassword ? (activeSandboxClient.sandbox.userPassword || '—') : '••••••••••••••••'}
                </div>
              </div>

              {/* 5. DevId & 6. AppId */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">DevId</span>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(activeSandboxClient.sandbox.devId, 'devId')}
                      className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                    >
                      {copiedKey === 'devId' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                    {activeSandboxClient.sandbox.devId || '—'}
                  </div>
                </div>

                <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">AppId</span>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(activeSandboxClient.sandbox.appId, 'appId')}
                      className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                    >
                      {copiedKey === 'appId' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                    {activeSandboxClient.sandbox.appId || '—'}
                  </div>
                </div>
              </div>

              {/* 7. Secondary UserName & 8. StoreCode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">UserName (Security/Secondary)</span>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(activeSandboxClient.sandbox.securityUser || '', 'secUser')}
                      className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                    >
                      {copiedKey === 'secUser' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                    {activeSandboxClient.sandbox.securityUser || '—'}
                  </div>
                </div>

                <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">StoreCode</span>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(activeSandboxClient.sandbox.storeCode, 'storeCode')}
                      className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                    >
                      {copiedKey === 'storeCode' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle uppercase">
                    {activeSandboxClient.sandbox.storeCode || '—'}
                  </div>
                </div>
              </div>

              {/* Ready cURL Command */}
              <div className="p-4 bg-bg-page border border-border-default rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                    <Code2 size={14} className="text-brand-600" />
                    <span>Sample cURL Request</span>
                  </span>
                  <button 
                    type="button"
                    onClick={() => {
                      const curl = `curl -X POST "${activeSandboxClient.sandbox.baseApiUrl}member/details" \\
  -H "Content-Type: application/json" \\
  -H "ProgramCode: ${activeSandboxClient.sandbox.programCode}" \\
  -H "DevId: ${activeSandboxClient.sandbox.devId}" \\
  -H "AppId: ${activeSandboxClient.sandbox.appId}" \\
  -d '{
    "UserName": "${activeSandboxClient.sandbox.userName}",
    "UserPassword": "${activeSandboxClient.sandbox.userPassword}",
    "StoreCode": "${activeSandboxClient.sandbox.storeCode}"
  }'`;
                      copyToClipboard(curl, 'curl');
                    }}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                  >
                    {copiedKey === 'curl' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                    <span>{copiedKey === 'curl' ? 'Copied cURL!' : 'Copy cURL'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-neutral-900 text-neutral-100 rounded-md text-[11px] font-mono overflow-x-auto leading-relaxed">
{`curl -X POST "${activeSandboxClient.sandbox.baseApiUrl}member/details" \\
  -H "Content-Type: application/json" \\
  -H "ProgramCode: ${activeSandboxClient.sandbox.programCode}" \\
  -H "DevId: ${activeSandboxClient.sandbox.devId}" \\
  -H "AppId: ${activeSandboxClient.sandbox.appId}" \\
  -d '{
    "UserName": "${activeSandboxClient.sandbox.userName}",
    "UserPassword": "${showPassword ? activeSandboxClient.sandbox.userPassword : '••••••••••••'}",
    "StoreCode": "${activeSandboxClient.sandbox.storeCode}"
  }'`}
                </pre>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-default flex justify-between items-center bg-bg-page shrink-0">
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveSandboxClient(null);
                  handleOpenEditClient(activeSandboxClient);
                }}
                className="gap-1.5"
              >
                <Edit2 size={13} />
                <span>Edit Credentials</span>
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setActiveSandboxClient(null)}
              >
                Done
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
