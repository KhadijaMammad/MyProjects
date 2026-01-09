export interface Note {
    id: number;
    userId: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    folderId?: number;
    isPinned: boolean;
    isFavorite: boolean;
    isDeleted: boolean;
    imageUrl?: string;
}

export interface NoteEditorProps {
  content: string;
  onChange: (html: string) => void;
}