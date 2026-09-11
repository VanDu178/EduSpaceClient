import { useMutation } from "@tanstack/react-query";
import {
  registerApi,
  loginApi,
  googleLoginApi,
  forgotPasswordApi,
  resetPasswordApi,
  changePasswordApi,
} from "../services/authService";
import {
  RegisterDTO,
  LoginDTO,
  GoogleLoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  ChangePasswordDTO,
} from "../types";
import { message } from 'antd';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterDTO) => registerApi(data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginDTO) => loginApi(data),
  });
};

export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationFn: (data: GoogleLoginDTO) => googleLoginApi(data),
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordDTO) => forgotPasswordApi(data),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordDTO) => resetPasswordApi(data),
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordDTO) => changePasswordApi(data),
    onSuccess: (res) => {
      message.success(res?.message || 'Đổi mật khẩu thành công!');
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message || error?.message || 'Đổi mật khẩu thất bại!';
      message.error(errorMsg);
    },
  });
};
