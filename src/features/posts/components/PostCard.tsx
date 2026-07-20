import React from "react";
import styles from "./PostCard.module.css";
import { Post } from "../types";

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <span className={styles.category}>{post.category}</span>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.footer}>
          <span>EduSpace Editor</span>
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  );
};
