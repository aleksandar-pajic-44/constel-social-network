import axiosInstance from "@/app/utils/axios";

// Get user account details
export const getUserDetails = async (): Promise<any>  => {
  const response = await axiosInstance.get('/accounts/me');
  return response.data.account;
};