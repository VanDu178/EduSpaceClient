import React from "react";
import styles from "./AboutHero.module.css";

export const AboutHero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Về Chúng Tôi</h1>
      <p className={styles.description}>
        EduSpace mang đến không gian học tập và kết nối giáo dục toàn diện, kiến
        tạo hành trình học tập thông minh và hiệu quả cho tương lai.
      </p>
    </section>
  );
};
