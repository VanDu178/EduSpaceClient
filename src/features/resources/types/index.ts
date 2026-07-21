import React from "react";

export interface ResourceItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  recommended?: boolean;
  badge?: string;
  features: string[];
  actionText: string;
  actionHref: string;
}
