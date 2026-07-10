import { useState } from 'react';
import { X, Clock, History, Users, Plus, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RichTextEditor } from '../ui/RichTextEditor';

export interface TimeLogEntry {
  id: string;
  user: string;
  hours: number;
  minutes: number;
  comment: string;
  date: string;
  time: string;
}

interface LogTimeModalProps {
  onClose: () => void;
  onAddEntry: (entry: Omit<TimeLogEntry, 'id' | 'date' | 'time'>) => void;
  entries: TimeLogEntry[];
}

export function LogTimeModal({ onClose, onAddEntry, entries }: LogTimeModalProps) {
  const [activeTab, setActiveTab] = useState<'log' | 'history' | 'summary'>('log');
  const [hours, setHours] = useState<number | ''>('');
  const [minutes, setMinutes] = useState<number | ''>('');
  const [comment, setComment] = useState('');

  const handleSave = () => {
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    if (h === 0 && m === 0) return;
    
    onAddEntry({
      user: 'John Doe', // Current logged-in user
      hours: h,
      minutes: m,
      comment
    });
    onClose();
  };

  const isFormValid = (Number(hours) > 0 || Number(minutes) > 0) && Number(hours) >= 0 && Number(minutes) >= 0 && Number(minutes) <= 59;

  // Calculate per assignee summary
  const summary = entries.reduce((acc, entry) => {
    if (!acc[entry.user]) {
      acc[entry.user] = { user: entry.user, totalMinutes: 0, count: 0 };
    }
    acc[entry.user].totalMinutes += entry.hours * 60 + entry.minutes;
    acc[entry.user].count += 1;
    return acc;
  }, {} as Record<string, { user: string; totalMinutes: number; count: number }>);

  const summaryList = Object.values(summary).sort((a, b) => b.totalMinutes - a.totalMinutes);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-bg-surface w-full max-w-2xl rounded-xl shadow-xl border border-border-default flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-brand-50 border border-brand-500/20 text-brand-600 flex items-center justify-center shadow-sm">
              <Clock size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">Time Logging</h2>
              <p className="text-xs text-text-secondary mt-0.5">Track and manage time spent on this ticket</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 border-b border-border-default bg-bg-surface-alt/30">
          {[
            { id: 'log', label: 'Log Time', icon: Plus },
            { id: 'history', label: 'Log History', icon: History },
            { id: 'summary', label: 'Per Assignee Summary', icon: Users },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-brand-500 text-brand-600' 
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-bg-page custom-scrollbar">
          
          {activeTab === 'log' && (
            <div className="space-y-6 max-w-xl">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Logged As</span>
                <div className="flex items-center gap-3 bg-bg-surface border border-border-default p-3 rounded-lg w-fit shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
                     JD
                   </div>
                   <div className="flex flex-col">
                     <span className="text-sm font-bold text-text-primary">John Doe</span>
                     <span className="text-[11px] text-text-secondary">john.doe@example.com</span>
                   </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Hours</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="input-base text-lg font-mono font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Minutes</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="0"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="input-base text-lg font-mono font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Work Note</label>
                <RichTextEditor 
                  content={comment} 
                  onChange={setComment} 
                  placeholder="Describe the work performed during this time."
                  minHeight="min-h-[120px]"
                />
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {entries.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-text-muted bg-bg-surface border border-border-default border-dashed rounded-xl">
                  <Clock className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-base font-bold text-text-primary mb-1">No Time Logged</p>
                  <p className="text-sm">There are no manual time entries for this ticket yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {entries.map(entry => (
                    <div key={entry.id} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center text-[10px] font-bold">
                             {entry.user.substring(0, 2).toUpperCase()}
                           </div>
                           <span className="text-sm font-bold text-text-primary">{entry.user}</span>
                        </div>
                        <span className="text-xs font-mono text-text-muted">{entry.date} at {entry.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="neutral" className="font-mono text-sm px-2 py-1 bg-bg-page border-border-default text-text-primary shadow-sm font-bold">
                          {entry.hours}h {entry.minutes}m
                        </Badge>
                        <span className="text-sm text-text-secondary">logged time</span>
                      </div>
                      {entry.comment && (
                        <div 
                           className="text-[13px] text-text-secondary bg-bg-page p-3 rounded border border-border-default"
                           dangerouslySetInnerHTML={{__html: entry.comment}}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-4">
              {summaryList.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-text-muted bg-bg-surface border border-border-default border-dashed rounded-xl">
                  <Users className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-base font-bold text-text-primary mb-1">No Summaries Available</p>
                  <p className="text-sm">Log time to see the per-assignee summary.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summaryList.map(s => (
                    <div key={s.user} className="bg-bg-surface border border-border-default rounded-lg p-5 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg shrink-0">
                        {s.user.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <span className="text-sm font-bold text-text-primary truncate">{s.user}</span>
                        <div className="flex items-center justify-between mt-1">
                           <span className="text-lg font-mono font-bold text-brand-600 tracking-tight">
                             {Math.floor(s.totalMinutes / 60)}h {s.totalMinutes % 60}m
                           </span>
                           <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider bg-bg-page px-2 py-0.5 rounded border border-border-default">
                             {s.count} {s.count === 1 ? 'Entry' : 'Entries'}
                           </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        {activeTab === 'log' && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-default bg-bg-surface rounded-b-xl">
            <Button variant="ghost" onClick={onClose} className="font-semibold text-text-secondary">Cancel</Button>
            <Button variant="primary" onClick={handleSave} disabled={!isFormValid} className="font-semibold" icon={Check}>Add Entry</Button>
          </div>
        )}
      </div>
    </div>
  );
}
