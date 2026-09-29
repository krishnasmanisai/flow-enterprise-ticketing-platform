import React, { useState } from 'react';
import { X, Building, FolderOpen, ArrowRight, ArrowLeft, CheckCircle, Paperclip, AlertCircle, Info, FilePlus, CheckSquare, Ticket, Copy } from 'lucide-react';
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

  const existingAttachments = initialData?.attachments || [];
  const hasExistingAttachments = Array.isArray(existingAttachments) && existingAttachments.length > 0;
  const [cloneAttachments, setCloneAttachments] = useState(true);

  const [client, setClient] = useState(initialData?.client || (isInternal || isJira ? 'Easyrewardz' : ''));
  const [project, setProject] = useState(initialData?.project || '');
  const [reqType, setReqType] = useState(initialData?.reqType || '');
  const [subReqType, setSubReqType] = useState(initialData?.subReqType || '');
  const [serviceType, setServiceType] = useState(initialData?.serviceType || '');
  const [summary, setSummary] = useState(
    initialData?.summary 
      ? (mode === 'clone' ? `CLONE - ${initialData.summary}` : initialData.summary) 
      : ''
  );
  const [description, setDescription] = useState(initialData?.description || '');
  const [assignee, setAssignee] = useState(initialData?.assignee || '');
  const [businessUnit, setBusinessUnit] = useState(initialData?.businessUnit || (initialData?.user ? 'Technology' : ''));
  const [subBusinessUnit, setSubBusinessUnit] = useState(initialData?.subBusinessUnit || (initialData?.user ? 'Software Engineering' : ''));
  const [jiraBoard, setJiraBoard] = useState(initialData?.jiraBoard || '');

  const [user, setUser] = useState(initialData?.user || '');

  const handleUserChange = (val: string) => {
    setUser(val);
    if (val && val !== 'Unassigned') {
      setBusinessUnit('Technology');
      setSubBusinessUnit('Software Engineering');
    } else {
      setBusinessUnit('');
      setSubBusinessUnit('');
    }
  };

  const handleCreate = () => {
    setSuccess(true);
  };

  const renderIncludeSection = () => {
    if (mode !== 'clone' || !hasExistingAttachments) return null;
    return (
      <div className="bg-bg-page border border-border-default rounded-lg p-4">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">
          Include
        </span>
        <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-text-primary cursor-pointer select-none">
          <input
            type="checkbox"
            checked={cloneAttachments}
            onChange={(e) => setCloneAttachments(e.target.checked)}
            className="w-4 h-4 rounded border-border-default text-brand-600 focus:ring-brand-500 cursor-pointer accent-brand-600"
          />
          <span>Attachments</span>
          <span className="text-xs font-normal text-text-muted">({existingAttachments.length} available)</span>
        </label>
        <p className="text-xs text-text-muted mt-1.5 ml-6.5">
          {cloneAttachments 
            ? `All ${existingAttachments.length} existing attachment(s) from the source item will be copied over.` 
            : 'Attachments from the original item will be omitted.'}
        </p>
      </div>
    );
  };

  const renderAttachmentsSection = () => (
    <div>
      <InputLabel>Attachments</InputLabel>
      {mode === 'clone' && hasExistingAttachments && cloneAttachments && (
        <div className="mb-3 p-3 bg-bg-surface-hover rounded-lg border border-border-default space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
              <Paperclip size={13} className="text-brand-600" />
              Source attachments to be cloned ({existingAttachments.length}):
            </span>
            <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              Will Clone
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {existingAttachments.map((att: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-bg-surface rounded-md border border-border-subtle text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 text-[10px] uppercase shrink-0">
                    {att.type || 'FILE'}
                  </span>
                  <span className="font-medium text-text-primary truncate" title={att.name}>{att.name}</span>
                </div>
                {att.size && <span className="text-text-muted text-[11px] font-mono shrink-0 ml-2">{att.size}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-2 border-dashed border-border-default rounded-lg p-7 flex flex-col items-center justify-center text-text-muted hover:border-brand-500 hover:bg-brand-50/50 hover:text-brand-600 transition-colors cursor-pointer bg-bg-page">
        <Paperclip size={26} className="mb-2" />
        <span className="text-sm font-medium">
          {mode === 'clone' && hasExistingAttachments && cloneAttachments
            ? 'Click or drag additional files to upload'
            : 'Click or drag files to upload'}
        </span>
        <span className="text-xs text-text-muted mt-0.5">
          {mode === 'clone' && hasExistingAttachments && !cloneAttachments
            ? 'Original attachments will not be cloned.'
            : 'Max file size: 25MB'}
        </span>
      </div>
    </div>
  );

  const renderTicketForm = () => (
    <div className="bg-bg-surface p-6 rounded-lg border border-border-default shadow-sm flex flex-col gap-6">
      <h3 className="text-sm font-bold text-text-primary border-b border-border-default pb-2">Ticket Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mode !== 'change_project' && (
          <div>
            <InputLabel required>Brand (Client)</InputLabel>
            <SearchableSelect
              value={client}
              onChange={setClient}
              options={['Acme Corp', 'Globex', 'Soylent Corp', 'Initech']}
            />
          </div>
        )}
        <div>
          <InputLabel required>Project</InputLabel>
          <SearchableSelect
            value={project}
            onChange={setProject}
            options={['Core Infrastructure', 'Authentication', 'Billing', 'Frontend Platform']}
          />
        </div>
        <div>
          <InputLabel required>Request Type</InputLabel>
          <SearchableSelect
            value={reqType}
            onChange={setReqType}
            options={['Incident', 'Service Request', 'Question']}
          />
        </div>
        <div>
          <InputLabel required>Sub-request Type</InputLabel>
          <SearchableSelect
            value={subReqType}
            onChange={setSubReqType}
            options={['Access Issue', 'Performance', 'Bug', 'Other']}
          />
        </div>
        <div>
          <InputLabel required>Service Type</InputLabel>
          <SearchableSelect
            value={serviceType}
            onChange={setServiceType}
            options={['Cloud Hosting', 'On-Prem', 'SaaS']}
          />
        </div>
      </div>

      <hr className="border-border-default" />

      <div className="grid grid-cols-1 gap-6">
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

        {renderIncludeSection()}

        {renderAttachmentsSection()}
      </div>
    </div>
  );

  const renderInternalTask = () => (
    <div className="bg-bg-surface p-6 rounded-lg border border-border-default shadow-sm flex flex-col gap-6">
      <h3 className="text-sm font-bold text-text-primary border-b border-border-default pb-2">Task Details</h3>
      <div className="grid grid-cols-1 gap-6">
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

      <hr className="border-border-default" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <InputLabel>Client</InputLabel>
          <SearchableSelect
            value={client || "Easyrewardz"}
            onChange={() => {}}
            options={['Easyrewardz', 'Easy Rewards']}
            disabled
          />
        </div>
        <div>
          <InputLabel>Assignee</InputLabel>
          <SearchableSelect
            value={assignee}
            onChange={setAssignee}
            options={[
              'Unassigned',
              'Vanaparthy Mani Sai Guptha',
              'Ankita Verma',
              'Jane Smith',
              'John Doe',
              'David E.',
              'Support Team'
            ]}
          />
        </div>
        <div>
          <InputLabel required>Project</InputLabel>
          <SearchableSelect
            value={project}
            onChange={setProject}
            options={user || project ? ['Development', 'Technology', 'Design', 'Marketing', 'Operations', 'ELT'] : []}
            disabled={!user && !project}
          />
          {!user && !project && <p className="text-xs text-text-muted mt-1">Select a user first to load projects.</p>}
        </div>
        <div>
          <InputLabel>Business Unit</InputLabel>
          <SearchableSelect
            value={businessUnit}
            onChange={() => {}}
            options={businessUnit ? [businessUnit] : ['Technology']}
            placeholder="Auto-populated"
            disabled
          />
        </div>
        <div>
          <InputLabel>Sub-business Unit</InputLabel>
          <SearchableSelect
            value={subBusinessUnit}
            onChange={() => {}}
            options={subBusinessUnit ? [subBusinessUnit] : ['Software Engineering']}
            placeholder="Auto-populated"
            disabled
          />
        </div>
        <div>
          <InputLabel required>User</InputLabel>
          <SearchableSelect
            value={user}
            onChange={handleUserChange}
            options={[
              'Ankita Verma',
              'Vanaparthy Mani Sai Guptha',
              'Jane Smith',
              'John Doe',
              'Alice Johnson'
            ]}
          />
        </div>
      </div>

      {mode === 'clone' && hasExistingAttachments && (
        <>
          <hr className="border-border-default" />
          {renderIncludeSection()}
        </>
      )}

      <hr className="border-border-default" />

      <div className="grid grid-cols-1 gap-6">
        {renderAttachmentsSection()}
      </div>
    </div>
  );

  const renderJiraTask = () => (
    <div className="bg-bg-surface p-6 rounded-lg border border-border-default shadow-sm flex flex-col gap-6">
      <h3 className="text-sm font-bold text-text-primary border-b border-border-default pb-2">Jira Task Details</h3>
      <div className="grid grid-cols-1 gap-6">
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
      
      <hr className="border-border-default" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <InputLabel>Client</InputLabel>
          <SearchableSelect
            value={client || "Easyrewardz"}
            onChange={() => {}}
            options={['Easyrewardz', 'Easy Rewards']}
            disabled
          />
        </div>
        <div>
          <InputLabel>Assignee</InputLabel>
          <SearchableSelect
            value={assignee}
            onChange={setAssignee}
            options={[
              'Unassigned',
              'Vanaparthy Mani Sai Guptha',
              'Ankita Verma',
              'Jane Smith',
              'John Doe',
              'David E.',
              'Support Team'
            ]}
          />
        </div>
        <div>
          <InputLabel required>Project</InputLabel>
          <SearchableSelect
            value={project}
            onChange={setProject}
            options={['ELT', 'Project Alpha', 'Project Beta', 'SIA', 'Customer Experience']}
          />
        </div>
        <div>
          <InputLabel>Jira Board</InputLabel>
          <SearchableSelect
            value={jiraBoard}
            onChange={setJiraBoard}
            options={[
              { label: 'ELT Board (ELT)', value: 'ELT' },
              { label: 'Engineering (ENG)', value: 'ENG' },
              { label: 'Design (DES)', value: 'DES' },
              { label: 'Support (SUP)', value: 'SUP' }
            ]}
          />
        </div>
      </div>
      
      {mode === 'clone' && hasExistingAttachments && (
        <>
          <hr className="border-border-default" />
          {renderIncludeSection()}
        </>
      )}

      <hr className="border-border-default" />

      <div className="grid grid-cols-1 gap-6">
        {renderAttachmentsSection()}
      </div>
    </div>
  );

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="create-ticket-title" 
      className="fixed inset-0 w-full h-full bg-bg-page z-50 overflow-y-auto animate-in fade-in zoom-in-95 duration-200 custom-scrollbar"
    >
      <div className="min-h-full flex flex-col">
        <header className="px-8 py-6 border-b border-border-default flex items-center justify-between bg-bg-surface shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
              {mode === 'clone' ? (
                <Copy size={20} />
              ) : (
                <>
                  {isTicket && <Ticket size={20} />}
                  {isInternal && <CheckSquare size={20} />}
                  {isJira && <Building size={20} />}
                </>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary tracking-tight">
                {isTicket && (mode === 'change_project' ? "Change Project" : mode === 'clone' ? (initialData?.id ? `Clone ${initialData.id}` : "Clone Ticket") : "Create Ticket")}
                {isInternal && (mode === 'clone' ? (initialData?.id ? `Clone ${initialData.id}` : "Clone Internal Task") : "Create Internal Task")}
                {isJira && (mode === 'clone' ? (initialData?.id || initialData?.jira?.issueKey ? `Clone ${initialData?.jira?.issueKey || initialData?.id}` : "Clone Jira Task") : "Create Jira Task")}
              </h2>
              <p className="text-xs text-text-muted mt-0.5">Required fields are marked with an asterisk <span className="text-error-text">*</span></p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 p-8 bg-bg-page flex flex-col">
          {!success ? (
            <div className="max-w-5xl mx-auto w-full">
              {isTicket && renderTicketForm()}
              {isInternal && renderInternalTask()}
              {isJira && renderJiraTask()}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-300 max-w-md mx-auto">
              <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={32} className="text-success-text" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {mode === 'change_project' ? 'Successfully Updated' : mode === 'clone' ? 'Successfully Cloned' : 'Successfully Created'}
              </h1>
              <p className="text-sm text-text-secondary mb-10">
                {mode === 'change_project' 
                  ? 'The ticket project has been successfully changed.' 
                  : mode === 'clone'
                  ? `The ${isTicket ? 'ticket' : 'task'} has been successfully cloned ${cloneAttachments && hasExistingAttachments ? `with ${existingAttachments.length} attachment(s)` : 'without previous attachments'}. You can now view it in your dashboard.`
                  : `The ${isTicket ? 'ticket' : 'task'} has been successfully created and logged into the system. You can now view it in your dashboard.`}
              </p>
              
              <div className="bg-bg-surface border border-border-default rounded-lg p-5 w-full flex items-center justify-between text-left mb-8 shadow-sm">
                <div>
                  <p className="text-xs text-text-secondary font-medium">Issue Key</p>
                  <p className="text-sm font-bold text-brand-600 mt-1">
                    {isTicket ? (mode === 'clone' ? 'FLOW-208' : 'FLOW-207') : isJira ? (mode === 'clone' ? 'ELT-205' : 'FLOW-207') : (mode === 'clone' ? 'TSK-598' : 'TSK-597')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-medium">Project</p>
                  <p className="text-sm font-semibold text-text-primary mt-1">{project || 'ELT'}</p>
                </div>
                {mode === 'clone' && hasExistingAttachments && (
                  <div>
                    <p className="text-xs text-text-secondary font-medium">Attachments</p>
                    <p className="text-sm font-semibold text-text-primary mt-1">
                      {cloneAttachments ? `${existingAttachments.length} Cloned` : 'Excluded'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <footer className="px-8 py-5 border-t border-border-default bg-bg-surface shrink-0 flex justify-between items-center relative z-10 mt-auto">
          {!success ? (
            <div className="w-full flex justify-between items-center max-w-5xl mx-auto">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={handleCreate}>
                {mode === 'change_project' ? 'Update Project' : mode === 'clone' ? `Clone ${isTicket ? 'Ticket' : 'Task'}` : `Create ${isTicket ? 'Ticket' : 'Task'}`}
              </Button>
            </div>
          ) : (
            <div className="w-full flex justify-end gap-3 max-w-5xl mx-auto">
              <Button variant="outline" onClick={() => { setSuccess(false); setStep(1); setSummary(''); setDescription(''); }}>Create Another</Button>
              <Button variant="primary" onClick={onClose}>Done</Button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

