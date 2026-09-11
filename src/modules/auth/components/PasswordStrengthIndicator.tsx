import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface PasswordStrengthIndicatorProps {
  password?: string;
}

export function PasswordStrengthIndicator({ password = "" }: PasswordStrengthIndicatorProps) {
  if (!password || password.length === 0) {
    return null;
  }

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const getStrengthScore = () => {
    let score = 0;
    if (hasMinLength) score += 25;
    if (hasNumber) score += 25;
    if (hasUpper) score += 25;
    if (hasSpecial) score += 25;
    return score;
  };

  const strengthScore = getStrengthScore();

  const getStrengthLabel = () => {
    if (strengthScore <= 25) {
      return { text: "Yếu", color: "text-rose-500", bg: "bg-rose-500" };
    }
    if (strengthScore <= 75) {
      return { text: "Trung bình", color: "text-amber-500", bg: "bg-amber-500" };
    }
    return { text: "Rất mạnh", color: "text-emerald-500", bg: "bg-emerald-500" };
  };

  const strength = getStrengthLabel();

  return (
    <div className="mb-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-slate-600 dark:text-slate-400">Độ mạnh mật khẩu:</span>
        <span className={`font-semibold ${strength.color}`}>{strength.text}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strength.bg}`}
          style={{ width: `${strengthScore}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-1 text-[11px] pt-1 text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          {hasMinLength ? (
            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          ) : (
            <XCircleIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          )}
          <span>Tối thiểu 8 ký tự</span>
        </div>
        <div className="flex items-center gap-1">
          {hasNumber ? (
            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          ) : (
            <XCircleIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          )}
          <span>Chứa chữ số (0-9)</span>
        </div>
        <div className="flex items-center gap-1">
          {hasUpper ? (
            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          ) : (
            <XCircleIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          )}
          <span>Chữ in hoa (A-Z)</span>
        </div>
        <div className="flex items-center gap-1">
          {hasSpecial ? (
            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          ) : (
            <XCircleIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          )}
          <span>Ký tự đặc biệt (!@#$)</span>
        </div>
      </div>
    </div>
  );
}
