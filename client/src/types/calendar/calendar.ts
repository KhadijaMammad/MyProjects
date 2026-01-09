export interface GoogleDateTime {
  dateTime: string;
  timeZone: string;
}

export interface AICalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: GoogleDateTime;
  end: GoogleDateTime;
  htmlLink?: string;
  creator?: {
    email: string;
    self: boolean;
  };
  organizer?: {
    email: string;
    self: boolean;
  };
  updated?: string;
  created?: string;
  etag?: string;
}

export interface CalendarEventDB {
  id: number;
  google_event_id: string;
  user_id: number;
  summary: string;
  description: string;
  start_time: string;
  end_time: string;
  html_link: string;
  color?: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface AISyncPayload {
  action: "create" | "update" | "delete";
  data: Partial<AICalendarEvent>;
}

export const CALENDAR_COLORS = [
  "#039be5",
  "#7986cb",
  "#33b679",
  "#8e24aa",
  "#e67c73",
  "#f6bf26",
  "#f4511e",
  "#0b8043",
];

export const getEventColorById = (id: string | number) => {
  const idStr = String(id);
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CALENDAR_COLORS[Math.abs(hash) % CALENDAR_COLORS.length];
};
