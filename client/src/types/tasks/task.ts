export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
}

// 2. Statuslar üçün enum tipli union
export type TaskStatus = 'Open' | 'In Progress' | 'Done' | 'Archived' | 'Backlog' | 'Not Started';

// 3. Prioritetlər üçün enum tipli union
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

// 4. AI-dan gələn və ya Task yaratmaq üçün istifadə olunan Payload (Massiv formatında)
export interface CreateTaskPayload {
  Title: string;
  Desciption?: string; 
  Status?: string;
  Priority?: string;
  Deadline?: string;
}

// 5. API Response tipləri
export interface TaskResponse {
  message?: string;
  task?: Task;
  success?: boolean;
}