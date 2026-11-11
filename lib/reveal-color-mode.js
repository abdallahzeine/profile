const svgNamespace = 'http://www.w3.org/2000/svg'
const protectedImages = '[data-image-tone="original"], [data-image-tone="dark"]'

function svgElement(name, attributes) {
  const element = document.createElementNS(svgNamespace, name)
  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, value)
  }
  return element
}

function roundedRectPath(bounds, frame, clip) {
  const frameBounds = frame.getBoundingClientRect()
  const left = Math.max(bounds.left, clip.left, frameBounds.left)
  const top = Math.max(bounds.top, clip.top, frameBounds.top)
  const right = Math.min(bounds.right, clip.right, frameBounds.right)
  const bottom = Math.min(bounds.bottom, clip.bottom, frameBounds.bottom)
  if (left >= right || top >= bottom) return ''

  const style = getComputedStyle(frame)
  const maxRadius = Math.min(right - left, bottom - top) / 2
  const radius = (value, insetX, insetY) =>
    Math.min(maxRadius, Math.max(0, (parseFloat(value) || 0) - Math.max(insetX, insetY)))
  const tl = radius(style.borderTopLeftRadius, left - frameBounds.left, top - frameBounds.top)
  const tr = radius(style.borderTopRightRadius, frameBounds.right - right, top - frameBounds.top)
  const br = radius(style.borderBottomRightRadius, frameBounds.right - right, frameBounds.bottom - bottom)
  const bl = radius(style.borderBottomLeftRadius, left - frameBounds.left, frameBounds.bottom - bottom)

  return `M${left + tl} ${top}H${right - tr}A${tr} ${tr} 0 0 1 ${right} ${top + tr}` +
    `V${bottom - br}A${br} ${br} 0 0 1 ${right - br} ${bottom}H${left + bl}` +
    `A${bl} ${bl} 0 0 1 ${left} ${bottom - bl}V${top + tl}A${tl} ${tl} 0 0 1 ${left + tl} ${top}Z`
}

function createImageMask() {
  const svg = svgElement('svg', { width: 0, height: 0, 'aria-hidden': 'true' })
  svg.style.position = 'fixed'
  const mask = svgElement('mask', {
    id: 'color-mode-image-mask',
    maskUnits: 'userSpaceOnUse',
    x: 0,
    y: 0,
  })
  const background = svgElement('rect', { fill: 'white' })
  const images = svgElement('path', { fill: 'black' })
  const foreground = svgElement('path', { fill: 'white' })
  mask.append(background, images, foreground)
  svg.append(mask)

  let previousImages = ''
  let previousForeground = ''
  let previousWidth = 0
  let previousHeight = 0

  function update(overlay) {
    const viewport = overlay.getBoundingClientRect()
    const layer = Array.from(document.querySelectorAll('[data-color-mode-layer]')).at(-1)
    const clip = layer?.getBoundingClientRect() ?? viewport
    const imagePaths = Array.from((layer ?? document).querySelectorAll(protectedImages), (image) => {
      if (image instanceof HTMLImageElement && !image.naturalWidth) return ''
      const frame = image.closest('[data-color-mode-image-frame]') ?? image
      return roundedRectPath(image.getBoundingClientRect(), frame, clip)
    }).join('')
    overlay.toggleAttribute('data-protected', Boolean(imagePaths))
    if (!imagePaths) return

    // Repaint the dock inside the mask where it overlaps a protected image.
    const foregroundPaths = layer ? '' : Array.from(document.querySelectorAll('[data-color-mode-foreground]'),
      (element) => roundedRectPath(element.getBoundingClientRect(), element, viewport)).join('')

    if (viewport.width !== previousWidth || viewport.height !== previousHeight) {
      previousWidth = viewport.width
      previousHeight = viewport.height
      for (const element of [mask, background]) {
        element.setAttribute('width', previousWidth)
        element.setAttribute('height', previousHeight)
      }
    }
    if (imagePaths !== previousImages) {
      previousImages = imagePaths
      images.setAttribute('d', imagePaths)
    }
    if (foregroundPaths !== previousForeground) {
      previousForeground = foregroundPaths
      foreground.setAttribute('d', foregroundPaths)
    }
  }

  return { svg, update }
}

export function revealColorMode(mode, applyMode) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reducedMotion.matches ||
      !CSS.registerProperty || !CSS.supports('backdrop-filter', 'invert(1)') ||
      !CSS.supports('mask-composite', 'intersect')) {
    applyMode(mode)
    return
  }

  const root = document.documentElement
  const overlay = document.createElement('div')
  overlay.className = 'color-mode-reveal'
  overlay.dataset.target = mode
  overlay.setAttribute('aria-hidden', 'true')
  const imageMask = createImageMask()

  root.dataset.colorModeTransition = mode
  document.body.append(imageMask.svg, overlay)
  imageMask.update(overlay)
  applyMode(mode)

  // Track live positions so scrolling and image motion keep working during the reveal.
  let frame
  function updateMask() {
    if (reducedMotion.matches || root.dataset.colorMode !== mode) {
      animation.cancel()
      return
    }
    imageMask.update(overlay)
    frame = requestAnimationFrame(updateMask)
  }
  function finish() {
    cancelAnimationFrame(frame)
    imageMask.svg.remove()
    overlay.remove()
    delete root.dataset.colorModeTransition
  }

  const [animation] = overlay.getAnimations()
  if (!animation) {
    finish()
    return
  }
  frame = requestAnimationFrame(updateMask)
  animation.finished.then(finish, finish)
}
