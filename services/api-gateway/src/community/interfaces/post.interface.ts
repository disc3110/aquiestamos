export interface Post {
  id: number;
  authorId: number;
  title: string;
  content: string;
  imageUrl?: string;
  metroArea?: string;
}
