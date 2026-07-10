import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyId({ id, type = 'ticket', className = '' }: { id: string, type?: 'ticket' | 'task' | 'jira', className?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const baseUrl = window.location.origin;
        let path = '/ticket_details';
        if (type === 'task') path = '/task_details';
        if (type === 'jira') path = '/ticket_history';
        
        const url = `${baseUrl}${path}?id=${id}`;
        
        try {
            navigator.clipboard.writeText(url);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`inline-flex items-center gap-1 group/copy ${className}`}>
            <span className="font-mono font-medium text-text-primary group-hover:underline">{id}</span>
            <button 
                onClick={handleCopy}
                className="opacity-0 group-hover/copy:opacity-100 transition-opacity text-text-muted hover:text-text-primary"
                title="Copy Link"
            >
                {copied ? <Check size={14} className="text-success-text" /> : <Copy size={14} />}
            </button>
        </div>
    );
}
