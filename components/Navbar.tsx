import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Features", href: "#features", icon: "✨" },
  { label: "Stats", href: "#stats", icon: "📊" },
];

const EXTERNAL_LINKS = [
  { label: "Invite Bot", href: "https://discord.com/oauth2/authorize?client_id=1373611245206372444&permissions=8&integration_type=0&scope=bot+applications.commands", icon: "🤖" },
  { label: "Join Server", href: "https://discord.gg/Zg2XkS5hq9", icon: "💬" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, right: 0, left: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 40px)", height: "64px",
        background: scrolled ? "rgba(6,7,13,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "background 0.4s, border-bottom 0.4s, backdrop-filter 0.4s",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", zIndex: 1001 }}>
          <div style={{ position: "relative", width: 36, height: 36 }}>
            <div style={{
              position: "absolute", inset: "-2px", borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              animation: "orbitSpin 4s linear infinite",
            }} />
            <Image src="/logo.jpg" alt="AvalonX" width={36} height={36}
              style={{ borderRadius: "50%", position: "relative", zIndex: 1, border: "2px solid #06070d" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em" }}>
            Avalon<span style={{
              background: "linear-gradient(135deg, #9d5ff5, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>X</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hide-mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} style={{
              padding: "8px 14px", borderRadius: "10px", fontSize: "0.88rem",
              fontWeight: 500, color: "var(--text-secondary)", transition: "color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              {link.label}
            </a>
          ))}
          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />
          <a
            href="https://discord.com/oauth2/authorize?client_id=1373611245206372444&permissions=8&integration_type=0&scope=bot+applications.commands"
            target="_blank" rel="noopener noreferrer"
            style={{
              padding: "8px 18px", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600,
              background: "linear-gradient(135deg, #7c3aed, #9d5ff5)", color: "#fff",
              boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(124,58,237,0.55)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(124,58,237,0.35)"; }}>
            Add to Discord
          </a>
        </div>

        {/* Hamburger */}
        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{
              background: open ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${open ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.08)"}`,
              cursor: "pointer", padding: "0",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
              width: "42px", height: "42px", borderRadius: "12px",
              transition: "background 0.25s, border-color 0.25s",
              gap: 0,
            } as React.CSSProperties}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: "18px", height: "2px",
                backgroundColor: open ? "#9d5ff5" : "#e2e8f0",
                borderRadius: "2px",
                transition: "transform 0.35s cubic-bezier(.77,0,.175,1), opacity 0.25s, background 0.25s",
                ...(i === 0 ? { transform: open ? "translateY(6px) rotate(45deg)" : "translateY(-4px)" } :
                   i === 1 ? { opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)" } :
                              { transform: open ? "translateY(-6px) rotate(-45deg)" : "translateY(4px)" }),
              }} />
            ))}
          </button>

          {/* Dropdown */}
          <div style={{
            position: "absolute", top: "calc(100% + 10px)", right: 0,
            minWidth: "240px",
            background: "rgba(10,11,20,0.97)",
            backdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "18px", padding: "10px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.08)",
            transform: open ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.94)",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "all" : "none",
            transition: "transform 0.28s cubic-bezier(.16,1,.3,1), opacity 0.22s",
            transformOrigin: "top right",
          }}>
            <div style={{ padding: "6px 12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "6px" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Navigation</p>
            </div>

            {NAV_LINKS.map((link, i) => (
              <a key={link.label} href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "10px 12px", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 500,
                  color: "#e2e8f0", transition: "background 0.15s, color 0.15s",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-10px)",
                  transitionDelay: open ? `${i * 0.04}s` : "0s",
                  transitionProperty: "background, color, opacity, transform",
                  transitionDuration: "0.15s, 0.15s, 0.3s, 0.3s",
                  transitionTimingFunction: "ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; }}>
                <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>{link.icon}</span>
                {link.label}
              </a>
            ))}

            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "8px 4px" }} />
            <div style={{ padding: "6px 12px 8px" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Discord</p>
            </div>

            {EXTERNAL_LINKS.map((link, i) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 12px", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 500,
                  color: "#c4b5fd", transition: "background 0.15s, color 0.15s",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-10px)",
                  transitionDelay: open ? `${(NAV_LINKS.length + i) * 0.04}s` : "0s",
                  transitionProperty: "background, color, opacity, transform",
                  transitionDuration: "0.15s, 0.15s, 0.3s, 0.3s",
                  transitionTimingFunction: "ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#c4b5fd"; }}>
                <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>{link.icon}</span>
                  {link.label}
                </span>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5.5M9.5 2.5V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}

            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "8px 4px 10px" }} />
            <a
              href="https://discord.com/oauth2/authorize?client_id=1373611245206372444&permissions=8&integration_type=0&scope=bot+applications.commands"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "11px 14px", borderRadius: "12px", fontSize: "0.9rem", fontWeight: 700,
                background: "linear-gradient(135deg, #7c3aed, #9d5ff5)", color: "#fff",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Add to Discord
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
