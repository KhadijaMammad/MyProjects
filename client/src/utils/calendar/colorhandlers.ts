import { CALENDAR_COLORS } from '../../types/calendar/calendar';

export const getEventColorById = (id: string | number) => {
  const idStr = String(id);
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CALENDAR_COLORS.length;
  return CALENDAR_COLORS[index];
};