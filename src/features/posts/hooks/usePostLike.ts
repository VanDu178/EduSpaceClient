import { useState } from "react";
import { postsApi } from "../apis/postsApi";

export const usePostLike = (postId: string, initialLikes: number) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async () => {
    setIsLiking(true);
    setError(null);
    try {
      const result = await postsApi.likePost(postId);
      setLikes(result.likes);
    } catch (err: any) {
      setError(err?.message || "Không thể thích bài viết. Vui lòng thử lại!");
    } finally {
      setIsLiking(false);
    }
  };

  return {
    likes,
    isLiking,
    error,
    handleLike,
  };
};
