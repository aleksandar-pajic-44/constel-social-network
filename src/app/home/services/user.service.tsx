import axiosInstance from "@/app/utils/axios";

import { Post, PostComment } from "../models/post";
import { Account } from "@/app/login/models/login";

/**
 * Get user account details.
 * @returns {Promise<any>} User account details.
**/
export const getUserDetails = async (): Promise<Account>  => {
  const response = await axiosInstance.get('/accounts/me');
  return response.data.account;
};

/**
 * Get all posts.
 * @returns {Promise<Post[]>} List of posts.
**/
export const getFeedPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get('/posts');
    return response.data.posts;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Like or unlike a post depending on the current isLiked state.
 * @param {string} postId - ID of the post.
 * @param {boolean} isLiked - Current like status.
 * @returns {Promise<void>} A promise indicating success or failure.
**/
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

/**
 * Get comments for a specific post.
 * @param {string} postId - ID of the post.
 * @returns {Promise<PostComment[]>} List of comments.
**/
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

/**
 * Create a new comment on a post.
 * @param {string} postId - ID of the post.
 * @param {string} text - Comment text.
 * @returns {Promise<void>} A promise indicating success or failure.
**/
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

/**
 * Delete a specific comment.
 * @param {string} postId - ID of the post.
 * @param {string} commentId - ID of the comment to delete.
 * @returns {Promise<void>} A promise indicating success or failure.
**/
export const deletePostComment = async (postId: string, commentId: string): Promise<void> => {
  const endpoint = `/post/${postId}/comments/${commentId}`;

  try {
    const response = await axiosInstance.delete(endpoint);

    if (response.status === 200 && response.data.status === 'ok') {
      // Comment deletion was successful
      return;
    } else if (response.status === 400 && response.data.status === 'error') {
      throw new Error(response.data.error.message);
    } else {
      throw new Error("Failed to delete the comment");
    }
  } catch (error: any) {
    throw error;
  }
};