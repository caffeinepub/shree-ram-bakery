import { useEffect, useState } from "react";
import { useScrollAnimationMultiple } from "./hooks/useScrollAnimation";

// ── Decorative SVG components ──────────────────────────────────────────────────
function WheatIcon({
  className = "",
  style,
}: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      role="img"
      aria-label="Wheat"
      className={className}
      style={style}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Wheat</title>
      <path d="M2 22 16 8" />
      <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
      <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
      <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
      <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
    </svg>
  );
}

function StarIcon({
  filled = true,
  size = 16,
}: { filled?: boolean; size?: number }) {
  return (
    <svg
      role="img"
      aria-label="Star"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "oklch(0.72 0.10 66)" : "none"}
      stroke="oklch(0.72 0.10 66)"
      strokeWidth="2"
    >
      <title>Star</title>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const STAR_INDICES = [0, 1, 2, 3, 4];

// ── Nav ────────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-solid" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <WheatIcon className="text-bakery-caramel w-7 h-7 transition-transform group-hover:rotate-12 duration-300" />
          <span
            className="font-serif font-bold text-lg text-bakery-cocoa tracking-wide leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SHREE RAM BAKERY
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              className="text-sm font-medium text-bakery-brown hover:text-bakery-caramel transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-bakery-caramel after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          data-ocid="nav.primary_button"
          className="hidden md:inline-flex btn-primary px-5 py-2 rounded-full text-sm font-semibold"
        >
          Order Now
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-bakery-cocoa"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden nav-solid border-t border-bakery-gold/20 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              className="block py-3 text-bakery-brown hover:text-bakery-caramel font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {/* biome-ignore lint/a11y/useValidAnchor: navigation link that also closes menu */}
          <a
            href="#contact"
            data-ocid="nav.primary_button"
            className="btn-primary mt-2 w-full text-center block py-3 rounded-full font-semibold text-sm"
            onClick={() => setMenuOpen(false)}
          >
            Order Now
          </a>
        </div>
      )}
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function HeroSection() {
  const heroWords = ["Shree", "Ram", "Bakery"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.96 0.025 90) 0%, oklch(0.93 0.04 80) 50%, oklch(0.91 0.05 75) 100%)",
      }}
    >
      {/* Floating decorative elements */}
      <span
        className="absolute top-24 left-[8%] text-3xl float-slow opacity-40 select-none"
        aria-hidden
      >
        ✦
      </span>
      <span
        className="absolute top-36 right-[10%] text-2xl sparkle-anim opacity-50 select-none"
        aria-hidden
      >
        ✦
      </span>
      <span
        className="absolute top-1/2 left-[5%] text-4xl float-medium opacity-20 select-none"
        aria-hidden
      >
        🌾
      </span>
      <span
        className="absolute bottom-32 right-[8%] text-3xl float-fast opacity-30 select-none"
        aria-hidden
      >
        🍃
      </span>
      <span
        className="absolute top-40 left-1/4 text-lg sparkle-anim-delay opacity-40 select-none"
        aria-hidden
      >
        ✦
      </span>
      <span
        className="absolute bottom-40 left-[15%] text-2xl float-slow opacity-25 select-none"
        aria-hidden
      >
        ✦
      </span>
      <span
        className="absolute top-28 right-[30%] text-xl float-medium opacity-35 select-none"
        aria-hidden
      >
        ✧
      </span>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Label */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          style={{
            background: "oklch(0.72 0.10 66 / 0.15)",
            color: "oklch(0.50 0.10 60)",
            animation: "fadeInDown 0.6s ease forwards",
          }}
        >
          <span>🎂</span> Est. in Jaipur, Rajasthan
        </div>

        {/* Animated headline */}
        <h1
          className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "oklch(0.27 0.05 42)",
          }}
        >
          {heroWords.map((word, i) => (
            <span
              key={word}
              className="hero-word mr-4"
              style={{ animationDelay: `${0.2 + i * 0.25}s` }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          className="text-xl sm:text-2xl font-light mb-8 gold-shimmer"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            animation: "fadeInUp 0.8s ease 1s forwards",
            opacity: 0,
          }}
        >
          Fresh Baked with Love
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{ animation: "fadeInUp 0.8s ease 1.4s forwards", opacity: 0 }}
        >
          <a
            href="#about"
            data-ocid="hero.primary_button"
            className="btn-primary px-8 py-3.5 rounded-full text-base font-semibold"
          >
            Explore Our Menu
          </a>
          <a
            href="#reviews"
            data-ocid="hero.secondary_button"
            className="px-8 py-3.5 rounded-full text-base font-semibold border-2 transition-all duration-200 hover:shadow-md"
            style={{
              borderColor: "oklch(0.63 0.13 60)",
              color: "oklch(0.44 0.04 42)",
            }}
          >
            Read Reviews
          </a>
        </div>

        {/* Rating pill */}
        <div
          className="inline-flex items-center gap-2 mt-8 px-5 py-2 rounded-full text-sm font-medium"
          style={{
            background: "oklch(0.98 0.015 85)",
            color: "oklch(0.44 0.04 42)",
            boxShadow: "0 2px 12px oklch(0.27 0.05 42 / 0.08)",
            animation: "fadeInUp 0.8s ease 1.8s forwards",
            opacity: 0,
          }}
        >
          <span className="flex">
            {STAR_INDICES.map((idx) => (
              <StarIcon key={idx} size={14} />
            ))}
          </span>
          <span style={{ color: "oklch(0.44 0.04 42)" }}>
            4.9 / 5 · 133 Reviews
          </span>
        </div>
      </div>

      {/* Hero image */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto mt-12 px-4"
        style={{ animation: "fadeInUp 1s ease 0.8s forwards", opacity: 0 }}
      >
        <div className="rounded-3xl overflow-hidden shadow-warm-lg relative">
          <img
            src="/assets/generated/hero-bakery.dim_1200x600.jpg"
            alt="Freshly baked goods at Shree Ram Bakery"
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(to top, oklch(0.27 0.05 42 / 0.3) 0%, transparent 50%)",
            }}
          />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm font-medium opacity-80">Jhotwara, Jaipur</p>
            <p
              className="text-lg font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Open Daily 10 AM – 10 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  const features = [
    { icon: "🎂", label: "Fresh Cakes", desc: "Baked daily with love" },
    { icon: "🥐", label: "Pastries", desc: "Flaky and golden" },
    { icon: "☕", label: "Coffee", desc: "Aromatic & warm" },
    { icon: "⏰", label: "Daily 10AM–10PM", desc: "Every day of the week" },
  ];

  return (
    <section
      id="about"
      className="py-20 lg:py-28 section-observe"
      style={{ background: "oklch(0.97 0.02 85)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text block */}
          <div>
            <div className="scroll-hidden-left">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "oklch(0.63 0.13 60)" }}
              >
                Our Story
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold mt-3 mb-6 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.27 0.05 42)",
                }}
              >
                A Legacy of <span className="gold-shimmer">Taste</span>
              </h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: "oklch(0.44 0.04 42)" }}
              >
                We are open daily from{" "}
                <strong style={{ color: "oklch(0.63 0.13 60)" }}>
                  10 AM to 10 PM
                </strong>
                . Come enjoy freshly baked cakes, flaky pastries, and aromatic
                coffee — all made with love in the heart of Jaipur.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={f.label}
                  className="scroll-hidden card-hover p-4 rounded-2xl"
                  style={{
                    background: "oklch(0.98 0.015 85)",
                    boxShadow: "0 2px 12px oklch(0.27 0.05 42 / 0.06)",
                    transitionDelay: `${i * 0.1}s`,
                  }}
                  data-ocid={`about.item.${i + 1}`}
                >
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.27 0.05 42)" }}
                  >
                    {f.label}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.55 0.04 42)" }}
                  >
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="scroll-hidden-right relative">
            <div className="rounded-3xl overflow-hidden shadow-warm-lg">
              <img
                src="/assets/generated/about-bakery.dim_600x600.jpg"
                alt="Inside Shree Ram Bakery"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -left-5 px-5 py-3 rounded-2xl shadow-warm-lg"
              style={{
                background: "oklch(0.98 0.015 85)",
                border: "2px solid oklch(0.72 0.10 66 / 0.30)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: "oklch(0.27 0.05 42)" }}
                  >
                    Top Rated
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.63 0.13 60)" }}
                  >
                    Jhotwara, Jaipur
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Reviews ───────────────────────────────────────────────────────────────────
function ReviewsSection() {
  const reviews = [
    {
      name: "Deependra Singh",
      initials: "DS",
      text: "Delicious fresh products, soft cakes, polite staff, warm and cozy atmosphere.",
      stars: 5,
    },
    {
      name: "Tannu Shekhawat",
      initials: "TS",
      text: "Excellent food, atmosphere and service. Highly recommended!",
      stars: 5,
    },
  ];

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 section-observe"
      style={{ background: "oklch(0.93 0.04 80)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="scroll-hidden">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "oklch(0.63 0.13 60)" }}
          >
            Customer Love
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "oklch(0.27 0.05 42)",
            }}
          >
            What Our Customers Say
          </h2>

          {/* Overall rating */}
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-12"
            style={{
              background: "oklch(0.98 0.015 85)",
              boxShadow: "0 4px 20px oklch(0.27 0.05 42 / 0.08)",
            }}
          >
            <span
              className="text-3xl font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.27 0.05 42)",
              }}
            >
              4.9
            </span>
            <div className="text-left">
              <div className="flex gap-0.5">
                {STAR_INDICES.map((idx) => (
                  <StarIcon key={idx} size={16} />
                ))}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.55 0.04 42)" }}
              >
                133 Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="scroll-hidden card-hover p-6 rounded-3xl text-left"
              style={{
                background: "oklch(0.98 0.015 85)",
                boxShadow: "0 4px 20px oklch(0.27 0.05 42 / 0.07)",
                transitionDelay: `${i * 0.15}s`,
              }}
              data-ocid={`reviews.item.${i + 1}`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {STAR_INDICES.slice(0, r.stars).map((idx) => (
                  <StarIcon key={idx} size={16} />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-base leading-relaxed mb-6 italic"
                style={{ color: "oklch(0.44 0.04 42)" }}
              >
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "oklch(0.63 0.13 60)",
                    color: "oklch(0.97 0.02 85)",
                  }}
                >
                  {r.initials}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.27 0.05 42)" }}
                  >
                    {r.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.63 0.13 60)" }}
                  >
                    Verified Customer
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const info = [
    {
      icon: "📞",
      label: "Phone",
      value: "074268 96259",
      href: "tel:07426896259",
    },
    {
      icon: "📍",
      label: "Address",
      value:
        "Shop No 1/2, Shree Ram Nagar, 100 Feet Road, Karni Chorha, Jhotwara, Jaipur 302012",
      href: "https://maps.google.com/?q=Jhotwara+Jaipur+302012",
    },
    {
      icon: "🕐",
      label: "Hours",
      value: "Mon–Sun: 10 AM – 10 PM",
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 section-observe"
      style={{ background: "oklch(0.97 0.02 85)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 scroll-hidden">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "oklch(0.63 0.13 60)" }}
          >
            Come See Us
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "oklch(0.27 0.05 42)",
            }}
          >
            Visit Us in Jaipur
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Info cards */}
          <div className="space-y-4">
            {info.map((item, i) => (
              <div
                key={item.label}
                className="scroll-hidden-left card-hover p-5 rounded-2xl flex items-start gap-4"
                style={{
                  background: "oklch(0.98 0.015 85)",
                  boxShadow: "0 2px 12px oklch(0.27 0.05 42 / 0.06)",
                  transitionDelay: `${i * 0.1}s`,
                }}
                data-ocid={`contact.item.${i + 1}`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "oklch(0.72 0.10 66 / 0.15)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: "oklch(0.63 0.13 60)" }}
                  >
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm leading-relaxed hover:underline"
                      style={{ color: "oklch(0.44 0.04 42)" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.44 0.04 42)" }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="scroll-hidden-right">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 8px 32px oklch(0.27 0.05 42 / 0.12)" }}
            >
              <iframe
                title="Shree Ram Bakery Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.5!2d75.7372!3d26.9524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3b5a4b5a4b5%3A0x0!2sJhotwara%2C+Jaipur%2C+Rajasthan+302012!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="py-12" style={{ background: "oklch(0.27 0.05 42)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <WheatIcon
                className="w-6 h-6"
                style={{ color: "oklch(0.72 0.10 66)" }}
              />
              <span
                className="font-bold text-base tracking-wide"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.97 0.02 85)",
                }}
              >
                SHREE RAM BAKERY
              </span>
            </div>
            <p className="text-sm" style={{ color: "oklch(0.72 0.10 66)" }}>
              Fresh Baked with Love
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex gap-6">
            {["Home", "Our Story", "Reviews", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${
                  link === "Home"
                    ? "home"
                    : link === "Our Story"
                      ? "about"
                      : link.toLowerCase()
                }`}
                data-ocid="footer.link"
                className="text-sm transition-colors duration-200"
                style={{ color: "oklch(0.72 0.10 66 / 0.7)" }}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid oklch(0.72 0.10 66 / 0.15)",
            color: "oklch(0.72 0.10 66 / 0.5)",
          }}
        >
          <p>© {year} Shree Ram Bakery. Made with ❤️ in Jaipur.</p>
          <p className="mt-1">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              className="hover:underline"
              style={{ color: "oklch(0.72 0.10 66 / 0.7)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollAnimationMultiple();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
