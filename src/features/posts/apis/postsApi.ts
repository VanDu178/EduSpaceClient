import api from "@/services/api";
import { Post } from "../types";

export const postsApi = {
  // Lấy danh sách bài viết
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get("/posts");
    return response.data;
  },

  // Lấy chi tiết bài viết
  getPostById: async (id: string): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Like bài viết
  likePost: async (id: string): Promise<{ likes: number }> => {
    const response = await api.post(`/posts/${id}/like`);
    return response.data;
  },
};
