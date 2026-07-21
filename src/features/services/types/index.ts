import React from "react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  price?: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  actionText: string;
  actionHref: string;
}
