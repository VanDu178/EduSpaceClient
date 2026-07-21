import React from "react";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";
import { ServiceItem } from "../types";

export interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const IconComp = service.icon;

  return (
    <div
      className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1.5 ${
        service.popular
          ? "border-2 border-blue-500 bg-white dark:bg-zinc-900/90"
          : "border border-slate-200 dark:border-white/10"
      } ${className}`}
    >
      {service.popular && service.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          {service.badge}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <IconComp className="w-6 h-6" />
          </div>
          {service.price && (
            <span className="text-sm font-semibold text-slate-900 dark:text-white px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              {service.price}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
        <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed">
          {service.description}
        </p>

        <div className="border-t border-slate-200 dark:border-white/10 pt-4 mb-6">
          <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            Quyền lợi & Phạm vi công việc:
          </div>
          <ul className="space-y-3">
            {service.features.map((feat, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-zinc-300">
                <CheckCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-2">
        <Link href={service.actionHref}>
          <Button
            variant={service.popular ? "gradient" : "outline"}
            size="lg"
            fullWidth
          >
            {service.actionText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
