export class CreatePostDto {
  authorId: number;
  title: string;
  content: string;
  imageUrl?: string;
  metroArea?: string; // "vancouver-bc"
}
