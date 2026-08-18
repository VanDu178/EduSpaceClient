import React from "react";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";
import { ResourceItem } from "../types";

interface ResourceCardProps {
  resource: ResourceItem;
  className?: string;
}

export const ResourceCard = ({ resource, className = "" }: ResourceCardProps) => {
  const IconComp = resource.icon;

  return (
    <div
      className={`bg-white rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-2 ${
        resource.recommended
          ? "border-2 border-blue-500 bg-white"
          : "border border-slate-200"
      } ${className}`}
    >
      {resource.recommended && resource.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          {resource.badge}
        </div>
      )}

      <div>
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
          <IconComp className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{resource.title}</h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          {resource.description}
        </p>

        <ul className="space-y-3 my-6">
          {resource.features.map((feat, fIdx) => (
            <li key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircleIcon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4">
        <Link href={resource.actionHref}>
          <Button
            variant={resource.recommended ? "gradient" : "secondary"}
            size="lg"
            fullWidth
          >
            {resource.actionText}
          </Button>
        </Link>
      </div>
    </div>
  );
};
