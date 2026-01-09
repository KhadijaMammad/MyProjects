import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style'; 
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Bold, Italic, List, Heading1, Heading2, 
  Image as ImageIcon, Download 
} from 'lucide-react';
import { toast } from 'react-toastify';
import type { NoteEditorProps } from '../../../types/notes/note';

// Menubar hissəsini sadələşdirdik və lazımsız Save düyməsini sildik 
// (Çünki Save artıq NotesPage-dədir)
interface MenuBarProps {
  editor: Editor | null;
  onExportPDF: () => Promise<void>;
  onImageUpload: () => void;
}

const MenuBar = ({ editor, onExportPDF, onImageUpload }: MenuBarProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50/50">
      <button 
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-white shadow-sm text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`}
      >
        <Bold size={18} />
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-white shadow-sm text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`}
      >
        <Italic size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-white shadow-sm text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`}
      >
        <Heading1 size={18} />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-white shadow-sm text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`}
      >
        <Heading2 size={18} />
      </button>
      
      <input
        type="color"
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => 
            editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes('textStyle').color || '#000000'}
        className="w-8 h-8 cursor-pointer rounded border-none bg-transparent"
      />

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-white shadow-sm text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`}
      >
        <List size={18} />
      </button>

      <button onClick={onImageUpload} className="p-2 rounded-lg hover:bg-gray-200 text-gray-500">
        <ImageIcon size={18} />
      </button>
      
      <button onClick={onExportPDF} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 ml-auto flex items-center gap-1">
        <Download size={16} /> <span className="text-[10px] font-bold">PDF</span>
      </button>
    </div>
  );
};

const NoteEditor: React.FC<NoteEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      // Redaktorda nəsə yazanda NotesPage-dəki description-u yeniləyir
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  // BU HİSSƏ ÇOX VACİBDİR: 
  // Siyahıdan başqa nota keçəndə editorun içindəki köhnə mətnin silinib yenisi ilə əvəz olunmasını təmin edir.
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const exportPDF = useCallback(async () => {
    const element = document.querySelector('.tiptap') as HTMLElement;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("qeyd.pdf");
      toast.success("PDF yükləndi!");
    } catch (err) {
      toast.error("PDF yaradılarkən xəta baş verdi");
    }
  }, []);

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result === 'string') {
            editor?.chain().focus().setImage({ src: result }).run();
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <MenuBar editor={editor} onExportPDF={exportPDF} onImageUpload={addImage} />
      <div className="flex-1 overflow-y-auto bg-white custom-editor-area">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default NoteEditor;