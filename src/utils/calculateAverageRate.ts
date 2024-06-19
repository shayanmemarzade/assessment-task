import { Comment } from '../types/product'

export default function calculateAverageRate(comments: Comment[]): number {
    if (comments.length === 0) {
        return 0;
    }

    const totalRates = comments.reduce((sum: number, comment: Comment) => sum + comment.rate, 0);
    return +(totalRates / comments.length).toFixed(2);
}