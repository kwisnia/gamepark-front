import { DiscussionPost, GameDiscussion } from "./discussion";
import { UserReview } from "./review";
import { BasicUserDetails } from "./user";

export enum ActivityType {
  NewReview = "new_review",
  NewPost = "new_post",
  NewDiscussion = "new_discussion",
}

export interface ReviewActivity {
  type: ActivityType.NewReview;
  user: BasicUserDetails;
  data: {
    review: UserReview;
  };
  createdAt: string;
}

export interface PostActivity {
  type: ActivityType.NewPost;
  user: BasicUserDetails;
  data: {
    post: DiscussionPost;
    discussion: GameDiscussion;
  };
  createdAt: string;
}

export interface DiscussionActivity {
  type: ActivityType.NewDiscussion;
  user: BasicUserDetails;
  data: {
    discussion: GameDiscussion;
  };
  createdAt: string; 
}

export type UserActivity = ReviewActivity | PostActivity | DiscussionActivity;
