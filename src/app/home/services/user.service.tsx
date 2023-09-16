import axiosInstance from "@/app/utils/axios";
import { Post } from "../models/post";

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

// Like a post
export const likePost = async (postId: string): Promise<void> => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/like`);
    if (response.status === 200 && response.data.status === "ok") {
      // Like was successful
      return;
    } else {
      throw new Error("Failed to like the post");
    }
  } catch (error: any) {
    throw error;
  }
};

// Unlike a post
export const unlikePost = async (postId: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}/like`);
    if (response.status === 200 && response.data.status === "ok") {
      // Unlike was successful
      return;
    } else {
      throw new Error("Failed to unlike the post");
    }
  } catch (error: any) {
    throw error;
  }
};