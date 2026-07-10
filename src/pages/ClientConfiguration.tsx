import { useState } from 'react';
import { ChevronRight, Search, ChevronDown, Settings as SettingsIcon, Building, ArrowLeft, Edit2, ArrowRight } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import { SearchableSelect } from '../components/ui/SearchableSelect';

export default function ClientConfiguration({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const clients = [
    { name: 'ADCOOP', queues: '6/33', modified: 'Jun 19, 2026', status: 'Active' },
    { name: 'ADDRESS HOME', queues: '6/33', modified: 'Jul 3, 2026', status: 'Active' },
    { name: 'AIKYAM', queues: '6/33', modified: 'Jun 17, 2026', status: 'Inactive' },
    { name: 'ATLANCE LOYALTY CLUB', queues: '6/33', modified: 'Jun 17, 2026', status: 'Active' },
    { name: 'Actif Club', queues: '6/33', modified: 'Jul 3, 2026', status: 'Active' },
    { name: 'Al Jaroodi', queues: '6/33', modified: 'Jul 2, 2026', status: 'Active' },
  ];

  return (
    <div className="flex flex-col w-full bg-bg-page">
      <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button onClick={() => onNavigate('settings')} className="text-text-secondary hover:text-text-primary transition-colors">
                <ArrowLeft size={16} />
              </button>
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <span className="hover:text-text-primary cursor-pointer transition-colors" onClick={() => onNavigate('settings')}>Settings</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-text-primary">Client Configuration</span>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-text-primary tracking-tight mt-2 pl-6">Client Configuration</h1>
            <p className="text-sm text-text-secondary pl-6 mt-1">Manage client-specific settings, branding, and metadata configurations.</p>
          </div>
        </div>

        <div className="card-base flex flex-col min-h-[400px]">
          {/* Toolbar */}
          <div className="p-4 border-b border-border-default bg-bg-surface flex flex-wrap gap-4 justify-between items-center z-10">
            <div className="relative w-full sm:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search Clients..." 
                className="input-base w-full pl-9 h-9"
              />
            </div>
            
            <div className="w-full sm:w-[200px] shrink-0 z-50">
              <SearchableSelect 
                value="All Statuses"
                onChange={() => {}}
                options={[
                  { label: 'All Statuses', value: 'All Statuses' },
                  { label: 'Active', value: 'Active' },
                  { label: 'Inactive', value: 'Inactive' }
                ]}
              />
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto bg-bg-surface">
            <table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">
              <thead>
                <tr className="border-b border-border-default bg-bg-page">
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] w-[40%]">CLIENT NAME</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] w-[20%]">ACTIVE QUEUES</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] w-[25%]">LAST MODIFIED</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] w-[15%] text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm">
                {clients.map((client, index) => (
                  <tr key={index} className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${index % 2 !== 0 ? 'bg-bg-surface-alt' : ''}`}>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3 text-xs font-medium text-text-primary">
                        <div className="w-8 h-8 rounded border border-border-default bg-bg-page flex items-center justify-center text-text-muted shrink-0 shadow-sm">
                          <Building size={14} />
                        </div>
                        {client.name}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-medium bg-bg-page text-text-secondary border border-border-default">
                        {client.queues}
                      </span>
                    </td>
                    <td className="px-3 py-3"><span className="text-[11px] text-text-secondary">{client.modified}</span></td>
                    <td className="px-3 py-3 text-right">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => onNavigate('client_details')}
                      >
                        Configure
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

              <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
                {clients.map((client, index) => (
                  <div key={index} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-text-primary text-sm flex items-center gap-2">
                        <div className="w-8 h-8 rounded border border-border-default flex items-center justify-center shrink-0">
                          {client.name.substring(0, 1)}
                        </div>
                        {client.name}
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary">
                           <Edit2 size={14} />
                         </Button>
                         <Button variant="ghost" size="icon" onClick={() => onNavigate('client_details')} className="h-8 w-8 text-brand-500 hover:bg-brand-50">
                           <ArrowRight size={14} />
                         </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-text-secondary mt-2 pt-2 border-t border-border-subtle">
                      <span>{client.queues} Queues</span>
                      <span className="font-mono text-text-muted">{client.modified}</span>
                    </div>
                  </div>
                ))}
              </div>

          </div>
          
          <Pagination 
            totalItems={14} 
            itemsPerPage={pageSize} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}
