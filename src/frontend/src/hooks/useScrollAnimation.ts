import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll(
              ".scroll-hidden, .scroll-hidden-left, .scroll-hidden-right",
            );
            let i = 0;
            for (const el of Array.from(targets)) {
              const delay = i * 120;
              setTimeout(() => {
                el.classList.add("animate");
              }, delay);
              i++;
            }
            if (
              entry.target.classList.contains("scroll-hidden") ||
              entry.target.classList.contains("scroll-hidden-left") ||
              entry.target.classList.contains("scroll-hidden-right")
            ) {
              entry.target.classList.add("animate");
            }
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useScrollAnimationMultiple() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll(
              ".scroll-hidden, .scroll-hidden-left, .scroll-hidden-right",
            );
            let i = 0;
            for (const el of Array.from(targets)) {
              const delay = i * 150;
              setTimeout(() => {
                el.classList.add("animate");
              }, delay);
              i++;
            }
            if (
              entry.target.classList.contains("scroll-hidden") ||
              entry.target.classList.contains("scroll-hidden-left") ||
              entry.target.classList.contains("scroll-hidden-right")
            ) {
              entry.target.classList.add("animate");
            }
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const sections = document.querySelectorAll(".section-observe");
    for (const s of Array.from(sections)) {
      observer.observe(s);
    }

    return () => observer.disconnect();
  }, []);
}
