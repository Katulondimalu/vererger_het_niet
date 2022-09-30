import { formatDistance } from 'date-fns';
import { sortBy } from 'lodash';

export const sortedRoomsByScore = (today_rooms) => {
  return sortBy(
    Object.values(today_rooms).filter((x) => x.total_time_spent_score != null),
    (x) => x.total_time_spent_score
  );
};

export const roomPosition = (rooms, id) => {
  let currentRoom = rooms.find((x) => x.id === id);
  let roomIndex = null;
  if (currentRoom) {
    roomIndex = rooms.indexOf(currentRoom) + 1;
  }
  return { currentRoom, roomIndex };
};

export const duration = (s) =>
  formatDistance(0, s * 1000, { includeSeconds: true });
