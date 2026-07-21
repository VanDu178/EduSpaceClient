export interface SavedPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  authorAvatar: string;
  savedAt: string;
  readTime: string;
  slug: string;
}

export interface SavedVideo {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  instructor: string;
  savedAt: string;
  views: number;
  slug: string;
}

export interface PurchasedCourse {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  instructor: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: string;
  purchasedDate: string;
  nextLessonTitle: string;
  slug: string;
}

export interface UsedService {
  id: string;
  serviceName: string;
  packageName: string;
  status: "active" | "completed" | "pending";
  startDate: string;
  expiryDate: string;
  mentor: string;
  supportChannel: string;
  notes: string;
}

export interface PaymentTransaction {
  id: string;
  transactionCode: string;
  itemName: string;
  itemType: "Course" | "Service" | "Subscription";
  amount: number;
  paymentMethod: "VNPay" | "Momo" | "Bank Transfer" | "Credit Card";
  paymentDate: string;
  status: "success" | "pending" | "failed";
}
