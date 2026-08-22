import { useMutation } from "@tanstack/react-query";
import {
  registerApi,
  loginApi,
  googleLoginApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../services/authService";
import {
  RegisterDTO,
  LoginDTO,
  GoogleLoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from "../types";

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
