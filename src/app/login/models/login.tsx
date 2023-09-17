export interface LoginCredentials {
  email: string;
  password: string;
};

export interface LoginResponse {
  status: string;
  token: string;
};

export interface Account {
  username: string;
  email: string;
  full_name: string;
  picture: string;
}

export enum LOGIN_STATUS {
  INVALID_CREDENTIALS = 400,
};