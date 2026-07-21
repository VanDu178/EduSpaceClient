---
name: Architecture-First Scanning
description: Quét cấu trúc dự án EduSpaceBE và EduSpaceFE trước khi viết code để định vị đúng file và tuân thủ design pattern.
---

# Architecture-First Scanning (Quét kiến trúc & Chống đoán mò)

- Bản chất: Ép Agent phải luôn làm việc dựa trên thực tế cấu trúc codebase có sẵn, chấm dứt việc tự bịa file.
- Quy tắc thực thi:
  1. Khi nhận một yêu cầu tính năng mới, Agent không được viết code ngay. Trước tiên, Agent phải dùng công cụ quét cấu trúc thư mục của cả `./EduSpaceBE/` và `./EduSpaceFE/` để định vị đúng các file liên quan.
  2. Agent phải ưu tiên đọc các file hướng dẫn cốt lõi như `README.md` hoặc `ARCHITECTURE.md` (nếu có) trong từng thư mục để hiểu rõ design pattern đang dùng (ví dụ: MVC, Clean Architecture, Repository Pattern) trước khi đề xuất giải pháp.
