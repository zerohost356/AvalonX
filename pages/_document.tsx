import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="theme-color" content="#7c3aed" />
        <meta property="og:image" content="/logo.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        <style dangerouslySetInnerHTML={{ __html: `
          #avx-loader {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: #06070d;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: opacity 0.6s ease, visibility 0.6s ease;
          }
          #avx-loader.avx-hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }

          /* dots grid bg */
          #avx-loader::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            pointer-events: none;
            mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
            -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
          }

          /* glow */
          #avx-loader::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -60%);
            width: 500px;
            height: 400px;
            background: radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%);
            pointer-events: none;
          }

          .avx-logo-wrap {
            position: relative;
            width: 100px;
            height: 100px;
            margin-bottom: 28px;
          }

          .avx-ring {
            position: absolute;
            inset: -6px;
            border-radius: 50%;
            background: conic-gradient(from 0deg, #7c3aed, #9d5ff5, #06b6d4, #7c3aed);
            animation: avx-spin 1.4s linear infinite;
          }

          .avx-ring::before {
            content: '';
            position: absolute;
            inset: 3px;
            border-radius: 50%;
            background: #06070d;
          }

          .avx-ring-outer {
            position: absolute;
            inset: -14px;
            border-radius: 50%;
            border: 1px dashed rgba(124,58,237,0.2);
            animation: avx-spin-rev 3s linear infinite;
          }

          .avx-ring-outer::after {
            content: '';
            position: absolute;
            top: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #9d5ff5;
            box-shadow: 0 0 8px #9d5ff5;
          }

          .avx-logo-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            z-index: 1;
            animation: avx-float 3s ease-in-out infinite;
          }

          .avx-title {
            font-family: 'Inter', -apple-system, sans-serif;
            font-size: 2rem;
            font-weight: 900;
            letter-spacing: -0.04em;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #ffffff 20%, #c4b5fd 60%, #9d5ff5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
            z-index: 1;
          }

          .avx-title span {
            background: linear-gradient(135deg, #9d5ff5, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .avx-subtitle {
            font-family: 'Inter', -apple-system, sans-serif;
            font-size: 0.8rem;
            color: rgba(148,163,184,0.7);
            letter-spacing: 0.14em;
            text-transform: uppercase;
            font-weight: 500;
            margin-bottom: 40px;
            position: relative;
            z-index: 1;
          }

          .avx-bar-wrap {
            width: 160px;
            height: 2px;
            background: rgba(255,255,255,0.07);
            border-radius: 99px;
            overflow: hidden;
            position: relative;
            z-index: 1;
          }

          .avx-bar {
            height: 100%;
            border-radius: 99px;
            background: linear-gradient(90deg, #7c3aed, #9d5ff5, #06b6d4);
            animation: avx-progress 1.8s ease-in-out infinite;
            background-size: 200% 100%;
          }

          .avx-dots {
            display: flex;
            gap: 6px;
            margin-top: 20px;
            position: relative;
            z-index: 1;
          }

          .avx-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: rgba(157,95,245,0.5);
            animation: avx-dot-bounce 1.2s ease-in-out infinite;
          }
          .avx-dot:nth-child(2) { animation-delay: 0.15s; }
          .avx-dot:nth-child(3) { animation-delay: 0.3s; }
          .avx-dot:nth-child(4) { animation-delay: 0.45s; }
          .avx-dot:nth-child(5) { animation-delay: 0.6s; }

          @keyframes avx-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes avx-spin-rev {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          @keyframes avx-float {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-5px); }
          }
          @keyframes avx-progress {
            0%   { transform: translateX(-100%); }
            50%  { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
          @keyframes avx-dot-bounce {
            0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
            40%            { transform: scale(1.2); opacity: 1; }
          }
        `}} />
      </Head>
      <body>
        {/* Loading screen — renders immediately, pure HTML/CSS, no JS needed */}
        <div id="avx-loader" aria-hidden="true">
          <div className="avx-logo-wrap">
            <div className="avx-ring-outer" />
            <div className="avx-ring" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="" className="avx-logo-img" />
          </div>

          <div className="avx-title">
            Avalon<span>X</span>
          </div>
          <div className="avx-subtitle">Loading your experience</div>

          <div className="avx-bar-wrap">
            <div className="avx-bar" />
          </div>

          <div className="avx-dots">
            <div className="avx-dot" />
            <div className="avx-dot" />
            <div className="avx-dot" />
            <div className="avx-dot" />
            <div className="avx-dot" />
          </div>
        </div>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
