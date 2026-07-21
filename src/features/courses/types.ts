export interface CourseItem {
  id: string;
  title: string;
  category: string;
  difficulty: "Cơ bản" | "Nâng cao" | "Trung cấp";
  banner: string;
  originalPrice: number;
  discountedPrice: number;
  roadmap: string[];
  students: number;
  rating: number;
  hours: string;
  slug?: string;
}
