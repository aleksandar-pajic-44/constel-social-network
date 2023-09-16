import axiosInstance from "@/app/utils/axios";
import { Account, LoginCredentials } from "../models/login";

// Login POST request
export const loginUser = async (loginCredentials: LoginCredentials) => {
  const response = await axiosInstance.post('/login', loginCredentials);
  return response;
};

// Check if user is logged in
export const isUserLoggedIn = async(): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/accounts/me');
    return !!response.data.account;
  } catch (error: any) {
    return false;
  }
};