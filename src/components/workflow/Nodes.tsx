import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Play, SplitSquareHorizontal, RefreshCw, Send, Save, CheckSquare, Globe, Trash2 } from 'lucide-react';

const icons = {
  trigger: Play,
  condition: SplitSquareHorizontal,
  loop: RefreshCw,
  send_communication: Send,
  update_ticket: Save,
  create_task: CheckSquare,
  api_call: Globe
};

export const CustomNode = memo(({ id, data, type }: any) => {
  const Icon = icons[type as keyof typeof icons] || Globe;
  
  return (
    <div className="bg-bg-surface border border-border-default rounded-md shadow-sm min-w-[250px] overflow-hidden group">
      {type !== 'trigger' && (
        <Handle type="target" position={Position.Top} className="w-3 h-3 bg-brand-500 border-2 border-bg-surface" />
      )}
      
      <div className="p-3 border-b border-border-default bg-bg-page flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
            <Icon size={14} />
          </div>
          <div>
            <div className="font-semibold text-text-primary text-sm leading-tight">{data.label}</div>
            {data.sublabel && <div className="text-[10px] text-text-secondary mt-0.5">{data.sublabel}</div>}
          </div>
        </div>
        {type !== 'trigger' && (
          <button 
            onClick={(e) => { e.stopPropagation(); data.onDelete?.(id); }}
            className="p-1 text-text-muted hover:text-error-text hover:bg-error-bg rounded opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete node"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
      
      {/* Node specific handles based on data configuration */}
      {type === 'condition' ? (
        <div className="flex flex-col text-xs text-text-secondary">
          <div className="relative py-1.5 px-3 border-b border-border-subtle flex justify-end items-center">
            <span className="mr-4">True</span>
            <Handle type="source" position={Position.Right} id="true" className="w-3 h-3 bg-success-text border-2 border-bg-surface top-1/2 -translate-y-1/2 right-[-6px]" />
          </div>
          <div className="relative py-1.5 px-3 flex justify-end items-center">
            <span className="mr-4">False</span>
            <Handle type="source" position={Position.Right} id="false" className="w-3 h-3 bg-error-text border-2 border-bg-surface top-1/2 -translate-y-1/2 right-[-6px]" />
          </div>
        </div>
      ) : type === 'switch' ? (
        <div className="flex flex-col text-xs text-text-secondary">
          {data.config?.branches?.map((branch: any, i: number) => (
            <div key={i} className="relative py-1.5 px-3 border-b border-border-subtle flex justify-end items-center">
              <span className="mr-4">{branch.name}</span>
              <Handle type="source" position={Position.Right} id={`branch_${i}`} className="w-3 h-3 bg-brand-500 border-2 border-bg-surface top-1/2 -translate-y-1/2 right-[-6px]" />
            </div>
          ))}
          <div className="relative py-1.5 px-3 flex justify-end items-center bg-bg-page">
            <span className="mr-4">Default</span>
            <Handle type="source" position={Position.Right} id="default" className="w-3 h-3 bg-text-muted border-2 border-bg-surface top-1/2 -translate-y-1/2 right-[-6px]" />
          </div>
        </div>
      ) : (
        <div className="p-2 relative min-h-[10px]">
           <Handle type="source" position={Position.Bottom} id="default" className="w-3 h-3 bg-brand-500 border-2 border-bg-surface" />
           {/* Technical failure handle */}
           <Handle type="source" position={Position.Right} id="error" className="w-3 h-3 bg-error-text border-2 border-bg-surface top-1/2 -translate-y-1/2 right-[-6px]" />
        </div>
      )}
    </div>
  );
});
