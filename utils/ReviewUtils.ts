import { GameCompletionStatus } from "../types/review";

export const getReadableCompletionStatus = (status: GameCompletionStatus) => {
  switch (status) {
    case GameCompletionStatus.MainStory:
      return "Completed main story";
    case GameCompletionStatus.MainPlusExtras:
      return "Completed main + extras";
    case GameCompletionStatus.Completionist:
      return "Completed 100%";
    case GameCompletionStatus.Dropped:
      return "Dropped";
  }
};
