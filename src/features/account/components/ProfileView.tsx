import { useAuthStore, useChangePasswordMutation } from '@/features/auth';
import {
  EnvelopeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  KeyIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, Input, Form } from 'antd';

interface ProfileViewProps {
  activeSubscription?: any;
  onNavigateTab?: (tab: string) => void;
}

export function ProfileView({ activeSubscription, onNavigateTab }: ProfileViewProps) {
  const { user } = useAuthStore();
  const [passwordForm] = Form.useForm();
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePasswordMutation();

  const planName = activeSubscription?.planName || user?.planName;
  const isPremium = Boolean(activeSubscription?.isPremium || user?.isPremium);
  const isGoogleAccount = user?.provider === 'google' || Boolean(user?.googleId);

  const handlePasswordSubmit = (values: any) => {
    changePassword(
      {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          passwordForm.resetFields();
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Workspace Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-8">

        {/* Seamless Header Profile Section with Integrated Subscription Banner */}
        <div className="space-y-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user?.name || 'Avatar'}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-sky-50 border border-sky-100 shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-sky-100/80 border border-sky-200 text-sky-700 flex items-center justify-center font-bold text-3xl shrink-0 ring-4 ring-sky-50">
                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}

            <div className="space-y-2 text-center sm:text-left min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                  {user?.name || user?.email || 'Người dùng'}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                  Đã xác thực
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/80">
                  <SparklesIcon className="w-3.5 h-3.5 text-sky-600" />
                  {planName || 'Gói Miễn phí (Free)'}
                </span>
              </div>

              <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
                <EnvelopeIcon className="w-4 h-4 text-slate-400 shrink-0" />
                {user?.email}
              </p>
            </div>
          </div>
        </div>


        {/* Change Password Section (Centered Form) */}
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <KeyIcon className="w-5 h-5 text-sky-600" />
              Bảo mật & Đổi mật khẩu
            </h3>
            <p className="text-xs text-slate-500">
              Cập nhật mật khẩu thường xuyên để bảo vệ an toàn cho tài khoản TradeVerse của bạn.
            </p>
          </div>

          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordSubmit}
            className="space-y-4 max-w-xl mx-auto text-left"
          >
            <Form.Item
              label={<span className="text-xs font-semibold text-slate-600">Mật khẩu hiện tại</span>}
              name="currentPassword"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu đang dùng"
                className="h-10 rounded-xl border-slate-200 hover:!border-sky-500 focus:!border-sky-500 focus-within:!border-sky-500 focus:!shadow-none focus-within:!shadow-none focus:!outline-none focus-within:!ring-2 focus-within:!ring-sky-100"
                disabled={isChangingPassword}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-xs font-semibold text-slate-600">Mật khẩu mới</span>}
              name="newPassword"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                { min: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' },
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                className="h-10 rounded-xl border-slate-200 hover:!border-sky-500 focus:!border-sky-500 focus-within:!border-sky-500 focus:!shadow-none focus-within:!shadow-none focus:!outline-none focus-within:!ring-2 focus-within:!ring-sky-100"
                disabled={isChangingPassword}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-xs font-semibold text-slate-600">Xác nhận mật khẩu mới</span>}
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Nhập lại mật khẩu mới"
                className="h-10 rounded-xl border-slate-200 hover:!border-sky-500 focus:!border-sky-500 focus-within:!border-sky-500 focus:!shadow-none focus-within:!shadow-none focus:!outline-none focus-within:!ring-2 focus-within:!ring-sky-100"
                disabled={isChangingPassword}
              />
            </Form.Item>


            <div className="pt-2 flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={isChangingPassword}
                disabled={isChangingPassword}
                className="!rounded-xl font-medium border-none bg-sky-600 hover:!bg-sky-500 text-xs sm:text-sm cursor-pointer"
              >
                Cập nhật mật khẩu
              </Button>
            </div>
          </Form>
        </div>

        {/* Security Status Section */}
        <div className="pt-6 border-t border-slate-100 space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-slate-50/70 border border-slate-100 rounded-xl">
              <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-900">Phương thức xác thực</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {isGoogleAccount ? 'Đăng nhập thông qua tài khoản Google OAuth 2.0' : 'Đăng nhập thông qua Email & Mật khẩu chuẩn'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50/70 border border-slate-100 rounded-xl">
              <LockClosedIcon className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-900">Mã hóa bảo vệ</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Mật khẩu của bạn luôn được bảo vệ & mã hóa an toàn bằng thuật toán.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
