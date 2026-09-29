import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Minus, Link as LinkIcon, RemoveFormatting,
  Heading1, Heading2, Heading3
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const ToolbarButton = ({ onClick, isActive, disabled, children, title }: any) => (
    <button
      onClick={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        isActive ? 'bg-bg-surface-hover text-text-primary shadow-sm' : ''
      }`}
    >
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-5 bg-border-default mx-1"></div>;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border-default bg-bg-surface rounded-t-md sticky top-0 z-10">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline">
        <UnderlineIcon size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title="Code">
        <Code size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Clear Formatting">
        <RemoveFormatting size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1">
        <Heading1 size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3">
        <Heading3 size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setParagraph().run()} isActive={editor.isActive('paragraph')} title="Paragraph">
        <span className="font-serif font-bold text-sm leading-none px-1">P</span>
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Ordered List">
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Blockquote">
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
        <Minus size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left">
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center">
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right">
        <AlignRight size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justify">
        <AlignJustify size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={toggleLink} isActive={editor.isActive('link')} title="Insert Link">
        <LinkIcon size={16} />
      </ToolbarButton>
    </div>
  );
};

export function RichTextEditor({ content, onChange, placeholder = 'Type here...', className = '', minHeight = 'min-h-[140px]' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }) as any,
      Underline as any,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }) as any,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand-500 underline hover:text-brand-600 cursor-pointer',
        },
      }) as any,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }) as any,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none w-full p-4 ${minHeight} ${className.includes("text-") ? "" : "text-text-primary"}`,
      },
    },
  });

  
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className={`border rounded-md overflow-hidden flex flex-col ${className || "border-border-default bg-bg-page focus-within:border-border-focus focus-within:ring-1 focus-within:ring-border-focus"}`}>
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <EditorContent editor={editor} className="h-full" />
      </div>
      <style>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 { font-size: 1.5em; font-weight: 600; margin-top: 1em; margin-bottom: 0.5em; }
        .ProseMirror h2 { font-size: 1.25em; font-weight: 600; margin-top: 1em; margin-bottom: 0.5em; }
        .ProseMirror h3 { font-size: 1.125em; font-weight: 600; margin-top: 1em; margin-bottom: 0.5em; }
        .ProseMirror p { margin-bottom: 0.5em; }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 0.5em; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 0.5em; }
        .ProseMirror blockquote { border-left: 3px solid #e5e7eb; padding-left: 1em; margin-left: 0; font-style: italic; color: #6b7280; }
        .ProseMirror code { background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.875em; font-family: monospace; }
        .ProseMirror pre { background-color: #f3f4f6; padding: 1em; border-radius: 4px; overflow-x: auto; font-family: monospace; }
        .ProseMirror hr { border: none; border-top: 1px solid #e5e7eb; margin: 1em 0; }
      `}</style>
    </div>
  );
}
