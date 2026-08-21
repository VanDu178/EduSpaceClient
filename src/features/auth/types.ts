export interface User {
  id: number;
  email: string;
  name?: string | null;
  role: 'admin' | 'client';
  status: 'active' | 'locked';
  avatarUrl?: string | null;
  googleId?: string | null;
  provider?: 'credentials' | 'google' | string;
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

export interface GoogleLoginDTO {
  idToken?: string;
  accessToken?: string;
}


export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
}


