import React, { useState } from 'react';
import { MessageSquare, Lock, Paperclip, MoreHorizontal, CornerDownRight, Video, Info, User, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { RichTextEditor } from '../ui/RichTextEditor';

export interface CommentType {
  id: string;
  sender: string;
  role?: string;
  type: 'internal' | 'public' | 'system' | 'customer';
  content: string;
  time: string;
  parentId?: string | null;
  replies?: CommentType[];
  attachments?: any[];
  emailDetails?: {
    to?: string;
    cc?: string;
    bcc?: string;
    subject?: string;
  };
  isAgent?: boolean;
}

interface CommentThreadProps {
  comments: CommentType[];
  onReply: (parentId: string, content: string) => void;
  onEdit?: (id: string, content: string) => void;
  onDelete?: (id: string) => void;
  currentUser?: string;
}

export function CommentThread({ comments, onReply, onEdit, onDelete, currentUser = 'Support Agent' }: CommentThreadProps) {
  // Transform flat list to tree with STRICTLY ONE LEVEL OF NESTING
  const buildTree = (flatComments: CommentType[]): CommentType[] => {
    const rootComments: CommentType[] = [];
    const rootMap = new Map<string, CommentType>();

    // Pass 1: Identify all root comments (parentId is null or undefined)
    flatComments.forEach(c => {
      if (!c.parentId) {
        const rootNode: CommentType = { ...c, replies: [] };
        rootComments.push(rootNode);
        rootMap.set(c.id, rootNode);
      }
    });

    // Pass 2: Attach replies strictly to their root ancestor (max 1 level depth)
    flatComments.forEach(c => {
      if (c.parentId) {
        let targetRoot = rootMap.get(c.parentId);

        // If parent is not a direct root, trace back to find the root ancestor
        if (!targetRoot) {
          let currentParentId: string | null | undefined = c.parentId;
          let depth = 0;
          while (currentParentId && depth < 10) {
            depth++;
            const parentComment = flatComments.find(p => p.id === currentParentId);
            if (parentComment) {
              if (rootMap.has(parentComment.id)) {
                targetRoot = rootMap.get(parentComment.id);
                break;
              }
              currentParentId = parentComment.parentId;
            } else {
              break;
            }
          }
        }

        if (targetRoot) {
          targetRoot.replies = targetRoot.replies || [];
          if (!targetRoot.replies.some(r => r.id === c.id)) {
            targetRoot.replies.push({ ...c, parentId: targetRoot.id });
          }
        } else {
          // If no root could be found, treat this comment as a root comment
          const fallbackRoot: CommentType = { ...c, parentId: null, replies: [] };
          rootComments.push(fallbackRoot);
          rootMap.set(c.id, fallbackRoot);
        }
      }
    });

    return rootComments;
  };

  const tree = buildTree(comments);

  if (tree.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-bg-surface-hover rounded-full flex items-center justify-center mb-4">
          <MessageSquare size={24} className="text-text-muted" />
        </div>
        <h3 className="text-base font-bold text-text-primary">No comments yet</h3>
        <p className="text-[13px] text-text-secondary mt-1 max-w-[250px]">Start the conversation by adding a comment or note.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {tree.map(comment => (
        <RootCommentThread 
          key={comment.id} 
          comment={comment} 
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

interface RootCommentThreadProps {
  comment: CommentType;
  onReply: (parentId: string, content: string) => void;
  onEdit?: (id: string, content: string) => void;
  onDelete?: (id: string) => void;
  currentUser: string;
}

function RootCommentThread({ comment, onReply, onEdit, onDelete, currentUser }: RootCommentThreadProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const replies = comment.replies || [];
  const hasReplies = replies.length > 0;

  const handleReplySubmit = () => {
    if (!replyContent.trim() && replyContent !== '<p></p>') return;
    onReply(comment.id, replyContent);
    setIsReplying(false);
    setReplyContent('');
    setIsExpanded(true);
  };

  const handleReplyToSpecificUser = (targetUser: string) => {
    setIsReplying(true);
    setIsExpanded(true);
    setReplyContent(`<p><span data-type="mention" class="mention" data-id="${targetUser}">@${targetUser}</span> </p>`);
  };

  return (
    <div className="flex flex-col relative">
      {/* 1. Root Comment Card */}
      <CommentCard 
        comment={comment} 
        isReply={false}
        currentUser={currentUser}
        onStartReply={() => {
          setIsReplying(true);
          setIsExpanded(true);
        }}
      />

      {/* Thread Controls & Branching Area */}
      {(hasReplies || isReplying) && (
        <div className="relative ml-5 sm:ml-6 mt-2 flex flex-col">
          {/* Main Continuous Branch Line (Spine) connecting Parent to all Children */}
          {/* Positioned at x = 0 (which aligns directly below parent avatar center at left-6) */}
          <div 
            className="absolute left-0 top-0 bottom-6 w-[2px] bg-slate-300 dark:bg-slate-600 pointer-events-none transition-colors"
          />

          {/* Toggle Replies Header */}
          {hasReplies && (
            <div className="relative pl-7 py-1.5 flex items-center z-10">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all"
              >
                <MessageSquare size={13} className="text-brand-500" />
                <span>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>
                {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
            </div>
          )}

          {/* Expanded Replies (Single Level Nesting Only) */}
          {isExpanded && hasReplies && (
            <div className="flex flex-col gap-3 mt-1">
              {replies.map((reply, idx) => {
                const isLast = idx === replies.length - 1 && !isReplying;
                return (
                  <div key={reply.id} className="relative flex flex-col">
                    {/* Branching Elbow SVG: Visible curved connection from spine to reply */}
                    <div className="absolute left-0 top-0 w-7 h-8 pointer-events-none text-slate-300 dark:text-slate-600 z-0">
                      <svg className="w-full h-full" fill="none" viewBox="0 0 28 32">
                        {/* If not last, draw vertical continuation line */}
                        {!isLast && <line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="2" />}
                        {/* Curve branching smoothly into child */}
                        <path 
                          d="M 1 0 V 16 Q 1 24 9 24 H 28" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          fill="none" 
                        />
                      </svg>
                    </div>

                    {/* Reply Card Container (indented past elbow) */}
                    <div className="pl-7 sm:pl-8 relative z-10">
                      <CommentCard 
                        comment={reply} 
                        isReply={true}
                        currentUser={currentUser}
                        onStartReply={() => handleReplyToSpecificUser(reply.sender)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Reply Composer Connected to the Branch Spine */}
          {isReplying && (
            <div className="relative flex flex-col mt-3">
              {/* Elbow into Composer */}
              <div className="absolute left-0 top-0 w-7 h-8 pointer-events-none text-slate-300 dark:text-slate-600 z-0">
                <svg className="w-full h-full" fill="none" viewBox="0 0 28 32">
                  <path 
                    d="M 1 0 V 16 Q 1 24 9 24 H 28" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                </svg>
              </div>

              {/* Composer Box */}
              <div className="pl-7 sm:pl-8 relative z-10">
                <div className="bg-bg-surface border-2 border-brand-500/50 rounded-xl overflow-hidden shadow-md">
                  <div className="px-4 py-2 bg-brand-50 dark:bg-brand-950/40 border-b border-brand-200 dark:border-brand-900/60 text-[12px] font-bold text-brand-800 dark:text-brand-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CornerDownRight size={14} className="text-brand-600 dark:text-brand-400" />
                      Replying to thread
                    </span>
                    <button 
                      onClick={() => { setIsReplying(false); setReplyContent(''); }}
                      className="text-text-muted hover:text-text-primary text-[11px] font-semibold"
                    >
                      Dismiss
                    </button>
                  </div>

                  <RichTextEditor 
                    content={replyContent} 
                    onChange={setReplyContent} 
                    placeholder="Write your response... Use @ to mention team members."
                    minHeight="100px"
                    className="border-none ring-0 shadow-none focus-within:ring-0 focus-within:shadow-none bg-transparent p-3"
                  />

                  <div className="flex items-center justify-between p-3 bg-bg-surface border-t border-border-default">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" icon={Paperclip} className="text-text-secondary h-8 px-2.5 text-[12px]">
                        Attach file
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-bold h-8 text-[13px]" 
                        onClick={() => { setIsReplying(false); setReplyContent(''); }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="font-bold h-8 text-[13px] px-4 shadow-sm" 
                        onClick={handleReplySubmit} 
                        disabled={!replyContent.trim() && replyContent !== '<p></p>'}
                      >
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface CommentCardProps {
  comment: CommentType;
  isReply: boolean;
  currentUser: string;
  onStartReply: () => void;
}

function CommentCard({ comment, isReply, currentUser, onStartReply }: CommentCardProps) {
  const isInternal = comment.type === 'internal';
  const isSystem = comment.type === 'system';
  const isCustomer = comment.type === 'customer';
  const isPublic = comment.type === 'public';

  // Card theme styling
  const cardStyle = isInternal
    ? 'bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700/60 shadow-sm'
    : isSystem
    ? 'bg-slate-100/80 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 shadow-none'
    : isCustomer
    ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 transition-colors'
    : 'bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-sm';

  return (
    <div className={`rounded-xl p-4 transition-all duration-150 ${cardStyle}`}>
      {/* If internal note, show clear banner */}
      {isInternal && (
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-200 dark:border-amber-800/40">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-amber-500 text-white shadow-2xs">
            <Lock size={11} /> Internal Note
          </span>
          <span className="text-[11px] font-medium text-amber-800 dark:text-amber-300">
            Visible only to agents & staff
          </span>
        </div>
      )}

      <div className="flex gap-3 sm:gap-4 items-start">
        {/* Avatar */}
        <div className={`shrink-0 flex items-center justify-center rounded-full font-bold text-[13px] shadow-sm
          ${isInternal ? 'w-9 h-9 bg-amber-500 text-white' : 
            isSystem ? 'w-8 h-8 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' :
            isCustomer ? 'w-9 h-9 bg-emerald-600 text-white' :
            'w-9 h-9 bg-indigo-600 text-white'}
        `}>
          {isInternal ? <Lock size={15} /> : 
           isSystem ? <Info size={15} /> : 
           isCustomer ? <User size={15} /> : 
           comment.sender ? comment.sender.charAt(0).toUpperCase() : <Shield size={15} />}
        </div>

        {/* Content Container */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-bold text-[14px] ${isSystem ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}>
                {comment.sender}
              </span>

              {/* Single clean distinct role/type badge */}
              {isCustomer && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Customer
                </span>
              )}
              {isPublic && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Support
                </span>
              )}
              {isSystem && (
                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  System
                </span>
              )}

              {/* Sub-role if present and different */}
              {comment.role && comment.role.toLowerCase() !== 'customer' && comment.role.toLowerCase() !== 'support' && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  • {comment.role}
                </span>
              )}

              {/* Timestamp */}
              <span className="text-[12px] text-slate-500 dark:text-slate-400 font-mono ml-1">
                {comment.time}
              </span>
            </div>

            {/* Hover Actions */}
            <div className="flex items-center gap-1">
              {currentUser === comment.sender && (
                <button className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <MoreHorizontal size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Email Header Details if present */}
          {comment.emailDetails && (
            <div className="mt-2 mb-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              {comment.emailDetails.to && (
                <div className="flex items-baseline gap-2">
                  <span className="w-12 text-slate-400 font-bold uppercase text-[10px] tracking-wider shrink-0">To:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{comment.emailDetails.to}</span>
                </div>
              )}
              {comment.emailDetails.cc && (
                <div className="flex items-baseline gap-2">
                  <span className="w-12 text-slate-400 font-bold uppercase text-[10px] tracking-wider shrink-0">CC:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{comment.emailDetails.cc}</span>
                </div>
              )}
              {comment.emailDetails.subject && (
                <div className="flex items-baseline gap-2">
                  <span className="w-12 text-slate-400 font-bold uppercase text-[10px] tracking-wider shrink-0">Subject:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{comment.emailDetails.subject}</span>
                </div>
              )}
            </div>
          )}

          {/* Body Content */}
          <div 
            className={`text-[13.5px] leading-relaxed whitespace-pre-wrap mt-1 ${isSystem ? 'text-slate-600 dark:text-slate-400 italic' : 'text-slate-900 dark:text-slate-100 font-medium'} prose prose-sm max-w-none`} 
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />

          {/* Attachments if present */}
          {comment.attachments && comment.attachments.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {comment.attachments.map((att: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-[12px] cursor-pointer hover:border-slate-400 transition-colors shadow-2xs">
                  <Paperclip size={12} className="text-slate-400" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">{att.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">{att.size}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Row */}
          {!isSystem && (
            <div className="flex items-center gap-4 mt-3 pt-1">
              <button 
                onClick={onStartReply}
                className="text-[12px] font-bold text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2"
              >
                <CornerDownRight size={14} className="text-slate-400" /> 
                {isReply ? 'Reply to thread' : 'Reply'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
