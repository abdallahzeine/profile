'use client'

import { useSyncExternalStore } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { colorModeStorageKey } from '../app/color-mode'
import { revealColorMode } from '../lib/reveal-color-mode'

const systemDarkMode = '(prefers-color-scheme: dark)'
const colorModeChange = 'profile-color-mode-change'

function isInverseMode() {
  const mode = document.documentElement.dataset.colorMode
  return mode ? mode === 'dark' : window.matchMedia(systemDarkMode).matches
}

function subscribeToColorMode(onChange) {
  const preference = window.matchMedia(systemDarkMode)
  const syncStorage = (event) => {
    if (event.key !== colorModeStorageKey && event.key !== null) return

    const mode = event.newValue
    if (mode === 'dark' || mode === 'light') {
      document.documentElement.dataset.colorMode = mode
    } else {
      delete document.documentElement.dataset.colorMode
    }
    onChange()
  }

  preference.addEventListener('change', onChange)
  window.addEventListener(colorModeChange, onChange)
  window.addEventListener('storage', syncStorage)

  return () => {
    preference.removeEventListener('change', onChange)
    window.removeEventListener(colorModeChange, onChange)
    window.removeEventListener('storage', syncStorage)
  }
}

function applyColorMode(mode) {
  document.documentElement.dataset.colorMode = mode
  try {
    window.localStorage.setItem(colorModeStorageKey, mode)
  } catch {
    // Apply the choice for this visit if storage is unavailable.
  }
  window.dispatchEvent(new Event(colorModeChange))
}

function toggleColorMode() {
  if (document.documentElement.hasAttribute('data-color-mode-transition')) return
  const mode = isInverseMode() ? 'light' : 'dark'
  revealColorMode(mode, applyColorMode)
}

const getServerSnapshot = () => false

export default function ThemeToggle({ showLabel = false }) {
  const inverse = useSyncExternalStore(subscribeToColorMode, isInverseMode, getServerSnapshot)
  const Icon = inverse ? FiSun : FiMoon
  const size = showLabel ? 'min-w-0 flex-1 flex-col gap-1 py-2' : 'h-10 w-10'

  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-xl text-base-100/80 transition-colors duration-200 hover:text-[color:var(--dock-hover-color)] ${size}`}
      aria-label="Theme: inverse dark mode"
      aria-pressed={inverse}
      title="Inverse dark mode"
      onClick={toggleColorMode}
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
      {showLabel && <span className="text-[10px] font-medium">Theme</span>}
    </button>
  )
}
