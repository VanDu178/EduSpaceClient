---
name: UI & Design System Standards
description: Quy chuẩn thiết kế giao diện, typography scale, cấm đổ bóng shadow, khóa phần tử tương tác khi loading và tạo mới mascot linh vật.
---

# UI & Design System Standards (EduSpaceFEClient)

Tập hợp tất cả các quy định và tiêu chuẩn thiết kế giao diện UI/UX cho ứng dụng FE Client.

---

## 1. Typography Scale & Design System Standards
Tuân thủ nghiêm ngặt bảng quy chuẩn typography theo Tailwind CSS:
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

---

## 2. UI Design Constraints & Styling Rules
- **Cấm đổ bóng:** Không sử dụng hiệu ứng đổ bóng (`box-shadow`, shadow classes như `shadow-md`, `shadow-lg`, v.v.) khi thiết kế giao diện.
- **Phân tách giao diện:** Ưu tiên sử dụng đường viền (`border`, `border-slate-200`), màu nền tương phản (`bg-slate-50`, `bg-white`) hoặc khoảng cách (`spacing`) để phân cấp thành phần.
- **Bo tròn góc:** Cho phép bo tròn góc (`rounded-full`, `rounded-xl`, `rounded-2xl`, v.v.) đối với nút bấm và thẻ card.

---

## 3. Interactive Locking & Loading States
Khi có tác vụ bất đồng bộ đang xử lý (`isLoading`, `isPending`, `isSubmitting`):
1. **Vô hiệu hóa tương tác:** Khóa tất cả nút bấm (`button`), liên kết (`Link`/`a`), input trong bối cảnh đó nhằm tránh submit trùng hoặc chuyển trang.
2. **Cách thực thi:**
   - Đăng ký `disabled={isLoading}` cho nút bấm / input.
   - Thẻ liên kết `Link` / `a`: Thêm Tailwind `pointer-events-none opacity-50` và chặn `onClick={(e) => { if (isLoading) e.preventDefault(); }}`.
3. **Phản hồi trực quan:** Hiển thị icon xoay (Loading Spinner), mờ giao diện (`opacity-50`) và đổi con trỏ chuột `cursor-not-allowed`.

---

## 4. Mascot Generation Rules
Khi thiết kế hoặc sinh ảnh linh vật (Mascot):
1. **Xóa phông nền (Transparent PNG):** Bắt buộc phông nền trong suốt tuyệt đối.
2. **Không chứa chữ / logo thương hiệu:** Không để bất kỳ chữ hay logo nào trên linh vật.
3. **Linh vật gốc đồng bộ:** Robot 3D trắng viền xanh cyan, mắt & miệng cười phát sáng xanh cyan.
4. **Biến đổi tư thế:** Linh hoạt theo bối cảnh trang web (đứng, lơ lửng, ngồi tên lửa, tương tác HUD).

---

## 5. Responsive Design Standards & Tailwind CSS Breakpoints
Áp dụng phương pháp **Mobile-First** chuẩn hóa theo Tailwind CSS. Không dùng CSS media queries thủ công.

### Bảng Quy Chuẩn Breakpoints & Kiểm Trực DevTools

| Nhóm thiết bị | Kích thước đề xuất (W × H) | Tailwind Prefix | Thiết bị mẫu DevTools | Mục đích & Tiêu chuẩn kiểm tra |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile nhỏ** | 375 × 667 (hoặc 360 × 800) | `Base` (Mặc định) / `xs:` (375px) | iPhone SE / Samsung Galaxy S8+ | Màn hình hẹp: kiểm tra vỡ layout, tràn text, nút bấm dính nhau, font size tối thiểu 12px-14px. |
| **Mobile chuẩn** | 390 × 844 (hoặc 412 × 915) | `Base` / `sm:` (640px) | iPhone 12/13/14 Pro hoặc Pixel 7 | Kích thước phổ biến nhất hiện nay của phần lớn smartphone. Đảm bảo nút full-width, drawer/hamburger navigation mượt mà. |
| **Tablet (Dọc)** | 768 × 1024 | `md:` (768px) | iPad Mini / iPad Air (dọc) | **Vùng chuyển tiếp (Transition):** Chuyển từ layout 1 cột (mobile) sang multi-column (tablet/desktop), sidebar thu gọn hoặc menu ngang. |
| **Laptop / Desktop** | 1280 × 800 (hoặc 1440 × 900) | `lg:` (1024px) / `xl:` (1280px) / `2xl:` (1536px) | DevTools Custom Responsive | Kiểm tra `max-width` container (`max-w-7xl`, `max-w-6xl`), grid hiển thị đủ 3-4 cột, khoảng cách spacing hài hòa (`gap-6`, `gap-8`). |

### Nguyên Tắc Lập Trình Responsive với Tailwind CSS
1. **Mobile-First Workflow:**
   - Luôn định nghĩa style mặc định cho màn hình nhỏ nhất (Mobile) trước.
   - Sử dụng các breakpoint modifiers (`xs:`, `sm:`, `md:`, `lg:`, `xl:`, `2xl:`) để ghi đè mở rộng layout khi kích thước màn hình tăng lên.
   - *Ví dụ:* `className="w-full md:w-1/2 lg:w-1/3"` (Mặc định 100%, từ 768px là 50%, từ 1024px là 33.3%).
2. **Grid & Multi-Column Rules:**
   - Mobile (`< 768px`): 1 cột (`grid-cols-1`).
   - Tablet (`md: 768px`): 2 cột (`md:grid-cols-2`).
   - Desktop (`xl: 1280px`): 3 hoặc 4 cột (`xl:grid-cols-3` / `xl:grid-cols-4`).
3. **Responsive Container & Spacing:**
   - Padding lề trang: `px-4 sm:px-6 lg:px-8`.
   - Dynamic Gaps: `gap-4 sm:gap-6 lg:gap-8`.

