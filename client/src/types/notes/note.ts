export interface Note {
    id: number;
    userId: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NoteEditorProps {
  content: string;
  onChange: (html: string) => void;
}