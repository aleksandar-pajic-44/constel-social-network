import axiosInstance from "@/app/utils/axios";
import { Account, LoginCredentials } from "../models/login";

export const loginUser = async (loginCredentials: LoginCredentials) => {
  const response = await axiosInstance.post('/login', loginCredentials);
  return response;
};

export const getUserDetails = async (): Promise<Account>  => {
  const response = await axiosInstance.get('/accounts/me');
  return response.data.account;
};

export const isUserLoggedIn = async(): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/accounts/me');
    return !!response.data.account;
  } catch (error: any) {
    return false;
  }
};