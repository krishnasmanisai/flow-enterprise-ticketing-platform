import { useState, useRef, DragEvent } from 'react';
import { 
  ArrowLeft, Save, GripVertical, Settings2, Hash, Type, AlignLeft, Calendar, 
  List, CheckSquare, FileUp, Plus, Eye, Copy, Trash2, Monitor, Tablet, Smartphone,
  Search, PanelLeftClose, PanelRightClose, PanelLeft, PanelRight, ChevronDown, ChevronRight,
  Heading1, Minus, AlertCircle, LayoutTemplate, Download, Library, X
} from 'lucide-react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface FormField {
  id: string;
  type: string;
  label: string;
  internalKey: string;
  required: boolean;
  width: 'Full Width' | 'Half Width' | 'One Third' | 'Two Third';
  helpText?: string;
  placeholder?: string;
  options?: string[]; // for dropdowns/radios
}

export default function ConfigFormBuilder({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [previewMode, setPreviewMode] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Layout': true,
    'Saved Fields': true
  });

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>('field_1');
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [showImportTemplateModal, setShowImportTemplateModal] = useState(false);
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');
  
  const mockTemplates = [
    { id: 't1', name: 'Standard Marketing Campaign', fields: 12 },
    { id: 't2', name: 'IT Support Ticket', fields: 8 },
    { id: 't3', name: 'HR Onboarding Request', fields: 15 },
    { id: 't4', name: 'Simple Contact Form', fields: 4 },
  ];

  const handleSaveTemplate = () => {
    setShowSaveTemplateModal(false);
    setTemplateName('');
  };

  const handleImportTemplate = (id: string) => {
    setShowImportTemplateModal(false);
    // In a real app, load template fields here
  };

  
  const [canvasFields, setCanvasFields] = useState<FormField[]>([
    { id: 'field_1', type: 'Short Text', label: 'Campaign Name', internalKey: 'campaign_name', required: true, width: 'Full Width', placeholder: 'Enter campaign name' },
    { id: 'field_2', type: 'Dropdown', label: 'Priority', internalKey: 'priority', required: true, width: 'Half Width', options: ['Low', 'Medium', 'High', 'Critical'] },
    { id: 'field_3', type: 'Dropdown', label: 'Target Audience', internalKey: 'target_audience', required: false, width: 'Half Width', options: ['All', 'New Users', 'Active Users'] },
    { id: 'field_4', type: 'Long Text', label: 'Business Justification', internalKey: 'business_justification', required: true, width: 'Full Width', placeholder: 'Why is this campaign needed?' },
  ]);

  const fieldTypes = [
    { category: 'Form Fields', items: [
      { id: 'type_short_text', icon: Type, label: 'Short Text', type: 'Short Text' },
      { id: 'type_long_text', icon: AlignLeft, label: 'Long Text', type: 'Long Text' },
      { id: 'type_rich_text', icon: AlignLeft, label: 'Rich Text', type: 'Rich Text' },
      { id: 'type_number', icon: Hash, label: 'Number', type: 'Number' },
      { id: 'type_currency', icon: Hash, label: 'Currency', type: 'Currency' },
      { id: 'type_dropdown', icon: List, label: 'Dropdown', type: 'Dropdown' },
      { id: 'type_multi_select', icon: List, label: 'Multi Select', type: 'Multi Select' },
      { id: 'type_checkboxes', icon: CheckSquare, label: 'Checkboxes', type: 'Checkboxes' },
      { id: 'type_radio', icon: CheckSquare, label: 'Radio Buttons', type: 'Radio' },
      { id: 'type_date', icon: Calendar, label: 'Date', type: 'Date' },
      { id: 'type_date_time', icon: Calendar, label: 'Date Time', type: 'Date Time' },
      { id: 'type_file_upload', icon: FileUp, label: 'File Upload', type: 'File Upload' },
    ]},
    { category: 'Layout & Display', items: [
      { id: 'type_section', icon: LayoutTemplate, label: 'Section', type: 'Section' },
      { id: 'type_two_column', icon: LayoutTemplate, label: 'Two Column Grid', type: 'Two Column' },
      { id: 'type_heading', icon: Heading1, label: 'Heading', type: 'Heading' },
      { id: 'type_divider', icon: Minus, label: 'Divider', type: 'Divider' },
      { id: 'type_instructional', icon: Type, label: 'Instructional Text', type: 'Instructional Text' },
    ]},
    { category: 'Field Library', items: [
      { id: 'saved_1', icon: List, label: 'Priority', type: 'Dropdown', saved: true },
      { id: 'saved_2', icon: AlignLeft, label: 'Business Justification', type: 'Long Text', saved: true },
      { id: 'saved_3', icon: Calendar, label: 'Target Date', type: 'Date', saved: true },
      { id: 'saved_4', icon: Hash, label: 'Budget Amount', type: 'Currency', saved: true },
    ]}
  ];

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleDragStart = (e: DragEvent, id: string, isNew: boolean = false, type: string = '') => {
    if (isNew) {
      e.dataTransfer.setData('new_field_type', type);
    } else {
      e.dataTransfer.setData('existing_field_id', id);
    }
    setDraggedItemId(id);
  };

  const handleDragOver = (e: DragEvent, id: string) => {
    e.preventDefault();
    setDropTargetId(id);
  };

  const handleDrop = (e: DragEvent, targetId: string) => {
    e.preventDefault();
    setDropTargetId(null);
    setDraggedItemId(null);
    
    const newFieldType = e.dataTransfer.getData('new_field_type');
    const existingFieldId = e.dataTransfer.getData('existing_field_id');
    
    if (newFieldType) {
      // Create new field
      const newField: FormField = {
        id: `field_${Date.now()}`,
        type: newFieldType,
        label: `New ${newFieldType}`,
        internalKey: `new_${newFieldType.toLowerCase().replace(' ', '_')}`,
        required: false,
        width: 'Full Width'
      };
      
      const targetIndex = canvasFields.findIndex(f => f.id === targetId);
      const newFields = [...canvasFields];
      if (targetIndex !== -1) {
        newFields.splice(targetIndex + 1, 0, newField);
      } else {
        newFields.push(newField);
      }
      setCanvasFields(newFields);
      setSelectedFieldId(newField.id);
    } else if (existingFieldId && existingFieldId !== targetId) {
      // Reorder existing field
      const draggedIndex = canvasFields.findIndex(f => f.id === existingFieldId);
      const targetIndex = canvasFields.findIndex(f => f.id === targetId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newFields = [...canvasFields];
        const [removed] = newFields.splice(draggedIndex, 1);
        newFields.splice(targetIndex, 0, removed);
        setCanvasFields(newFields);
      }
    }
  };

  const addFieldToBottom = (type: string, label: string) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: type,
      label: label,
      internalKey: `new_${type.toLowerCase().replace(' ', '_')}`,
      required: false,
      width: 'Full Width'
    };
    setCanvasFields([...canvasFields, newField]);
    setSelectedFieldId(newField.id);
  };

  const deleteField = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCanvasFields(canvasFields.filter(f => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const duplicateField = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const fieldToDuplicate = canvasFields.find(f => f.id === id);
    if (fieldToDuplicate) {
      const newField = { ...fieldToDuplicate, id: `field_${Date.now()}`, label: `${fieldToDuplicate.label} (Copy)` };
      const index = canvasFields.findIndex(f => f.id === id);
      const newFields = [...canvasFields];
      newFields.splice(index + 1, 0, newField);
      setCanvasFields(newFields);
      setSelectedFieldId(newField.id);
    }
  };

  const updateSelectedField = (updates: Partial<FormField>) => {
    if (!selectedFieldId) return;
    setCanvasFields(canvasFields.map(f => f.id === selectedFieldId ? { ...f, ...updates } : f));
  };

  const selectedField = canvasFields.find(f => f.id === selectedFieldId);

  const getWidthClass = (width: string) => {
    switch(width) {
      case 'Half Width': return 'col-span-1 md:col-span-1';
      case 'One Third': return 'col-span-1 md:col-span-1 lg:col-span-1';
      case 'Two Third': return 'col-span-1 md:col-span-2 lg:col-span-2';
      default: return 'col-span-1 md:col-span-2 lg:col-span-3'; // assume full width is max 3 cols if we had a 3 col grid, but let's stick to 2 for now.
    }
  };
  
  const widthClasses = (width: string) => {
      switch(width) {
          case 'Half Width': return 'col-span-1';
          case 'One Third': return 'col-span-1 md:col-span-1';
          case 'Two Third': return 'col-span-1 md:col-span-2';
          default: return 'col-span-1 md:col-span-2';
      }
  }

  return (
    <div className="flex flex-col h-full bg-bg-page overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-default bg-bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('config_request_types' as Page)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">New Campaign Form</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-text-primary tracking-tight">Form Builder</h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-warning-bg text-warning-text border border-warning-text/20 ml-1">Draft</span>
            </div>
          </div>
        </div>

        {/* Device Toggles */}
        <div className="hidden md:flex items-center bg-bg-page p-1 rounded-lg border border-border-default">
          <button onClick={() => setDevice('desktop')} className={`p-1.5 rounded-md transition-colors ${device === 'desktop' ? 'bg-bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`}>
            <Monitor size={16} />
          </button>
          <button onClick={() => setDevice('tablet')} className={`p-1.5 rounded-md transition-colors ${device === 'tablet' ? 'bg-bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`}>
            <Tablet size={16} />
          </button>
          <button onClick={() => setDevice('mobile')} className={`p-1.5 rounded-md transition-colors ${device === 'mobile' ? 'bg-bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`}>
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={() => setShowImportTemplateModal(true)}>Import Template</Button>
          <Button variant="outline" size="sm" icon={Library} onClick={() => setShowSaveTemplateModal(true)}>Save as Template</Button>
          <Button variant={previewMode ? 'primary' : 'outline'} size="sm" icon={Eye} onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? 'Exit Preview' : 'Preview'}
          </Button>
          <Button variant="primary" size="sm" icon={Save}>Save Form</Button>
        </div>
      </div>

      {/* Builder Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: Field Library */}
        {!previewMode && (
          <div className={`${leftPanelOpen ? 'w-[280px]' : 'w-0'} bg-bg-surface border-r border-border-default flex flex-col shrink-0 transition-all duration-300 z-10`}>
            <div className={`p-4 border-b border-border-default ${!leftPanelOpen && 'hidden'}`}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-text-primary">Toolbox</h2>
                <button onClick={() => setLeftPanelOpen(false)} className="text-text-muted hover:text-text-primary"><PanelLeftClose size={16} /></button>
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search fields..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-base text-xs w-full pl-8 py-1.5"
                />
              </div>
            </div>
            <div className={`flex-1 overflow-y-auto p-3 ${!leftPanelOpen && 'hidden'} custom-scrollbar`}>
              <div className="space-y-4">
                {fieldTypes.map((category, i) => {
                  const filteredItems = category.items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
                  if (filteredItems.length === 0) return null;
                  
                  return (
                    <div key={i} className="space-y-1">
                      <button 
                        onClick={() => toggleCategory(category.category)}
                        className="flex items-center gap-1.5 w-full py-1.5 text-left group"
                      >
                        {expandedCategories[category.category] ? <ChevronDown size={14} className="text-text-muted group-hover:text-text-primary" /> : <ChevronRight size={14} className="text-text-muted group-hover:text-text-primary" />}
                        <h3 className="text-xs font-semibold text-text-secondary group-hover:text-text-primary transition-colors">{category.category}</h3>
                      </button>
                      
                      {expandedCategories[category.category] && (
                        <div className="grid grid-cols-2 gap-2 pl-1 pr-1 pb-2">
                          {filteredItems.map((ft) => (
                            <div 
                              key={ft.id} 
                              draggable
                              onDragStart={(e) => handleDragStart(e, ft.id, true, ft.type)}
                              onDoubleClick={() => addFieldToBottom(ft.type, ft.label)}
                              className="flex flex-col items-center justify-center p-3 border border-border-default rounded-md bg-bg-page hover:border-brand-500 hover:text-brand-600 transition-colors cursor-grab text-text-secondary group"
                            >
                              <ft.icon size={18} strokeWidth={1.5} className="mb-2 text-text-muted group-hover:text-brand-500 transition-colors" />
                              <span className="text-[10px] font-semibold text-center leading-tight">{ft.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Panel Toggles (when closed) */}
        {!previewMode && !leftPanelOpen && (
          <button 
            onClick={() => setLeftPanelOpen(true)} 
            className="absolute left-0 top-4 z-20 bg-bg-surface border border-l-0 border-border-default p-1.5 rounded-r-md shadow-sm text-text-muted hover:text-text-primary transition-colors"
          >
            <PanelLeft size={16} />
          </button>
        )}
        {!previewMode && !rightPanelOpen && (
          <button 
            onClick={() => setRightPanelOpen(true)} 
            className="absolute right-0 top-4 z-20 bg-bg-surface border border-r-0 border-border-default p-1.5 rounded-l-md shadow-sm text-text-muted hover:text-text-primary transition-colors"
          >
            <PanelRight size={16} />
          </button>
        )}

        {/* Center Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-bg-page/50 relative flex justify-center custom-scrollbar" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'canvas_bottom')}>
          <div 
            className={`transition-all duration-300 ease-in-out w-full ${device === 'mobile' ? 'max-w-[375px]' : device === 'tablet' ? 'max-w-[768px]' : 'max-w-[800px]'}`}
          >
            <div className={`bg-bg-surface border border-border-default ${previewMode ? 'shadow-md rounded-xl' : 'shadow-sm rounded-lg'} min-h-[600px] flex flex-col ${previewMode ? 'p-8' : 'p-6'}`}>
              
              <div className="mb-8 border-b border-border-default pb-6">
                {previewMode ? (
                  <>
                    <h2 className="text-2xl font-bold text-text-primary">Request Details</h2>
                    <p className="text-sm text-text-secondary mt-1">Please provide details about the campaign.</p>
                  </>
                ) : (
                  <>
                    <input 
                      type="text" 
                      defaultValue="Request Details" 
                      className="text-2xl font-bold text-text-primary bg-transparent border-none outline-none w-full hover:bg-bg-page focus:bg-bg-page rounded px-2 py-1 -ml-2 transition-colors"
                    />
                    <input 
                      type="text" 
                      defaultValue="Please provide details about the campaign." 
                      className="text-sm text-text-secondary bg-transparent border-none outline-none w-full mt-1 hover:bg-bg-page focus:bg-bg-page rounded px-2 py-1 -ml-2 transition-colors"
                    />
                  </>
                )}
              </div>

              {canvasFields.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-border-default rounded-xl bg-bg-page/50 text-text-muted h-full w-full">
                  <LayoutTemplate size={48} strokeWidth={1} className="mb-4 opacity-50" />
                  <h3 className="text-base font-semibold text-text-primary mb-1">Your form is empty</h3>
                  <p className="text-sm text-text-secondary max-w-sm">Drag and drop fields from the left toolbox, or double click them to add directly to the canvas.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {canvasFields.map((cf) => (
                    <div 
                      key={cf.id}
                      draggable={!previewMode}
                      onDragStart={(e) => handleDragStart(e, cf.id)}
                      onDragOver={(e) => handleDragOver(e, cf.id)}
                      onDrop={(e) => handleDrop(e, cf.id)}
                      onClick={() => !previewMode && setSelectedFieldId(cf.id)}
                      className={`
                        ${widthClasses(cf.width)} 
                        relative group transition-all rounded-lg 
                        ${!previewMode ? 'border-2 cursor-pointer p-3 -m-3' : ''}
                        ${!previewMode && selectedFieldId === cf.id ? 'border-brand-500 bg-brand-50/10' : !previewMode ? 'border-transparent hover:border-border-default hover:bg-bg-page/50' : ''}
                        ${dropTargetId === cf.id ? 'border-t-brand-500 border-t-4' : ''}
                      `}
                    >
                      {/* Drag Handle & Actions for Builder Mode */}
                      {!previewMode && (
                        <div className={`absolute right-2 top-2 flex items-center gap-1 ${selectedFieldId === cf.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity bg-bg-surface shadow-sm rounded-md border border-border-default p-1 z-10`}>
                          <button onClick={(e) => duplicateField(cf.id, e)} className="p-1 hover:bg-bg-page text-text-muted hover:text-text-primary rounded transition-colors" title="Duplicate"><Copy size={12} /></button>
                          <button onClick={(e) => deleteField(cf.id, e)} className="p-1 hover:bg-error-bg text-text-muted hover:text-error-text rounded transition-colors" title="Delete"><Trash2 size={12} /></button>
                          <div className="w-px h-4 bg-border-default mx-1"></div>
                          <div className="p-1 text-text-muted cursor-grab active:cursor-grabbing hover:text-text-primary"><GripVertical size={14} /></div>
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                        {cf.type === 'Heading' ? (
                          <h3 className="text-xl font-bold text-text-primary mt-4 mb-2">{cf.label}</h3>
                        ) : cf.type === 'Divider' ? (
                          <hr className="my-6 border-t border-border-default" />
                        ) : cf.type === 'Section' ? (
                          <div className="border border-border-default rounded-xl p-4 bg-bg-page/30 my-2">
                             <h4 className="text-base font-bold text-text-primary mb-1">{cf.label}</h4>
                             <p className="text-sm text-text-secondary">{cf.helpText || 'Section description'}</p>
                          </div>
                        ) : (
                          <>
                            <label className="block text-sm font-semibold text-text-primary">
                              {cf.label} {cf.required && <span className="text-error-text">*</span>}
                            </label>
                            
                            {/* Render actual input representations based on type */}
                            {cf.type === 'Short Text' && <input type="text" placeholder={cf.placeholder || 'Enter value'} className="input-base w-full pointer-events-none bg-bg-page" readOnly />}
                            {cf.type === 'Long Text' && <textarea placeholder={cf.placeholder || 'Enter value'} className="input-base w-full min-h-[80px] pointer-events-none bg-bg-page" readOnly />}
                            {cf.type === 'Dropdown' && (
                              <div className="input-base w-full flex items-center justify-between bg-bg-page">
                                <span className="text-text-muted">{cf.placeholder || 'Select an option'}</span>
                                <ChevronDown size={14} className="text-text-muted" />
                              </div>
                            )}
                            {cf.type === 'Number' && <input type="number" placeholder="0" className="input-base w-full pointer-events-none bg-bg-page" readOnly />}
                            {cf.type === 'Date' && <div className="input-base w-full flex items-center justify-between bg-bg-page"><span className="text-text-muted">MM/DD/YYYY</span><Calendar size={14} className="text-text-muted" /></div>}
                            {cf.type === 'Checkbox' && <div className="flex items-center gap-2 mt-1"><input type="checkbox" className="w-4 h-4 rounded border-border-default" readOnly disabled /><span className="text-sm text-text-secondary">{cf.label || 'Option'}</span></div>}
                            {cf.type === 'File Upload' && <div className="border border-dashed border-border-default rounded-md p-4 flex flex-col items-center justify-center bg-bg-page/50"><FileUp size={20} className="text-text-muted mb-2"/><span className="text-xs text-text-secondary">Click or drag file to upload</span></div>}
                            
                            {cf.helpText && <p className="text-xs text-text-muted mt-1">{cf.helpText}</p>}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Properties */}
        {!previewMode && (
          <div className={`${rightPanelOpen ? 'w-[320px]' : 'w-0'} bg-bg-surface border-l border-border-default flex flex-col shrink-0 transition-all duration-300 z-10`}>
            <div className={`p-4 border-b border-border-default flex items-center justify-between ${!rightPanelOpen && 'hidden'}`}>
              <div className="flex items-center gap-2">
                <Settings2 size={16} className="text-text-primary" />
                <h2 className="text-sm font-bold text-text-primary">Properties</h2>
              </div>
              <button onClick={() => setRightPanelOpen(false)} className="text-text-muted hover:text-text-primary"><PanelRightClose size={16} /></button>
            </div>
            
            <div className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${!rightPanelOpen && 'hidden'}`}>
              {selectedField ? (
                <div className="space-y-6">
                  {/* Alert for Overrides */}
                  {selectedField.id.startsWith('saved_') && (
                    <div className="bg-brand-50 border border-brand-200 rounded-md p-3 flex items-start gap-2">
                      <AlertCircle size={14} className="text-brand-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-brand-800">Form Overrides Active</p>
                        <p className="text-[10px] text-brand-600 mt-0.5">Changes made here apply only to this form, leaving the global field intact.</p>
                      </div>
                    </div>
                  )}

                  {/* General */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-default pb-1.5 flex items-center justify-between">
                      General <ChevronDown size={12}/>
                    </h3>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-text-primary">Field Label</label>
                      <input 
                        type="text" 
                        value={selectedField.label} 
                        onChange={(e) => updateSelectedField({ label: e.target.value })}
                        className="input-base text-sm w-full py-1.5" 
                      />
                    </div>
                    {selectedField.type !== 'Divider' && selectedField.type !== 'Heading' && selectedField.type !== 'Section' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Internal Key</label>
                          <input type="text" value={selectedField.internalKey} className="input-base text-sm w-full py-1.5 bg-bg-page text-text-muted font-mono" readOnly />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Placeholder</label>
                          <input 
                            type="text" 
                            value={selectedField.placeholder || ''} 
                            onChange={(e) => updateSelectedField({ placeholder: e.target.value })}
                            placeholder="E.g. Enter your name" 
                            className="input-base text-sm w-full py-1.5" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Help Text</label>
                          <textarea 
                            value={selectedField.helpText || ''} 
                            onChange={(e) => updateSelectedField({ helpText: e.target.value })}
                            placeholder="Add instructional text..." 
                            className="input-base text-sm w-full py-1.5 min-h-[60px]" 
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Validation */}
                  {selectedField.type !== 'Divider' && selectedField.type !== 'Heading' && selectedField.type !== 'Section' && (
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-default pb-1.5 flex items-center justify-between">
                      Validation <ChevronDown size={12}/>
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedField.required} 
                        onChange={(e) => updateSelectedField({ required: e.target.checked })}
                        className="w-4 h-4 rounded border-border-default text-brand-600 focus:ring-brand-500" 
                      />
                      <span className="text-sm font-medium text-text-primary">Required Field</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-border-default text-brand-600 focus:ring-brand-500" />
                      <span className="text-sm font-medium text-text-primary">Read Only</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-border-default text-brand-600 focus:ring-brand-500" />
                      <span className="text-sm font-medium text-text-primary">Hidden from user</span>
                    </label>
                    
                    {(selectedField.type === 'Short Text' || selectedField.type === 'Long Text') && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Min Length</label>
                          <input type="number" placeholder="0" className="input-base text-sm w-full py-1.5" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Max Length</label>
                          <input type="number" placeholder="255" className="input-base text-sm w-full py-1.5" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <label className="text-xs font-semibold text-text-primary">Regex Pattern</label>
                          <input type="text" placeholder="^[a-zA-Z]+$" className="input-base text-sm w-full py-1.5 font-mono" />
                        </div>
                      </div>
                    )}
                    {selectedField.type === 'Number' && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Minimum</label>
                          <input type="number" placeholder="0" className="input-base text-sm w-full py-1.5" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Maximum</label>
                          <input type="number" placeholder="100" className="input-base text-sm w-full py-1.5" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <label className="text-xs font-semibold text-text-primary">Decimal Places</label>
                          <input type="number" placeholder="2" className="input-base text-sm w-full py-1.5" />
                        </div>
                      </div>
                    )}
                    {selectedField.type === 'File Upload' && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="space-y-2 col-span-2">
                          <label className="text-xs font-semibold text-text-primary">Allowed Extensions</label>
                          <input type="text" placeholder=".pdf, .png, .jpg" className="input-base text-sm w-full py-1.5" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Max Size (MB)</label>
                          <input type="number" placeholder="10" className="input-base text-sm w-full py-1.5" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-text-primary">Max Files</label>
                          <input type="number" placeholder="5" className="input-base text-sm w-full py-1.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  )}

                  {/* Field Specific Data Options */}
                  {selectedField.type === 'Dropdown' && (
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-default pb-1.5 flex items-center justify-between">
                        Data Options <ChevronDown size={12}/>
                      </h3>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-text-primary flex justify-between">
                          <span>Dataset Source</span>
                          <span className="text-brand-600 cursor-pointer hover:underline text-[10px]">Create New</span>
                        </label>
                        <select className="input-base text-sm w-full py-1.5">
                          <option>Custom List (Manual)</option>
                          <option>Countries List</option>
                          <option>Cost Centers</option>
                          <option>Brand Portfolio</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-text-primary">Options (one per line)</label>
                        <textarea 
                          value={selectedField.options?.join('\n') || ''}
                          onChange={(e) => updateSelectedField({ options: e.target.value.split('\n') })}
                          className="input-base text-sm w-full py-1.5 min-h-[100px] font-mono text-xs" 
                        />
                      </div>
                      
                      <label className="flex items-center gap-3 cursor-pointer pt-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-border-default text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm font-medium text-text-primary">Allow Multi-Select</span>
                      </label>
                    </div>
                  )}

                  {/* Layout */}
                  {selectedField.type !== 'Divider' && selectedField.type !== 'Heading' && selectedField.type !== 'Section' && (
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-default pb-1.5 flex items-center justify-between">
                      Layout <ChevronDown size={12}/>
                    </h3>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-text-primary">Field Width</label>
                      <select 
                        value={selectedField.width} 
                        onChange={(e) => updateSelectedField({ width: e.target.value as any })}
                        className="input-base text-sm w-full py-1.5"
                      >
                        <option value="Full Width">Full Width (100%)</option>
                        <option value="Half Width">Half Width (50%)</option>
                        <option value="Two Third">Two Third (66%)</option>
                        <option value="One Third">One Third (33%)</option>
                      </select>
                    </div>
                  </div>
                  )}

                  {/* Conditions */}
                  {selectedField.type !== 'Divider' && selectedField.type !== 'Heading' && selectedField.type !== 'Section' && (
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-default pb-1.5 flex items-center justify-between">
                      Conditions <ChevronDown size={12}/>
                    </h3>
                    <Button variant="outline" size="sm" className="w-full text-xs border-dashed border-border-strong hover:border-brand-500 hover:text-brand-600 transition-colors">
                      + Add Visibility Rule
                    </Button>
                  </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-text-muted opacity-60">
                  <Settings2 size={32} className="mb-3 opacity-50" />
                  <p className="text-sm text-center font-medium">Select a field on the canvas<br/>to edit its properties</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showSaveTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-bg-surface rounded-xl shadow-xl w-full max-w-md border border-border-default overflow-hidden">
            <div className="px-6 py-4 border-b border-border-default flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary">Save as Template</h2>
              <button onClick={() => setShowSaveTemplateModal(false)} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Template Name</label>
                <input 
                  type="text" 
                  value={templateName}
                  onChange={e => setTemplateName(e.target.value)}
                  className="input-base w-full"
                  placeholder="e.g. Employee Onboarding Form"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-bg-page border-t border-border-default flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSaveTemplateModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveTemplate}>Save Template</Button>
            </div>
          </div>
        </div>
      )}

      {showImportTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface rounded-xl shadow-xl w-full max-w-2xl border border-border-default overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-6 py-4 border-b border-border-default flex items-center justify-between shrink-0">
              <h2 className="text-lg font-bold text-text-primary">Import Template</h2>
              <button onClick={() => setShowImportTemplateModal(false)} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 border-b border-border-default shrink-0">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search templates..." 
                  value={templateSearchQuery}
                  onChange={(e) => setTemplateSearchQuery(e.target.value)}
                  className="input-base w-full pl-9"
                />
              </div>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTemplates.filter(t => t.name.toLowerCase().includes(templateSearchQuery.toLowerCase())).map((template) => (
                  <div key={template.id} className="border border-border-default rounded-lg p-4 hover:border-brand-500 transition-colors bg-bg-page/50 flex flex-col justify-between h-32 group">
                    <div>
                      <h3 className="text-sm font-bold text-text-primary mb-1 line-clamp-1">{template.name}</h3>
                      <p className="text-xs text-text-secondary">{template.fields} Fields</p>
                    </div>
                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="primary" size="sm" onClick={() => handleImportTemplate(template.id)}>Use</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
