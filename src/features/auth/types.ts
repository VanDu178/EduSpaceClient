export interface User {
  id: number;
  email: string;
  name?: string | null;
  role: 'admin' | 'client';
  status: 'active' | 'locked';
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
}
