import {
  HeroSection,
  CommunicationSection,
  ServicesSection,
  SignalsSection,
  CtaSection,
} from "@/features/home";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900 overflow-hidden">
      <HeroSection />
      <CommunicationSection />
      <ServicesSection />
      <SignalsSection />
      <CtaSection />
    </div>
  );
}
