import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NotFound: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setMounted(true);
    /* random glitch every few seconds */
    const schedule = () => {
      const delay = 2500 + Math.random() * 4000;
      return setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 600);
        schedule();
      }, delay);
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <title>404 — Page Not Found | AvalonX</title>
        <meta name="description" content="This page doesn't exist. Head back to AvalonX." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{
        minHeight: "100vh", background: "var(--bg-primary)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "clamp(24px, 5vw, 60px)",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>

        {/* Blobs */}
        <div style={{ position: "absolute", top: "20%", left: "15%", width: "clamp(200px,35vw,450px)", height: "clamp(200px,35vw,450px)", background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "10%", width: "clamp(150px,25vw,320px)", height: "clamp(150px,25vw,320px)", background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

        {/* dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)" }} />

        {/* scan line */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)", pointerEvents: "none", opacity: 0.4 }} />

        <div style={{
          position: "relative", zIndex: 1,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)",
        }}>

          {/* Logo */}
          <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", animation: "float 5s ease-in-out infinite" }}>
              <div style={{ position: "absolute", inset: "-3px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(6,182,212,0.5))", animation: "orbitSpin 5s linear infinite" }} />
              <Image src="/logo.jpg" alt="AvalonX" width={72} height={72}
                style={{ borderRadius: "50%", position: "relative", zIndex: 1, border: "3px solid var(--bg-primary)" }} />
            </div>
          </div>

          {/* 404 glitch */}
          <div style={{ position: "relative", marginBottom: "clamp(16px, 3vw, 28px)", userSelect: "none" }}>
            {/* base */}
            <div style={{
              fontSize: "clamp(7rem, 22vw, 13rem)", fontWeight: 900,
              lineHeight: 0.9, letterSpacing: "-0.06em",
              background: "linear-gradient(135deg, #7c3aed 0%, #9d5ff5 40%, #06b6d4 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              position: "relative",
            }}>
              404

              {/* glitch layer 1 */}
              {glitch && (
                <div style={{
                  position: "absolute", inset: 0,
                  fontSize: "clamp(7rem, 22vw, 13rem)", fontWeight: 900,
                  lineHeight: 0.9, letterSpacing: "-0.06em",
                  background: "linear-gradient(135deg, #ef4444, #f97316)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  display: "flex", alignItems: "flex-start", justifyContent: "center",
                  animation: "glitch1 0.5s steps(2, end) both",
                  mixBlendMode: "screen",
                }}>
                  404
                </div>
              )}
              {/* glitch layer 2 */}
              {glitch && (
                <div style={{
                  position: "absolute", inset: 0,
                  fontSize: "clamp(7rem, 22vw, 13rem)", fontWeight: 900,
                  lineHeight: 0.9, letterSpacing: "-0.06em",
                  background: "linear-gradient(135deg, #06b6d4, #10b981)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  display: "flex", alignItems: "flex-start", justifyContent: "center",
                  animation: "glitch2 0.5s steps(2, end) both",
                  mixBlendMode: "screen",
                }}>
                  404
                </div>
              )}
            </div>

            {/* glow */}
            <div style={{ position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)", width: "55%", height: "50px", background: "radial-gradient(ellipse, rgba(124,58,237,0.5) 0%, transparent 70%)", filter: "blur(18px)", pointerEvents: "none" }} />
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "clamp(16px, 3vw, 24px)", justifyContent: "center" }}>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to left, rgba(124,58,237,0.4), transparent)" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Page Not Found</span>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to right, rgba(124,58,237,0.4), transparent)" }} />
          </div>

          <p style={{
            color: "var(--text-secondary)", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.75,
            maxWidth: "400px", margin: "0 auto clamp(28px, 5vw, 44px)",
          }}>
            This page wandered off into the void. It either doesn&apos;t exist or has been moved somewhere else.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn-primary" style={{ fontSize: "0.95rem" }}>
              ← Back to Home
            </Link>
            <a href="https://discord.gg/Zg2XkS5hq9" target="_blank" rel="noopener noreferrer"
              className="btn-secondary" style={{ fontSize: "0.95rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Get Support
            </a>
          </div>

          <div style={{
            marginTop: "clamp(36px, 5vw, 56px)",
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 20px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "100px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              HTTP 404 · The requested resource could not be found
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
