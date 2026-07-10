import React from 'react';
import { ArrowLeft, User, Calendar, MessageSquare } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CopyId } from '../components/ui/CopyId';

export default function TicketHistory({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
            <span className="hover:text-text-primary cursor-pointer transition-colors" onClick={() => onNavigate('ticket_explorer')}>Search Explorer</span>
            <span>›</span>
            <span className="text-text-secondary font-medium">Ticket History</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Ticket History</h1>
          <div className="text-brand-600 font-mono text-sm mt-1 font-medium bg-brand-50 inline-block px-2 py-0.5 rounded"><CopyId id="EO-85316" type="jira" className="text-brand-600" /></div>
        </div>
        <Button variant="outline" icon={ArrowLeft} onClick={() => onNavigate('ticket_explorer')} className="bg-bg-surface">
          Back to Search Results
        </Button>
      </div>

      {/* Ticket Information Card */}
      <div className="card-base bg-bg-surface p-6 border-border-strong/50 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">SUMMARY</h2>
            <h3 className="text-lg font-semibold text-text-primary">QC Request | Coupon Offer Creation Bestseller</h3>
          </div>
          <div className="flex gap-2 shrink-0 ml-4">
            <Badge variant="success">Closed</Badge>
            <Badge variant="warning">Medium</Badge>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">DESCRIPTION</h2>
          <div className="text-sm text-text-secondary space-y-1">
            <p>Hi Team,</p>
            <p>Please do the QC</p>
            <p>Jira-</p>
            <p>LpaaS-</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">REPORTER</h2>
            <div className="flex items-center gap-2 text-sm text-text-primary font-medium">
              <User size={16} className="text-text-muted" />
              sankar@easyrewardz.com
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">ASSIGNEE</h2>
            <div className="flex items-center gap-2 text-sm text-text-primary font-medium">
              <User size={16} className="text-text-muted" />
              saif.ali
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">CREATED</h2>
            <div className="flex items-center gap-2 text-sm text-text-primary font-medium">
              <Calendar size={16} className="text-text-muted" />
              06 Jul 2026, 18:46
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">UPDATED</h2>
            <div className="flex items-center gap-2 text-sm text-text-primary font-medium">
              <Calendar size={16} className="text-text-muted" />
              06 Jul 2026, 22:16
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">TOTAL COMMENTS</h2>
          <div className="text-lg font-semibold text-text-primary">1</div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">METADATA</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-[11px] font-medium border border-brand-100">project: EO</span>
            <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-[11px] font-medium border border-brand-100">component: EasyRewardz Operations</span>
          </div>
        </div>
      </div>

      {/* Activity Timeline Card */}
      <div className="card-base bg-bg-surface p-6 border-border-strong/50 shadow-sm">
        <h2 className="text-lg font-semibold text-text-primary tracking-tight mb-1">Activity Timeline</h2>
        <p className="text-sm text-text-muted mb-8">Complete chronological history including creation, updates and comments.</p>

        <div className="relative">
          {/* Date Separator */}
          <div className="flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-default"></div>
            </div>
            <div className="relative bg-bg-surface px-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">
              06 JUL 2026
            </div>
          </div>
          
          <div className="space-y-8 relative">
             {/* Left line connection */}
             <div className="absolute top-4 bottom-0 left-[19px] w-px bg-border-default"></div>

             {/* Event 1 */}
             <div className="relative pl-14">
               <div className="absolute left-0 top-0 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white border-4 border-bg-surface z-10 shadow-sm">
                 <User size={18} />
               </div>
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                 <div className="text-sm">
                   <span className="font-semibold text-text-primary">sankar@easyrewardz.com</span>
                   <span className="text-text-secondary"> created the ticket</span>
                 </div>
                 <span className="text-xs text-text-muted font-mono mt-1 sm:mt-0">06 Jul 2026, 18:46</span>
               </div>
               
               <div className="bg-bg-page border border-border-default rounded-lg p-5">
                 <h4 className="font-semibold text-text-primary mb-3">QC Request | Coupon Offer Creation Bestseller</h4>
                 <div className="text-sm text-text-secondary space-y-1 mb-5">
                   <p>Hi Team,</p>
                   <p>Please do the QC</p>
                   <p>Jira-</p>
                   <p>LpaaS-</p>
                 </div>
                 <div className="flex gap-2">
                   <Badge variant="success">Closed</Badge>
                   <Badge variant="warning">Medium</Badge>
                 </div>
               </div>
             </div>

             {/* Event 2 */}
             <div className="relative pl-14 pb-4">
               <div className="absolute left-0 top-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white border-4 border-bg-surface z-10 shadow-sm">
                 <MessageSquare size={16} />
               </div>
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                 <div className="text-sm">
                   <span className="font-semibold text-text-primary">saif.ali</span>
                   <span className="text-text-secondary"> added a comment</span>
                 </div>
                 <span className="text-xs text-text-muted font-mono mt-1 sm:mt-0">06 Jul 2026, 22:15</span>
               </div>
               
               <div className="bg-bg-page border border-border-default rounded-lg p-4">
                 <p className="text-sm text-text-primary">qc done all ok</p>
               </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
