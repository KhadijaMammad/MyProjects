export interface CalendarEvent {
  id: number ;
  title: string;
  startTime: string;
}

export interface NewsItem {
  id: number | string;
  title: string;
  category?: string;
  createdAt: string;
}

export interface TaskItem {
  id: number | string;
  title: string;
  completed: boolean;
}

export interface DashboardData {
  calendar: CalendarEvent[];
  news: NewsItem[];
  tasks: TaskItem[];
}