---
name: State & Data Conventions
description: Quy chuẩn đặt tên file/biến/hằng số, chuẩn hóa tham số tìm kiếm (search params/default state), tập trung hóa Socket event constants và chuẩn hóa format ngày giờ (formatDate).
---

# State & Data Conventions (EduSpaceFEClient)

Tập hợp quy chuẩn đặt tên, quản lý state tìm kiếm & bộ lọc, hằng số dữ liệu và format ngày giờ toàn hệ thống.

---

## 1. Naming Conventions & Code Style
- **Tên File:**
  - Backend (EduSpaceBE): `snake_case` (ví dụ: `user_controller.py`) hoặc `camelCase`.
  - Frontend (EduSpaceFEClient): Component dùng `PascalCase` (ví dụ: `UserForm.tsx`), helper/service dùng `camelCase` (ví dụ: `authService.ts`).
  - File trong module: Dùng tên dùng chung như `FormCreate.tsx`, `FormUpdate.tsx`, `ViewList.tsx` thay vì tên thực thể cụ thể (`CreateUserModal.tsx`) để dễ clone module.
- **Biến & Hàm:** `camelCase` (ví dụ: `userId`, `getUserData`).
- **Hằng số (Constants):** `UPPER_SNAKE_CASE` (ví dụ: `API_URL`, `MAX_RETRY`).
- **Class / Interface / Type:** `PascalCase` (ví dụ: `UserService`, `TicketQueryParams`).

---

## 2. Search Params & Default State Enforcement
Dành cho mọi component/hook quản lý bộ lọc, tìm kiếm hoặc phân trang:
1. **Tên biến State / Props:** BẮT BUỘC đặt tên state là `params` và hàm setter là `setParams` (Props: `params` / `onParamsChange`).
2. **Hằng số Mặc định:** BẮT BUỘC khai báo hằng số khởi tạo mặc định dạng `DEFAULT_PARAMS` hoặc `DEFAULT_[FEATURE]_PARAMS` (ví dụ: `DEFAULT_TICKET_PARAMS`). **Cấm hardcode các chuỗi mặc định (như `'ALL'`) trực tiếp trong điều kiện so sánh**; mọi phép kiểm tra trạng thái mặc định BẮT BUỘC phải so sánh thông qua `DEFAULT_PARAMS` hoặc hằng số từ `constants.ts`.
3. **Tên Type / Interface:** Sử dụng hậu tố `QueryParams` hoặc `Params` (ví dụ: `TicketQueryParams` hoặc `TicketParams`).
4. **Khởi tạo State gọn gàng (Spread Operator):** Sử dụng `{ ...DEFAULT_PARAMS, ...externalParams }` để tự động kế thừa tất cả giá trị mặc định mà không cần bóc tách từng thuộc tính thủ công.

---

## 3. Socket Event Constants Enforcement
- **Bắt buộc tập trung hóa Tên Event Socket:**
  - Mọi hook lắng nghe (`useSocketEvent(...)`) hoặc phát socket (`socket.emit(...)`) BẮT BUỘC dùng hằng số từ tệp `constants.ts` của feature hoặc `@/core/config/socket/socketEvents.ts` (ví dụ: `TICKET_SOCKET_EVENTS.COMMENT_ADDED`).
  - TUYỆT ĐỐI KHÔNG hardcode chuỗi tên event Socket trực tiếp trong component/hook.

---

## 4. Date & Time Formatting Standards
- **Sử dụng Helper tập trung:** BẮT BUỘC dùng hàm helper `formatDate(date, showTime)` được định nghĩa tại `@/core/utils/format.ts` (export qua `@/core/utils`) cho mọi nhu cầu format hiển thị ngày giờ trong UI.
- **Cấm Inline formatting:** TUYỆT ĐỐI KHÔNG dùng trực tiếp `new Date(...).toLocaleString()` hay `toLocaleDateString()` inline trong JSX/Components để tránh lỗi Hydration Mismatch trên Next.js App Router, đảm bảo null-safety (`--` fallback) và đồng nhất giao diện toàn hệ thống.

---

## 5. Module Subdirectory Index Export Standards (`services/`, `utils/`, `hooks/`)
- **Tập trung hóa Entrypoint via `index.ts`:** Mọi thư mục con trong một feature module (`services/`, `utils/`, `hooks/`) PHẢI có file `index.ts` làm duy nhất entrypoint export ra ngoài.
- **Quy tắc Single File:** Nếu thư mục con chỉ chứa 1 file logic duy nhất (ví dụ: service duy nhất của module), BẮT BUỘC viết trực tiếp logic vào file `index.ts` trong thư mục đó (ví dụ: `services/index.ts` hoặc `utils/index.ts`). Không tạo các file rườm rà dư thừa tên như `ticketSupportService.ts` hay `ticketHelpers.ts`.
- **Quy tắc Multi File:** Nếu thư mục con chứa nhiều file riêng biệt (ví dụ: `dateHelpers.ts`, `currencyHelpers.ts`), file `index.ts` BẮT BUỘC re-export toàn bộ (`export * from './dateHelpers'`).
- **Import Shortening:** Các module/component bên ngoài khi sử dụng chỉ import ngắn gọn qua thư mục (`import { ticketSupportService } from '../services';` hoặc `import { getStatusConfig } from '../utils';`).


