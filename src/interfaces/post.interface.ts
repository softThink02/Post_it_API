export interface IPostit {
    creator: string;
    title: string;
    description: string;
    hashtags: string[],
    thumbnail: string
    mentions: string[]
}