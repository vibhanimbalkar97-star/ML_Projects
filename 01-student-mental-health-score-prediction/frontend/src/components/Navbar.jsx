
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

// Navigation links live in one array, so desktop and mobile menus stay in sync.
const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/prediction', label: 'Prediction', end: false },
]

// Shared focus style (design system rule: always show focus)
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'

// NavLink lets us style the link for the page we are currently on.
const linkClass = (mobile) => ({ isActive }) =>
  `rounded-md px-3 font-medium transition-colors ${
    mobile ? 'block py-2.5 text-base' : 'py-2 text-sm'
  } ${focusRing} ${
    isActive
      ? 'bg-teal-50 font-semibold text-teal-800'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

const ctaClass = `inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 ${focusRing}`

export default function Navbar() {
  // Only the mobile menu needs state: open or closed.
  const [isOpen, setIsOpen] = useState(false)
  
  const closeMenu = () => setIsOpen(false)

  // Close the mobile menu when the user presses Escape.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        {/* Logo / brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded-md ${focusRing}`}
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white"
          >
            {/* Simple pulse-line icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h4l3-7 4 14 3-7h4" />
            </svg>
          </span>
          <span className="text-lg font-bold text-slate-900">Mental Health Score</span>
        </Link>

        {/* Desktop navigation (md and up) */}
        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={linkClass(false)}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/prediction" className={`ml-3 ${ctaClass}`}>
            Start Prediction
          </Link>
        </div>

        {/* Mobile menu button (below md) */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 md:hidden ${focusRing}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={closeMenu}
                  className={linkClass(true)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/prediction"
            onClick={closeMenu}
            className={`mt-3 w-full ${ctaClass}`}
          >
            Start Prediction
          </Link>
        </div>
      )}
    </header>
  )
}
