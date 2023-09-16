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