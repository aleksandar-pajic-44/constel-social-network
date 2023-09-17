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

export interface PostComment {
  comment_id: string;
  text: string;
  created_at: string;
  username: string;
  full_name: string;
  picture: string;
}
