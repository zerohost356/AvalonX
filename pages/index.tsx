import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Particles from "../components/Particles";
import { useInView, useCounter } from "../hooks/useInView";

/* ── data ── */
const FEATURES = [
  { icon: "🛡️", title: "Advanced Moderation", desc: "Auto-mod, ban, kick, mute, warn, and content filters to keep your server safe 24/7." },
  { icon: "🎵", title: "Crystal-Clear Music", desc: "High-quality audio from YouTube, Spotify & SoundCloud with queue, filters, and 24/7 mode." },
  { icon: "🎮", title: "Fun & Games", desc: "Mini-games, trivia, leaderboards, and interactive commands to keep members entertained." },
  { icon: "📊", title: "Server Analytics", desc: "Deep insights into member activity, message trends, voice time, and growth charts." },
  { icon: "🎁", title: "Giveaways & Events", desc: "Host giveaways with custom requirements, timers, winner rerolls, and automated reminders." },
  { icon: "⚙️", title: "Fully Customizable", desc: "Custom prefixes, role permissions, module toggles — configure everything your way." },
];


/* ── animated counter ── */
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, inView } = useInView(0.2);
  const count = useCounter(value, inView);
  return (
    <div ref={ref} style={{
      textAlign: "center",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.7s ${delay}s cubic-bezier(.16,1,.3,1), transform 0.7s ${delay}s cubic-bezier(.16,1,.3,1)`,
    }}>
      <div style={{
        fontSize: "clamp(2.2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em",
        background: "linear-gradient(135deg, #e2d9ff 0%, #9d5ff5 50%, #06b6d4 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        lineHeight: 1,
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem", fontWeight: 500, marginTop: "6px", letterSpacing: "0.02em" }}>
        {label}
      </div>
    </div>
  );
}

/* ── feature card ── */
function FeatureCard({ f, i }: { f: typeof FEATURES[0]; i: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className="feature-card" style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
      transition: `opacity 0.6s ${(i % 3) * 0.1}s cubic-bezier(.16,1,.3,1), transform 0.6s ${(i % 3) * 0.1}s cubic-bezier(.16,1,.3,1)`,
    }}>
      <div style={{
        width: "52px", height: "52px", borderRadius: "14px",
        background: "rgba(124,58,237,0.14)", border: "1px solid rgba(124,58,237,0.22)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.6rem", marginBottom: "18px",
        transition: "transform 0.3s",
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.12) rotate(-4deg)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1) rotate(0)"; }}>
        {f.icon}
      </div>
      <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "10px", letterSpacing: "-0.01em" }}>{f.title}</h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{f.desc}</p>
    </div>
  );
}

/* ── main page ── */
const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const [typeText, setTypeText] = useState("");
  const phrases = ["Moderation", "Music", "Games", "Analytics", "Giveaways"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  /* mount fade-in */
  useEffect(() => { setMounted(true); }, []);

  /* typewriter */
  useEffect(() => {
    const tick = () => {
      const phrase = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTypeText(phrase.slice(0, charIdx.current));
        if (charIdx.current === phrase.length) {
          deleting.current = true;
          return setTimeout(tick, 1800);
        }
      } else {
        charIdx.current--;
        setTypeText(phrase.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 45 : 90);
    };
    const t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statsRef = useInView(0.1);
  const featuresRef = useInView(0.1);
  const ctaRef = useInView(0.1);

  return (
    <>
      <Head>
        <title>AvalonX — The Ultimate Discord Bot</title>
        <meta name="description" content="AvalonX is a powerful, all-in-one Discord bot with moderation, music, games, analytics, and more." />
        <meta property="og:title" content="AvalonX — The Ultimate Discord Bot" />
        <meta property="og:description" content="Supercharge your Discord server with AvalonX." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          padding: "100px clamp(16px, 5vw, 60px) 80px",
          position: "relative", overflow: "hidden",
        }}>
          <Particles />

          {/* Glow blobs */}
          <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "min(700px, 100vw)", height: "500px", background: "radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "0%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "30%", left: "0%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(157,95,245,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)" }} />

          <div style={{ textAlign: "center", maxWidth: "820px", position: "relative", zIndex: 1, width: "100%" }}>

            {/* badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
              borderRadius: "100px", padding: "6px 18px", fontSize: "0.8rem",
              color: "#c4b5fd", marginBottom: "32px", fontWeight: 500,
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s 0.1s cubic-bezier(.16,1,.3,1), transform 0.8s 0.1s cubic-bezier(.16,1,.3,1)",
            }}>
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#7c3aed", animation: "ping 1.5s cubic-bezier(0,0,.2,1) infinite" }} />
              </span>
              Now serving 10,000+ Discord servers
            </div>

            {/* logo */}
            <div style={{
              marginBottom: "28px", display: "flex", justifyContent: "center",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0) scale(1)" : "translateY(30px) scale(0.8)",
              transition: "opacity 0.9s 0.2s cubic-bezier(.16,1,.3,1), transform 0.9s 0.2s cubic-bezier(.16,1,.3,1)",
            }}>
              <div style={{ position: "relative", animation: "float 6s ease-in-out infinite" }}>
                {/* orbit ring */}
                <div style={{
                  position: "absolute", inset: "-16px", borderRadius: "50%",
                  border: "1px dashed rgba(124,58,237,0.25)",
                  animation: "orbitSpin 12s linear infinite",
                }}>
                  <div style={{
                    position: "absolute", top: "-4px", left: "50%", transform: "translateX(-50%)",
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    boxShadow: "0 0 8px rgba(124,58,237,0.8)",
                  }} />
                </div>
                {/* second orbit */}
                <div style={{
                  position: "absolute", inset: "-30px", borderRadius: "50%",
                  border: "1px dashed rgba(6,182,212,0.15)",
                  animation: "orbitSpinReverse 18s linear infinite",
                }}>
                  <div style={{
                    position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)",
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#06b6d4", boxShadow: "0 0 6px rgba(6,182,212,0.8)",
                  }} />
                </div>

                <div style={{
                  position: "absolute", inset: "-3px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #9d5ff5, #06b6d4)",
                  animation: "pulseGlow 3s ease-in-out infinite",
                }} />
                <Image src="/logo.jpg" alt="AvalonX Logo" width={120} height={120} priority
                  style={{ borderRadius: "50%", position: "relative", zIndex: 1, border: "4px solid #06070d" }} />
              </div>
            </div>

            {/* title */}
            <h1 style={{
              fontSize: "clamp(3rem, 9vw, 6rem)", fontWeight: 900, lineHeight: 1.0,
              letterSpacing: "-0.05em", marginBottom: "16px",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s 0.35s cubic-bezier(.16,1,.3,1), transform 0.8s 0.35s cubic-bezier(.16,1,.3,1)",
            }}>
              <span style={{
                background: "linear-gradient(135deg, #ffffff 20%, #c4b5fd 60%, #7c3aed 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Avalon</span>
              <span style={{
                background: "linear-gradient(135deg, #9d5ff5, #06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>X</span>
            </h1>

            {/* typewriter */}
            <div style={{
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 600,
              color: "var(--text-secondary)", marginBottom: "24px", height: "2em",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              opacity: mounted ? 1 : 0, transition: "opacity 0.8s 0.5s",
            }}>
              <span style={{ color: "var(--text-muted)" }}>Powerful</span>
              <span style={{
                color: "#9d5ff5", minWidth: "160px", textAlign: "left",
                borderRight: "2px solid #9d5ff5", paddingRight: "4px",
                animation: "blink 1s step-end infinite",
              }}>{typeText}</span>
              <span style={{ color: "var(--text-muted)" }}>for Discord</span>
            </div>

            <p style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "var(--text-secondary)", lineHeight: 1.75,
              marginBottom: "44px", maxWidth: "540px", margin: "0 auto 44px",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s 0.55s cubic-bezier(.16,1,.3,1), transform 0.8s 0.55s cubic-bezier(.16,1,.3,1)",
            }}>
              The ultimate all-in-one Discord bot — built to supercharge your community with 200+ powerful commands.
            </p>

            <div style={{
              display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s 0.65s cubic-bezier(.16,1,.3,1), transform 0.8s 0.65s cubic-bezier(.16,1,.3,1)",
            }}>
              <a href="https://discord.com/oauth2/authorize?client_id=1373611245206372444&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "1rem", padding: "14px 32px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Add to Discord
              </a>
              <a href="https://discord.gg/Zg2XkS5hq9" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "1rem", padding: "14px 32px" }}>
                Join Support Server
              </a>
            </div>

            {/* scroll indicator */}
            <div style={{
              position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              opacity: mounted ? 0.5 : 0, transition: "opacity 1s 1.2s",
            }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll</span>
              <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(124,58,237,0.6), transparent)", animation: "fadeIn 1s ease-in-out infinite alternate" }} />
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section id="stats" ref={statsRef.ref} style={{
          padding: "clamp(50px, 8vw, 80px) clamp(16px, 5vw, 60px)",
          background: "linear-gradient(180deg, rgba(124,58,237,0.04) 0%, transparent 100%)",
          borderTop: "1px solid rgba(124,58,237,0.1)", borderBottom: "1px solid rgba(124,58,237,0.1)",
        }}>
          <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "clamp(24px, 4vw, 48px)" }}>
            <StatCard value={10000} suffix="+" label="Servers" delay={0} />
            <StatCard value={500000} suffix="+" label="Users" delay={0.1} />
            <StatCard value={200} suffix="+" label="Commands" delay={0.2} />
            <StatCard value={99} suffix=".9%" label="Uptime" delay={0.3} />
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" style={{ padding: "clamp(70px, 10vw, 120px) clamp(16px, 5vw, 60px)" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div ref={featuresRef.ref} style={{
              textAlign: "center", marginBottom: "clamp(40px, 6vw, 72px)",
              opacity: featuresRef.inView ? 1 : 0, transform: featuresRef.inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)",
            }}>
              <p style={{ color: "#9d5ff5", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "12px" }}>What We Offer</p>
              <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "16px" }}>
                Everything your<br />server needs
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                Over 200 commands across every category your community could ever need.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(260px, 28vw, 340px), 1fr))", gap: "20px" }}>
              {FEATURES.map((f, i) => <FeatureCard key={f.title} f={f} i={i} />)}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "clamp(80px, 12vw, 140px) clamp(16px, 5vw, 60px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }} />

          <div ref={ctaRef.ref} style={{
            position: "relative", zIndex: 1,
            opacity: ctaRef.inView ? 1 : 0, transform: ctaRef.inView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
              borderRadius: "100px", padding: "6px 18px", fontSize: "0.8rem",
              color: "#c4b5fd", marginBottom: "28px", fontWeight: 500,
            }}>
              🚀 Free forever — no credit card required
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "16px", lineHeight: 1.1 }}>
              Ready to level up<br />your server?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", marginBottom: "44px", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto 44px" }}>
              Join thousands of communities already powered by AvalonX.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://discord.com/oauth2/authorize?client_id=1373611245206372444&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "1.05rem", padding: "15px 36px" }}>
                Add AvalonX for Free
              </a>
              <a href="https://discord.gg/Zg2XkS5hq9" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "1.05rem", padding: "15px 32px" }}>
                Join Community
              </a>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)" }} />
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          padding: "clamp(28px, 4vw, 44px) clamp(16px, 5vw, 60px)",
          borderTop: "1px solid var(--border)",
          maxWidth: "1140px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="/logo.jpg" alt="AvalonX" width={28} height={28} style={{ borderRadius: "50%", border: "1.5px solid rgba(124,58,237,0.4)" }} />
            <span style={{ fontWeight: 800, fontSize: "1rem" }}>Avalon<span style={{ background: "linear-gradient(135deg, #9d5ff5, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>X</span></span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>© {new Date().getFullYear()} AvalonX · Not affiliated with Discord Inc.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "Support", href: "https://discord.gg/Zg2XkS5hq9" },
              { label: "Invite", href: "https://discord.com/oauth2/authorize?client_id=1373611245206372444&permissions=8&integration_type=0&scope=bot+applications.commands" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--text-muted)", fontSize: "0.85rem", transition: "color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#9d5ff5"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
