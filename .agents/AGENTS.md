<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Next.js Client Coding Guidelines (EduSpaceFEClient)

Always follow these guidelines when writing code or adding features to this workspace.

## 1. Project Stack & Core Rules
- **Framework:** Next.js (App Router, Version 15+).
- **Language:** TypeScript (strict mode enabled).
- **Styling:** Tailwind CSS by default for UI components and layouts. Vanilla CSS / CSS Modules may be used for complex custom animations or isolated styles if needed.
- **API Client:** Use the preconfigured axios client at `@/services/api` for API requests. Do not initialize new axios or fetch instances for backend interaction.

## 2. Directory Architecture
Keep the structure organized and place files under the correct directories inside `src/`:
- `src/app/`: App Router page components, routes, and layouts.
- `src/config/`: App configuration files (metadata, fonts, etc.).
- `src/components/common/`: Reusable stateless/presentational UI components (Buttons, Inputs, Dialogs, Cards).
- `src/components/layout/`: Page layouts (Header, Sidebar, Navigation).
- `src/features/`: Feature modules. Each sub-folder (e.g., `posts`, `auth`) contains its own:
  - `components/`: UI components specific to the feature.
  - `hooks/`: React hooks specific to the feature.
  - `services/`: API services specific to the feature.
  - `types.ts` / `types/`: TypeScript type definitions specific to the feature.
  - `index.ts`: Public API export file for the feature.
- `src/hooks/`: Global custom React hooks (e.g., `useDebounce`, `useLocalStorage`).
- `src/services/`: Global API configs (e.g., Axios client `api.ts`).
- `src/contexts/`: Global state management contexts (Auth Context, Theme Context, etc.).
- `src/types/`: Global TypeScript type definitions and interfaces.
- `src/utils/`: Pure global helper functions.

## 3. Coding Style & Conventions
- **Component Files:** Use PascalCase for component file names (e.g., `PrimaryButton.tsx`) and named exports.
- **Component Typing:** Do NOT use `React.FC` (or `React.FunctionComponent`). Type props directly in the component function parameters instead (e.g., `export const MyComponent = ({ prop }: Props) => ...` or `export function MyComponent({ prop }: Props)`).
- **UI Design & Styling:** Không sử dụng hiệu ứng đổ bóng (`box-shadow`, shadow classes, v.v.) khi thiết kế giao diện UI. Thay vào đó, ưu tiên sử dụng đường viền (border), màu nền tương phản (background contrast) hoặc khoảng cách (spacing) để phân tách và phân cấp các thành phần.
- **Client vs. Server Components:** 
  - Leverage Server Components by default for better performance and SEO.
  - Use `'use client'` only when utilizing state (`useState`, `useEffect`), contexts, or browser-only APIs.
- **File Imports:** Use absolute path aliases starting with `@/` (e.g., `import api from '@/services/api'`).
- **Icon Usage:** Mặc định sử dụng bộ icon từ thư viện `@heroicons/react` (`@heroicons/react/24/outline` hoặc `@heroicons/react/24/solid`). Nếu không tìm được icon phù hợp trong `@heroicons/react`, Agent PHẢI thông báo ngay cho người dùng để đề xuất ý tưởng/phương án thay thế (dùng thư viện icon khác hoặc SVG tùy chỉnh), TUYỆT ĐỐI không tự ý nhúng SVG thủ công hay cài thêm bộ icon mới khi chưa được đồng ý.
- **Formatting:** Use Prettier for formatting. Ensure code is auto-formatted on save.
- **ESLint Config:** Adhere to the configurations in `eslint.config.mjs`.

## 4. API & Authentication
- All API requests should route through `api.ts` to automatically handle JWT headers and token refresh interceptors.
- For public APIs that do not require auth, configure request options or bypass the Auth header dynamically if needed.

## 5. Post-Task Verification Rule (Tự động kiểm tra lỗi)
- Sau khi hoàn thành bất kỳ task nào (thêm mới hoặc chỉnh sửa code), agent luôn phải chạy kiểm tra biên dịch (`npm run build` hoặc lệnh typecheck tương đương) để tìm lỗi.
- Nếu phát hiện lỗi, agent phải chủ động phân tích nguyên nhân, sửa lỗi và kiểm tra lại cho đến khi biên dịch thành công trước khi kết thúc phiên làm việc.

## 6. Long-Term Memory & Learnings (Ghi nhớ dài hạn)
- Agent và người dùng sử dụng slash command `/learn` để lưu trữ các bài học kinh nghiệm, cấu trúc phức tạp hoặc cách giải quyết vấn đề đặc thù của dự án nhằm ghi nhớ cho các phiên làm việc tiếp theo.
- Bất kỳ quy tắc kiến trúc hoặc bài học cốt lõi nào cũng cần được cập nhật trực tiếp vào file `AGENTS.md` này để duy trì tính đồng bộ.

## 7. Bộ quy tắc triển khai (Workflow)
- Khi nhận bất kỳ yêu cầu nào về tính năng mới hoặc sửa lỗi:
  * **Bước 1:** Hãy luôn sử dụng Chain of Thought (`### Thought Process`) để phân tích cấu trúc backend (schema, API) và giao diện frontend tương ứng trước khi sửa đổi.
  * **Bước 2:** Đưa ra kế hoạch triển khai chi tiết từng bước cho người dùng duyệt. TUYỆT ĐỐI không tự ý chỉnh sửa code khi chưa được đồng ý.
  * **Bước 3:** Đảm bảo sự đồng bộ dữ liệu giữa API được viết ở folder Backend và các hàm gọi dịch vụ (services/components) ở folder Frontend.

## 8. Tiêu chuẩn chất lượng code
- Mã nguồn sinh ra phải sạch sẽ, tuân thủ kiến trúc hiện tại của từng thư mục dự án.
- Không tự ý cài đặt thêm các thư viện bên ngoài (dependencies) khi chưa hỏi ý kiến người dùng.

## 9. Naming Conventions & Code Style Enforcement
- Trước khi viết hoặc sửa đổi bất kỳ mã nguồn nào, Agent PHẢI tuân thủ nghiêm ngặt quy chuẩn đặt tên sau của dự án:
  1. **Tên File:**
     - Đối với Backend (EduSpaceBE): Sử dụng kiểu `snake_case` (ví dụ: `user_controller.py`) hoặc `camelCase` tùy theo framework hiện tại.
     - Đối với Frontend (EduSpaceFE): Các file component phải đặt theo kiểu `PascalCase` (ví dụ: `UserForm.tsx`), các file helper/service đặt theo kiểu `camelCase` (ví dụ: `authService.ts`).
     - Quy tắc đặt tên file trong module: Tránh đặt tên file cụ thể theo tên thực thể (ví dụ: không đặt `CreateUserModal.tsx`, `UpdateUserModal.tsx`), mà hãy đặt tên chung như `FormCreate.tsx`, `FormUpdate.tsx`. Điều này giúp dễ dàng sao chép (clone) nguyên thư mục module cho các tính năng khác mà không cần sửa tên file bên trong.
  2. **Tên Biến và Hàm:**
     - Biến và hàm thông thường: Luôn sử dụng `camelCase` (ví dụ: `userId`, `getUserData`).
     - Hằng số (Constants): Luôn viết hoa toàn bộ và phân tách bằng dấu gạch dưới (ví dụ: `API_URL`, `MAX_RETRY`).
     - Class/Interface: Luôn sử dụng `PascalCase` (ví dụ: `UserService`).
- Tuyệt đối không tự ý bịa ra phong cách đặt tên mới lệch pha với các file code hiện tại trong codebase.

## 10. Long-term Session Logging (Duy trì trí nhớ dài hạn)
- **Bản chất:** Giúp Agent không bị mất trí nhớ hoặc "ngáo" khi đoạn hội thoại quá dài gây loãng context.
- **Quy tắc thực thi:**
  1. Sau khi hoàn thành một tính năng hoặc một luồng xử lý logic lớn, Agent phải tự động tạo hoặc cập nhật một file nhật ký tại thư mục tuyệt đối: `D:\Learning\Side Project\EduSpace\session_log\[DATE_YEAR_SESSION.md]`.
  2. Nội dung file nhật ký phải ghi nhận rõ: các file đã sửa/thêm mới, các lỗi hệ thống đã gặp, cách đã xử lý thành công, và trạng thái hiện tại của codebase.
  3. Khi bắt đầu một phiên làm việc mới nếu người dùng yêu cầu, Agent phải đọc file log gần nhất này để khôi phục ngữ cảnh ngay lập tức.

## 11. Architecture-First Scanning (Quét kiến trúc & Chống đoán mò)
- **Bản chất:** Ép Agent phải luôn làm việc dựa trên thực tế cấu trúc codebase có sẵn, chấm dứt việc tự bịa file.
- **Quy tắc thực thi:**
  1. Khi nhận một yêu cầu tính năng mới, Agent không được viết code ngay. Trước tiên, Agent phải dùng công cụ quét cấu trúc thư mục của cả `./EduSpaceBE/` và `./EduSpaceFE/` để định vị đúng các file liên quan.
  2. Agent phải ưu tiên đọc các file hướng dẫn cốt lõi như `README.md` hoặc `ARCHITECTURE.md` (nếu có) trong từng thư mục để hiểu rõ design pattern đang dùng (ví dụ: MVC, Clean Architecture, Repository Pattern) trước khi đề xuất giải pháp.

## 12. Self-Healing & Automated Testing (Tự động gỡ lỗi)
- **Bản chất:** Giúp Agent tự chạy thử nghiệm và tự sửa lỗi mà không cần làm phiền người dùng.
- **Quy tắc thực thi:**
  1. Sau khi chỉnh sửa hoặc tạo mới mã nguồn, Agent PHẢI tự động chạy lệnh kiểm thử phù hợp với framework của thư mục đó (ví dụ: `npm run test` hoặc lệnh test tương đương).
  2. Nếu terminal trả về mã lỗi hoặc test fail, Agent không được dừng lại hỏi người dùng. Agent phải tự đọc log lỗi, phân tích nguyên nhân, chỉnh sửa lại mã nguồn và chạy lại lệnh kiểm thử (tối đa 3 lần thử lại) cho đến khi pass.

## 13. Typography Scale & Design System Standards (Quy chuẩn kích thước chữ)
- Khi thiết kế hoặc chỉnh sửa giao diện UI cho EduSpaceFEClient, Agent PHẢI tuân thủ nghiêm ngặt bảng quy chuẩn typography theo Tailwind CSS:
  1. **Page Title (H1):** `text-xl sm:text-3xl` hoặc `text-2xl sm:text-3xl` (24px - 30px), `font-bold`.
  2. **Section Title / Card Title lớn (H2):** `text-xl` - `text-2xl` (20px - 24px), `font-bold` hoặc `font-semibold`.
  3. **Modal / Sub-section Title (H3):** `text-lg` - `text-xl` (18px - 20px), `font-semibold`.
  4. **Item / Card Small Header (H4):** `text-base` - `text-lg` (16px - 18px), `font-semibold`.
  5. **Body Text Standard (Mặc định cho Admin/SaaS/Portal):** `text-sm` (14px) - `text-base` (16px), `font-normal`.
  6. **Body Small / Form Label / Checkbox / Subtitle:** `text-xs` - `text-sm` (12px - 14px), `font-normal` hoặc `font-medium`.
  7. **Badge / Tooltip / Helper Error Text:** `text-[11px]` - `text-xs` (11px - 12px), `font-medium`.
  8. **Button Text Standard:**
     - Nút nhỏ (`sm`): `text-xs` (12px), `h-8`.
     - Nút chuẩn (`md` - Mặc định): `text-sm` (14px), `font-medium` / `font-semibold`, `h-10`.
     - Nút lớn (`lg`): `text-sm` (14px) hoặc `text-base` (16px), `font-semibold`, `h-12`.


