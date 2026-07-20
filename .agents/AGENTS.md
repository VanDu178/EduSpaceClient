<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Next.js Client Coding Guidelines (EduSpaceFEClient)

Always follow these guidelines when writing code or adding features to this workspace.

## 1. Project Stack & Core Rules
- **Framework:** Next.js (App Router, Version 15+).
- **Language:** TypeScript (strict mode enabled).
- **Styling:** Vanilla CSS (CSS Modules) by default. Avoid Tailwind CSS unless explicitly requested by the user.
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
- **Client vs. Server Components:** 
  - Leverage Server Components by default for better performance and SEO.
  - Use `'use client'` only when utilizing state (`useState`, `useEffect`), contexts, or browser-only APIs.
- **File Imports:** Use absolute path aliases starting with `@/` (e.g., `import api from '@/services/api'`).
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
