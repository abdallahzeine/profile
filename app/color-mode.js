export const colorModeStorageKey = 'profile-color-mode'

// Apply an explicit choice before the first paint. CSS handles the system default.
export const initializeColorMode = `
  try {
    const mode = localStorage.getItem(${JSON.stringify(colorModeStorageKey)});
    if (mode === 'light' || mode === 'dark') {
      document.documentElement.dataset.colorMode = mode;
    }
  } catch {}
`
