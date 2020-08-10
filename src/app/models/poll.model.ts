export interface Poll {
    id?: string;
    author: string;
    question: string;
    answers: string[];
    results: number[];
    users: string[];
}