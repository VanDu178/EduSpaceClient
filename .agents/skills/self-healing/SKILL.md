---
name: Self-Healing & Automated Testing
description: Tự động chạy lệnh kiểm thử và tự sửa lỗi khi terminal báo lỗi mà không làm phiền người dùng.
---

# Self-Healing & Automated Testing (Tự động gỡ lỗi)

- Bản chất: Giúp Agent tự chạy thử nghiệm và tự sửa lỗi mà không cần làm phiền người dùng.
- Quy tắc thực thi:
  1. Sau khi chỉnh sửa hoặc tạo mới mã nguồn, Agent PHẢI tự động chạy lệnh kiểm thử phù hợp với framework của thư mục đó (ví dụ: `npm run test` hoặc lệnh test tương đương).
  2. Nếu terminal trả về mã lỗi hoặc test fail, Agent không được dừng lại hỏi người dùng. Agent phải tự đọc log lỗi, phân tích nguyên nhân, chỉnh sửa lại mã nguồn và chạy lại lệnh kiểm thử (tối đa 3 lần thử lại) cho đến khi pass.
