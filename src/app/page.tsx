import { HeroSection } from '@/sections/home/hero/hero-section';
import { ProjectsSection } from '@/sections/home/projects/projects-section';
import { ExperienceSection } from '@/sections/home/experience/experience-section';
import { ContactSection } from '@/sections/home/contact/contact-section';

/** 홈 — Hero → 벤토 Projects(5) → Experience+Skills → Contact. */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
