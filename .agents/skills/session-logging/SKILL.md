---
name: Long-term Session Logging
description: Tự động ghi lại nhật ký phiên làm việc tại session_log/[DATE_YEAR_SESSION.md] để duy trì ngữ cảnh dài hạn.
---

# Long-term Session Logging (Duy trì trí nhớ dài hạn)

- Bản chất: Giúp Agent không bị mất trí nhớ hoặc "ngáo" khi đoạn hội thoại quá dài gây loãng context.
- Quy tắc thực thi:
  1. Sau khi hoàn thành một tính năng hoặc một luồng xử lý logic lớn, Agent phải tự động tạo hoặc cập nhật một file nhật ký tại thư mục tuyệt đối: `D:\Learning\Side Project\EduSpace\session_log\[DATE_YEAR_SESSION.md]`.
  2. Nội dung file nhật ký phải ghi nhận rõ: các file đã sửa/thêm mới, các lỗi hệ thống đã gặp, cách đã xử lý thành công, và trạng thái hiện tại của codebase.
  3. Khi bắt đầu một phiên làm việc mới nếu người dùng yêu cầu, Agent phải đọc file log gần nhất này để khôi phục ngữ cảnh ngay lập tức.
