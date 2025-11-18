import { getDomReferences } from '../utils/dom.js';

export function handleHeroOpacityOnScroll() {
  const { heroSection } = getDomReferences();
  if (!heroSection) return;
  heroSection.classList.toggle('hero-hidden', window.scrollY > 10);
}

export function setupHeroScrollListener() {
  window.addEventListener('scroll', handleHeroOpacityOnScroll, { passive: true });
}
