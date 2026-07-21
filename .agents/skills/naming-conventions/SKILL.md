---
name: Naming Conventions & Code Style Enforcement
description: Quy chuẩn đặt tên file, biến, hàm, hằng số và class/interface cho Backend (EduSpaceBE) và Frontend (EduSpaceFE).
---

# Naming Conventions & Code Style Enforcement

- Trước khi viết hoặc sửa đổi bất kỳ mã nguồn nào, Agent PHẢI tuân thủ nghiêm ngặt quy chuẩn đặt tên sau của dự án:
  1. Tên File: 
     - Đối với Backend (EduSpaceBE): Sử dụng kiểu snake_case (ví dụ: `user_controller.py`) hoặc camelCase tùy theo framework hiện tại.
     - Đối với Frontend (EduSpaceFE): Các file component phải đặt theo kiểu PascalCase (ví dụ: `UserForm.tsx`), các file helper/service đặt theo kiểu camelCase (ví dụ: `authService.ts`).
     - Quy tắc đặt tên file trong module: Tránh đặt tên file cụ thể theo tên thực thể (ví dụ: không đặt `CreateUserModal.tsx`, `UpdateUserModal.tsx`), mà hãy đặt tên chung như `FormCreate.tsx`, `FormUpdate.tsx`. Điều này giúp dễ dàng sao chép (clone) nguyên thư mục module cho các tính năng khác mà không cần sửa tên file bên trong.
  2. Tên Biến và Hàm:
     - Biến và hàm thông thường: Luôn sử dụng camelCase (ví dụ: `userId`, `getUserData`).
     - Hằng số (Constants): Luôn viết hoa toàn bộ và phân tách bằng dấu gạch dưới (ví dụ: `API_URL`, `MAX_RETRY`).
     - Class/Interface: Luôn sử dụng PascalCase (ví dụ: `UserService`).
- Tuyệt đối không tự ý bịa ra phong cách đặt tên mới lệch pha với các file code hiện tại trong codebase.
