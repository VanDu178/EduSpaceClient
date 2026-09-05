---
name: Agent Automation & Memory
description: Quy trình quét kiến trúc codebase, tự động gỡ lỗi testing và duy trì nhật ký phiên làm việc dài hạn cho Agent.
---

# Agent Automation & Memory

Tập hợp các quy tắc tự động hóa execution, testing và duy trì ngữ cảnh cho Agent.

---

## 1. Architecture-First Scanning (Quét kiến trúc & Chống đoán mò)
- Khi nhận một yêu cầu tính năng mới, Agent không được viết code ngay.
- Trước tiên, Agent phải dùng công cụ quét cấu trúc thư mục của cả `./EduSpaceBE/` và `./EduSpaceFE/` để định vị đúng các file liên quan.
- Ưu tiên đọc các file hướng dẫn cốt lõi như `README.md` hoặc `ARCHITECTURE.md` (nếu có) để hiểu rõ design pattern trước khi đề xuất giải pháp.

---

## 2. Self-Healing & Automated Testing (Tự động gỡ lỗi)
- Sau khi chỉnh sửa hoặc tạo mới mã nguồn, Agent PHẢI tự động chạy kiểm thử / biên dịch phù hợp (`npm run build` hoặc lệnh test tương đương).
- Nếu terminal trả về mã lỗi hoặc test fail, Agent không dừng lại hỏi người dùng mà tự đọc log lỗi, phân tích nguyên nhân, chỉnh sửa mã nguồn và chạy lại lệnh kiểm thử (tối đa 3 lần) cho đến khi pass.

---

## 3. Long-term Session Logging (Duy trì trí nhớ dài hạn)
- Sau khi hoàn thành một tính năng hoặc một luồng xử lý logic lớn, Agent phải tự động tạo hoặc cập nhật file nhật ký tại thư mục tuyệt đối: `D:\Learning\Side Project\EduSpace\session_log\[DATE_YEAR_SESSION.md]`.
- Nội dung file nhật ký ghi rõ: các file đã sửa/thêm mới, các lỗi hệ thống đã gặp, cách đã xử lý thành công, và trạng thái hiện tại của codebase.

---

## 4. Proactive Rule Proposing (Chủ động đề xuất Quy tắc mới)
- Mỗi khi người dùng yêu cầu điều chỉnh, gợi ý cách viết code, hỏi về convention hoặc đưa ra mẫu xử lý (pattern/code style) có tính tái sử dụng toàn dự án:
- Agent **BẮT BUỘC chủ động hỏi lại người dùng**: *"Bạn có muốn chuẩn hóa cách làm này thành một Quy tắc (Rule/Skill) cố định của dự án để tự động áp dụng cho các phiên làm việc sau không?"*
- Khi người dùng đồng ý, Agent sẽ cập nhật ngay vào `AGENTS.md` hoặc tệp Skill tương ứng trong `.agents/skills/`.
