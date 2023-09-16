export interface Author {
  username: string;
  full_name: string;
  picture: string;
}

export interface Post {
  post_id: string;
  user_id: string;
  text: string;
  image: string;
  audio: string;
  comments: number;
  likes: number;
  created_at: string;
  user: Author;
  liked: boolean;
}