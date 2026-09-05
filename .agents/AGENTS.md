<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Next.js Client Coding Guidelines (EduSpaceFEClient)

Tệp quy tắc cốt lõi của dự án Frontend Client. Các quy chuẩn chi tiết theo chuyên mục được phân tách vào thư mục `.agents/skills/`.

---

## 1. Project Stack & Core Infrastructure
- **Framework:** Next.js (App Router, Version 15+).
- **Language:** TypeScript (strict mode enabled).
- **Styling:** Tailwind CSS mặc định cho UI components và layouts.
- **API Client:** Sử dụng axios client preconfigured tại `@/core/services/api` (tự động xử lý JWT headers và refresh token). Không khởi tạo instance axios/fetch mới.
- **System Branding:** Tên thương hiệu hệ thống/sản phẩm chính thức là **TradeVerse** (TUYỆT ĐỐI KHÔNG dùng tên EduSpace trong UI/Email/Thông báo).

---

## 2. Directory Architecture & File Imports
Tổ chức thư mục chuẩn bên trong `src/`:
- `src/app/`: Page components, routes và layouts.
- `src/components/common/`: Reusable stateless UI components (Buttons, Inputs, Dialogs).
- `src/components/layout/`: Page layouts (Header, Sidebar, Navigation).
- `src/features/`: Feature modules (`components/`, `hooks/`, `services/`, `types.ts`, `constants.ts`, `index.ts`).
- `src/core/`: Core infrastructure (`config/`, `contexts/`, `hooks/`, `icons/`, `services/`, `styles/`, `utils/`).
- **File Imports:** Bắt buộc dùng absolute path alias `@/` (ví dụ: `import api from '@/core/services/api'`).

---

## 3. Core Component & Coding Standards
- **Component Typing:** TUYỆT ĐỐI KHÔNG dùng `React.FC` hay `React.FunctionComponent`. Type props trực tiếp trong tham số hàm.
- **Client vs Server Components:** Mặc định dùng Server Components. Chỉ ghi `'use client'` khi có state, effect, context hoặc browser API.
- **Icon Usage:** Mặc định dùng `@heroicons/react/24/outline` hoặc `solid`. Nếu không tìm thấy icon phù hợp, PHẢI hỏi ý kiến người dùng trước khi cài bộ icon mới hay nhúng SVG thủ công.
- **Code Quality:** Không cài thêm dependencies bên ngoài khi chưa được đồng ý.

---

## 4. Agent Workflow & Execution Rules
1. **Chain of Thought & Plan Approval:** Luôn phân tích cấu trúc BE & FE, tạo Implementation Plan và được người dùng duyệt mới bắt đầu sửa code.
2. **Post-Task Verification:** Sau khi làm xong bất kỳ task nào, Agent BẮT BUỘC tự động kiểm tra biên dịch (`npm run build`). Nếu phát hiện lỗi phải tự phân tích và gỡ lỗi.
3. **Long-Term Memory (`/learn`):** Dùng lệnh `/learn` để lưu bài học kinh nghiệm cốt lõi vào tệp quy tắc này.
4. **Proactive Rule Proposing:** Khi nhận yêu cầu điều chỉnh cách viết code, convention hoặc pattern có tính tái sử dụng toàn hệ thống, Agent BẮT BUỘC chủ động hỏi người dùng xem có muốn thiết kế thành một Quy tắc (Rule/Skill) cố định hay không.

---

## 5. Domain Skills Index (Chỉ mục Quy chuẩn Chuyên sâu)
Các quy tắc chi tiết theo từng lĩnh vực được quản lý tập trung tại `.agents/skills/`:
- 🎨 **[ui-design-system](file:///.agents/skills/ui-design-system/SKILL.md):** Typography scale, Cấm đổ bóng shadow, Khóa nút khi loading, Quy chuẩn sinh mascot.
- 🏷️ **[state-and-data-conventions](file:///.agents/skills/state-and-data-conventions/SKILL.md):** Naming conventions, Chuẩn hóa Search Params (`params`/`DEFAULT_PARAMS`), Socket Event Constants.
- 🤖 **[agent-automation](file:///.agents/skills/agent-automation/SKILL.md):** Architecture-first scanning, Self-healing test, Long-term session logging, Proactive Rule Proposing.
