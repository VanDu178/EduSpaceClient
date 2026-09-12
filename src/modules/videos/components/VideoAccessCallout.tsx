'use client';

import { LockClosedIcon, ArrowRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common/Button';

export interface VideoAccessCalloutProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  onReplayTeaser?: () => void;
  showReplay?: boolean;
  replayText?: string;
}

export function VideoAccessCallout({
  title,
  description,
  actionText,
  onAction,
  onReplayTeaser,
  showReplay = false,
  replayText = 'Xem lại bản xem thử',
}: VideoAccessCalloutProps) {
  return (
    <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
        <LockClosedIcon className="w-7 h-7" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-sm">
        <Button
          type="button"
          variant="primary"
          size="md"
          rounded="xl"
          fullWidth
          onClick={onAction}
          rightIcon={<ArrowRightIcon className="w-4 h-4" />}
          className="font-semibold cursor-pointer"
        >
          {actionText}
        </Button>

        {showReplay && onReplayTeaser && (
          <Button
            type="button"
            variant="outline"
            size="md"
            rounded="xl"
            onClick={onReplayTeaser}
            leftIcon={<ArrowPathIcon className="w-4 h-4" />}
            className="w-full sm:w-auto px-6 !bg-slate-900/80 !text-slate-300 hover:!text-white hover:!bg-slate-800 !border-slate-700/80 transition-all font-semibold whitespace-nowrap shrink-0"
          >
            {replayText}
          </Button>
        )}
      </div>
    </div>
  );
}
