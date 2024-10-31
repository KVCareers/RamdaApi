import { Comments } from "./comments.model.js";

export interface Links {
    self:            Comments;
    html:            Comments;
    issue:           Comments;
    comments:        Comments;
    review_comments: Comments;
    review_comment:  Comments;
    commits:         Comments;
    statuses:        Comments;
}
