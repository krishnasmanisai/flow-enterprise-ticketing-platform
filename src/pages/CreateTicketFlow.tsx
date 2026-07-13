import React, { useState } from 'react';
import { X, Building, FolderOpen, ArrowRight, ArrowLeft, CheckCircle, Paperclip, AlertCircle, Info, FilePlus, CheckSquare, Ticket } from 'lucide-react';
import { SearchableSelect } from '../components/ui/SearchableSelect';
import { Button } from '../components/ui/Button';
import { RichTextEditor } from '../components/ui/RichTextEditor';

const InputLabel = ({ children, required }: { children: React.ReactNode, required?: boolean }) => (
  <label className="text-sm font-semibold text-text-primary mb-1.5 block">
    {children} {required && <span className="text-error-text">*</span>}
  </label>
);

const inputClass = "w-full min-h-[40px] px-3 py-2 bg-bg-surface-hover border border-transparent rounded hover:bg-border-subtle focus:bg-bg-surface focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors text-sm outline-none";

export interface CreateTicketFlowProps {
  type?: string | null;
  onClose: () => void;
  mode?: 'create' | 'clone' | 'change_project';
  initialData?: any;
}

export function CreateTicketFlow({ type, onClose, mode = 'create', initialData }: CreateTicketFlowProps) {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const isTicket = type === 'ticket';
  const isInternal = type === 'internal_task';
  const isJira = type === 'jira_task';

  const [client, setClient] = useState(initialData?.client || '');
  const [project, setProject] = useState(mode === 'clone' ? '' : (initialData?.project || ''));
  const [reqType, setReqType] = useState(initialData?.reqType || '');
  const [subReqType, setSubReqType] = useState(initialData?.subReqType || '');
  const [serviceType, setServiceType] = useState(initialData?.serviceType || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [assignee, setAssignee] = useState(mode === 'clone' ? '' : (initialData?.assignee || ''));
  const [businessUnit, setBusinessUnit] = useState(initialData?.businessUnit || '');
  const [subBusinessUnit, setSubBusinessUnit] = useState(initialData?.subBusinessUnit || '');
  const [jiraBoard, setJiraBoard] = useState(initialData?.jiraBoard || '');

  const handleCreate = () => {
    setSuccess(true);
  };

  const searchableSelectClass = "!bg-bg-surface-hover !border-transparent hover:!bg-border-subtle focus-within:!bg-bg-surface focus-within:!border-brand-500 focus-within:!ring-1 focus-within:!ring-brand-500 transition-colors";

  const renderTicketStep1 = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-default pb-2">Context Details</h3>
        {mode !== 'change_project' && (
        <div>
          <InputLabel required>Brand (Client)</InputLabel>
          <SearchableSelect
            value={client}
            onChange={setClient}
            options={['Acme Corp', 'Globex', 'Soylent Corp', 'Initech']}
            className={searchableSelectClass}
          />
        </div>
        )}
        <div>
          <InputLabel required>Project</InputLabel>
          <SearchableSelect
            value={project}
            onChange={setProject}
            options={['Core Infrastructure', 'Authentication', 'Billing', 'Frontend Platform']}
            className={searchableSelectClass}
          />
        </div>
      </div>
      
      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-default pb-2">Request Details</h3>
        <div>
          <InputLabel required>Request Type</InputLabel>
          <SearchableSelect
            value={reqType}
            onChange={setReqType}
            options={['Incident', 'Service Request', 'Question']}
            className={searchableSelectClass}
          />
        </div>
        <div>
          <InputLabel required>Sub-request Type</InputLabel>
          <SearchableSelect
            value={subReqType}
            onChange={setSubReqType}
            options={['Access Issue', 'Performance', 'Bug', 'Other']}
            className={searchableSelectClass}
          />
        </div>
        <div>
          <InputLabel required>Service Type</InputLabel>
          <SearchableSelect
            value={serviceType}
            onChange={setServiceType}
            options={['Cloud Hosting', 'On-Prem', 'SaaS']}
            className={searchableSelectClass}
          />
        </div>
      </div>
    </div>
  );

  const renderTicketStep2 = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <div>
          <InputLabel required>Summary</InputLabel>
          <input 
            type="text" 
            value={summary}
            onChange={e => setSummary(e.target.value)}
            className={inputClass}
            placeholder="Brief summary..."
          />
        </div>
        <div>
          <InputLabel>Description</InputLabel>
          <RichTextEditor content={description} onChange={setDescription} placeholder="Detailed description..." />
        </div>
      </div>
      
      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <InputLabel>Attachments</InputLabel>
        <div className="border-2 border-dashed border-border-default rounded-lg p-8 flex flex-col items-center justify-center text-text-muted hover:border-brand-500 hover:bg-brand-50/50 hover:text-brand-600 transition-colors cursor-pointer bg-bg-page">
          <Paperclip size={28} className="mb-3" />
          <span className="text-sm font-medium">Click or drag files to upload</span>
          <span className="text-xs mt-1 text-text-secondary">Max file size: 25MB</span>
        </div>
      </div>
    </div>
  );

  const renderInternalTask = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <div>
          <InputLabel required>Summary</InputLabel>
          <input 
            type="text" 
            value={summary}
            onChange={e => setSummary(e.target.value)}
            className={inputClass}
            placeholder="Task title..."
          />
        </div>
        <div>
          <InputLabel>Description</InputLabel>
          <RichTextEditor content={description} onChange={setDescription} placeholder="Detailed description..." />
        </div>
      </div>

      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-default pb-2">Context</h3>
        <div>
          <InputLabel>Client</InputLabel>
          <SearchableSelect
            value="Easy Rewards"
            onChange={() => {}}
            options={['Easy Rewards']}
            disabled
            className="!bg-bg-surface-hover !border-transparent opacity-70 cursor-not-allowed"
          />
        </div>
        <div>
          <InputLabel required>Project Type</InputLabel>
          <SearchableSelect
            value={project}
            onChange={setProject}
            options={['Development', 'Design', 'Marketing', 'Operations']}
            className={searchableSelectClass}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <InputLabel>Business Unit</InputLabel>
            <SearchableSelect
              value={businessUnit}
              onChange={setBusinessUnit}
              options={['Technology', 'Sales', 'HR']}
              className={searchableSelectClass}
            />
          </div>
          <div>
            <InputLabel>Sub-business Unit</InputLabel>
            <SearchableSelect
              value={subBusinessUnit}
              onChange={setSubBusinessUnit}
              options={['Frontend', 'Backend', 'Recruiting']}
              className={searchableSelectClass}
            />
          </div>
        </div>
        <div>
          <InputLabel>Assignee</InputLabel>
          <SearchableSelect
            value={assignee}
            onChange={setAssignee}
            options={['Unassigned', 'John Doe', 'Jane Smith']}
            className={searchableSelectClass}
          />
        </div>
      </div>

      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <InputLabel>Attachments</InputLabel>
        <div className="border-2 border-dashed border-border-default rounded-lg p-8 flex flex-col items-center justify-center text-text-muted hover:border-brand-500 hover:bg-brand-50/50 hover:text-brand-600 transition-colors cursor-pointer bg-bg-page">
          <Paperclip size={28} className="mb-3" />
          <span className="text-sm font-medium">Click or drag files to upload</span>
        </div>
      </div>
    </div>
  );

  const renderJiraTask = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <div>
          <InputLabel required>Summary</InputLabel>
          <input 
            type="text" 
            value={summary}
            onChange={e => setSummary(e.target.value)}
            className={inputClass}
            placeholder="Jira task summary..."
          />
        </div>
        <div>
          <InputLabel>Description</InputLabel>
          <RichTextEditor content={description} onChange={setDescription} placeholder="Detailed description..." />
        </div>
      </div>

      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-default pb-2">Jira Details</h3>
        <div>
          <InputLabel>Client</InputLabel>
          <SearchableSelect
            value="Easy Rewards"
            onChange={() => {}}
            options={['Easy Rewards']}
            disabled
            className="!bg-bg-surface-hover !border-transparent opacity-70 cursor-not-allowed"
          />
        </div>
        <div>
          <InputLabel>Project</InputLabel>
          <SearchableSelect
            value={project}
            onChange={setProject}
            options={['Project Alpha', 'Project Beta']}
            className={searchableSelectClass}
          />
        </div>
        <div>
          <InputLabel>Jira Board</InputLabel>
          <SearchableSelect
            value={jiraBoard}
            onChange={setJiraBoard}
            options={[
              { label: 'Engineering (ENG)', value: 'ENG' },
              { label: 'Design (DES)', value: 'DES' },
              { label: 'Support (SUP)', value: 'SUP' }
            ]}
            className={searchableSelectClass}
          />
        </div>
        <div>
          <InputLabel>Assignee</InputLabel>
          <SearchableSelect
            value={assignee}
            onChange={setAssignee}
            options={['Unassigned', 'John Doe', 'Jane Smith']}
            className={searchableSelectClass}
          />
        </div>
      </div>

      <div className="bg-bg-surface p-5 rounded-lg border border-border-default shadow-sm flex flex-col gap-5">
        <InputLabel>Attachments</InputLabel>
        <div className="border-2 border-dashed border-border-default rounded-lg p-8 flex flex-col items-center justify-center text-text-muted hover:border-brand-500 hover:bg-brand-50/50 hover:text-brand-600 transition-colors cursor-pointer bg-bg-page">
          <Paperclip size={28} className="mb-3" />
          <span className="text-sm font-medium">Click or drag files to upload</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div 
        className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <aside role="dialog" aria-modal="true" aria-labelledby="create-ticket-title" className="fixed inset-y-0 right-0 w-full max-w-2xl bg-bg-page shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-border-strong">
        <header className="px-8 py-6 border-b border-border-default flex items-center justify-between bg-bg-surface shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
              {isTicket && <Ticket size={20} />}
              {isInternal && <CheckSquare size={20} />}
              {isJira && <Building size={20} />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary tracking-tight">
                {isTicket && (mode === 'change_project' ? "Change Project" : mode === 'clone' ? "Clone Ticket" : "Create Ticket")}
                {isInternal && "Create Internal Task"}
                {isJira && "Create Jira Task"}
              </h2>
              {isTicket && !success && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-brand-500' : 'bg-border-strong'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-brand-500' : 'bg-border-strong'}`}></div>
                  </div>
                  <p className="text-xs font-medium text-text-secondary">Step {step} of 2</p>
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-bg-page custom-scrollbar">
          {!success ? (
            <div className="max-w-xl mx-auto w-full">
              {isTicket && step === 1 && renderTicketStep1()}
              {isTicket && step === 2 && renderTicketStep2()}
              {isInternal && renderInternalTask()}
              {isJira && renderJiraTask()}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-300 max-w-md mx-auto">
              <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={32} className="text-success-text" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">{mode === 'change_project' ? 'Successfully Updated' : 'Successfully Created'}</h1>
              <p className="text-sm text-text-secondary mb-10">
                {mode === 'change_project' ? 'The ticket project has been successfully changed.' : `The ${isTicket ? 'ticket' : 'task'} has been successfully created and logged into the system. You can now view it in your dashboard.`}
              </p>
              
              <div className="bg-bg-surface border border-border-default rounded-lg p-5 w-full flex items-center justify-between text-left mb-8 shadow-sm">
                <div>
                  <p className="text-xs text-text-secondary font-medium">Issue Key</p>
                  <p className="text-sm font-bold text-brand-600 mt-1">FLOW-207</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-medium">Project</p>
                  <p className="text-sm font-semibold text-text-primary mt-1">{project || 'Core Infrastructure'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="px-8 py-5 border-t border-border-default bg-bg-surface shrink-0 flex justify-between items-center relative z-10">
          {!success ? (
            <div className="w-full flex justify-between items-center max-w-xl mx-auto">
              {isTicket && step === 2 ? (
                <Button variant="outline" onClick={() => setStep(1)} icon={ArrowLeft}>Back</Button>
              ) : (
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              )}
              
              {isTicket && step === 1 ? (
                <Button variant="primary" onClick={() => setStep(2)}>Next <ArrowRight size={16} className="ml-2" /></Button>
              ) : (
                <Button variant="primary" onClick={handleCreate}>{mode === 'change_project' ? 'Update Project' : `Create ${isTicket ? 'Ticket' : 'Task'}`}</Button>
              )}
            </div>
          ) : (
            <div className="w-full flex justify-end gap-3 max-w-xl mx-auto">
              <Button variant="outline" onClick={() => { setSuccess(false); setStep(1); setSummary(''); setDescription(''); }}>Create Another</Button>
              <Button variant="primary" onClick={onClose}>Done</Button>
            </div>
          )}
        </footer>
      </aside>
    </>
  );
}

