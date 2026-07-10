import React, { useState } from 'react';
import { X, Search, Save } from 'lucide-react';
import { Button } from './ui/Button';
import { MultiSelectDropdown } from './ui/MultiSelectDropdown';

interface TaskFilterDrawerProps {
  onClose: () => void;
  onApply: (filters: any) => void;
  onSaveAndSearch: (filters: any) => void;
}

export function TaskFilterDrawer({ onClose, onApply, onSaveAndSearch }: TaskFilterDrawerProps) {
  const [taskId, setTaskId] = useState('');
  const [taskCycle, setTaskCycle] = useState('');
  const [taskType, setTaskType] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [priority, setPriority] = useState<string[]>([]);
  const [assignee, setAssignee] = useState<string[]>([]);

  const taskTypes = ['Internal Task', 'Jira Task'];
  const statuses = ['To Do', 'In Progress', 'In Review', 'Done'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const assignees = ['Me', 'System', 'John Doe', 'Alice Smith'];

  const handleApply = () => {
    onApply({ taskId, taskCycle, taskType, status, priority, assignee });
    onClose();
  };

  const handleSaveAndSearch = () => {
    onSaveAndSearch({ taskId, taskCycle, taskType, status, priority, assignee });
    onClose();
  };

  const handleClear = () => {
    setTaskId('');
    setTaskCycle('');
    setTaskType([]);
    setStatus([]);
    setPriority([]);
    setAssignee([]);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      <div role="dialog" aria-modal="true" aria-labelledby="task-filter-title" className="fixed inset-y-0 right-0 w-[400px] bg-bg-page shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-border-strong">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-border-default flex items-center justify-between bg-bg-surface">
          <div>
            <h2 className="text-base font-semibold text-text-primary tracking-tight">Task Filters</h2>
            <p className="text-xs text-text-secondary mt-1">Filter tasks by specific criteria</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-bg-page custom-scrollbar">
          
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest border-b border-border-default pb-2">Task Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-primary">Task ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. TSK-1234"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  className="input-base w-full"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-primary">Task Cycle</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sprint 12"
                  value={taskCycle}
                  onChange={(e) => setTaskCycle(e.target.value)}
                  className="input-base w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-primary">Task Type</label>
                <MultiSelectDropdown 
                  selected={taskType}
                  onChange={setTaskType}
                  placeholder="All Types"
                  options={taskTypes}
                  selectedSuffix="types"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-primary">Status</label>
                <MultiSelectDropdown 
                  selected={status}
                  onChange={setStatus}
                  placeholder="All Statuses"
                  options={statuses}
                  selectedSuffix="statuses"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-primary">Priority</label>
                <MultiSelectDropdown 
                  selected={priority}
                  onChange={setPriority}
                  placeholder="All Priorities"
                  options={priorities}
                  selectedSuffix="priorities"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-primary">Assignee</label>
                <MultiSelectDropdown 
                  selected={assignee}
                  onChange={setAssignee}
                  placeholder="All Assignees"
                  options={assignees}
                  selectedSuffix="assignees"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border-default bg-bg-surface flex flex-col gap-3">
          <div className="flex items-center gap-3 w-full">
            <Button variant="outline" className="flex-1" onClick={handleClear}>
              Clear All
            </Button>
            <Button variant="primary" className="flex-1" icon={Search} onClick={handleApply}>
              Apply Filter
            </Button>
          </div>
          <Button variant="secondary" className="w-full" icon={Save} onClick={handleSaveAndSearch}>
            Save and Search
          </Button>
        </div>

      </div>
    </>
  );
}
