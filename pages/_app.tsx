import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const dismiss = () => {
      const loader = document.getElementById('avx-loader')
      if (!loader) return
      loader.classList.add('avx-hidden')
      setTimeout(() => loader.remove(), 700)
    }

    // Dismiss after page is interactive — whichever comes first: load event or 2.5s timeout
    if (document.readyState === 'complete') {
      setTimeout(dismiss, 200)
    } else {
      window.addEventListener('load', () => setTimeout(dismiss, 200), { once: true })
      // Fallback: always dismiss after 2.5s no matter what
      setTimeout(dismiss, 2500)
    }
  }, [])

  // Re-show loader briefly on route change (SPA navigation)
  useEffect(() => {
    const show = () => {
      const existing = document.getElementById('avx-loader')
      if (existing) { existing.classList.remove('avx-hidden'); return }
      const el = document.createElement('div')
      el.id = 'avx-loader'
      el.innerHTML = `
        <div class="avx-logo-wrap">
          <div class="avx-ring-outer"></div>
          <div class="avx-ring"></div>
          <img src="/logo.jpg" alt="" class="avx-logo-img" />
        </div>
        <div class="avx-title">Avalon<span>X</span></div>
        <div class="avx-subtitle">Loading your experience</div>
        <div class="avx-bar-wrap"><div class="avx-bar"></div></div>
        <div class="avx-dots">
          <div class="avx-dot"></div><div class="avx-dot"></div>
          <div class="avx-dot"></div><div class="avx-dot"></div>
          <div class="avx-dot"></div>
        </div>
      `
      document.body.prepend(el)
    }

    const hide = () => {
      const loader = document.getElementById('avx-loader')
      if (!loader) return
      loader.classList.add('avx-hidden')
      setTimeout(() => loader.remove(), 700)
    }

    router.events.on('routeChangeStart', show)
    router.events.on('routeChangeComplete', hide)
    router.events.on('routeChangeError', hide)

    return () => {
      router.events.off('routeChangeStart', show)
      router.events.off('routeChangeComplete', hide)
      router.events.off('routeChangeError', hide)
    }
  }, [router])

  return <Component {...pageProps} />
}

export default MyApp
