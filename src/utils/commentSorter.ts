import { Comment } from "../types";

export default function CommentSorter(comments: Comment[]): Comment[] {
    return comments.slice().sort((a: Comment, b: Comment) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
