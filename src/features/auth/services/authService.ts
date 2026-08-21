import api from '@/core/services/api';
import { RegisterDTO, LoginDTO, GoogleLoginDTO, AuthResponse, User } from '../types';

export const registerApi = async (data: RegisterDTO): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data.data;
};

export const loginApi = async (data: LoginDTO): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data.data;
};

export const googleLoginApi = async (data: GoogleLoginDTO): Promise<AuthResponse> => {
  const response = await api.post('/auth/google', data);
  return response.data.data;
};


export const getMeApi = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data.data.user;
};

export const refreshTokenApi = async (): Promise<AuthResponse> => {
  const response = await api.post('/auth/refresh', {}, { withCredentials: true });
  return response.data.data;
};

export const logoutApi = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    // Suppress logout errors
  }
};
