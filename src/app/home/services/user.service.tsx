import axiosInstance from "@/app/utils/axios";
import { Post, PostComment } from "../models/post";

// Get user account details
export const getUserDetails = async (): Promise<any>  => {
  const response = await axiosInstance.get('/accounts/me');
  return response.data.account;
};

// Get all posts
export const getFeedPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get('/posts');
    return response.data.posts;
  } catch (error: any) {
    throw error;
  }
};

// Like or unlike post depending on current isLiked state
export const likeOrUnlikePost = async (postId: string, isLiked: boolean): Promise<void> => {
  const endpoint = `/posts/${postId}/like`;

  try {
    const response = await axiosInstance[isLiked ? 'delete' : 'post'](endpoint);

    if (response.status === 200 && response.data.status === 'ok') {
      // Action (like or unlike) was successful
      return;
    } else {
      throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} the post`);
    }
  } catch (error: any) {
    throw error;
  }
};

// Get comments for a specific post
export const getCommentsForPost = async (postId: string): Promise<PostComment[]> => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}/comments`);

    if (response.status === 200 && response.data.status === "ok") {
      return response.data.comments;
    } else {
      throw new Error("Failed to retrieve comments for the post");
    }
  } catch (error: any) {
    throw error;
  }
};

// Create a new comment on a post
export const createPostComment = async (postId: string, text: string): Promise<void> => {
  const endpoint = `/posts/${postId}/comments`;

  try {
    const response = await axiosInstance.post(endpoint, {
      text: text,
    });

    if (response.status === 200 && response.data.status === 'ok') {
      // Comment creation was successful
      return;
    } else {
      throw new Error("Failed to create a new comment for the post");
    }
  } catch (error: any) {
    throw error;
  }
};