export interface Folder{
    id: number;
    name: string;
    userId: number;
    isPinned: boolean;
    createdAt: Date;
    updatedAt: Date;
    notesCount?: number;
}

export interface CreateFolderDTO{
    name: string;
}

export interface UpdateFolderRequest {
  id: number;
  name: string;
}

export type ActiveFilter = 'all' | 'fav' | 'trash' | 'pinned' | string; 