import { DateTime } from "luxon";

export const getTimeAgo = (date: string) => {
  const diff = DateTime.fromISO(date).diffNow().as("seconds") * -1;
  if (diff < 60) {
    return "Just now";
  }
  if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`;
  }
  if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`;
  }
  if (diff < 604800) {
    return `${Math.floor(diff / 86400)}d ago`;
  }
  if (diff < 2592000) {
    return `${Math.floor(diff / 604800)}w ago`;
  }
};
