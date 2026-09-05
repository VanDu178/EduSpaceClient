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
