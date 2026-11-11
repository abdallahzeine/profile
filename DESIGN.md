# Design System — Warm Editorial

Portable design spec. Copy into any project to reproduce the look: warm paper canvas, one terracotta accent, hairline rules, near-black ink, single typeface, restrained motion.

Framework-agnostic. Examples use Tailwind v4 + DaisyUI syntax, but every value is plain CSS and can be ported.

## Principles

1. **One accent.** Terracotta is the only saturated color. Use for emphasis, links, hover, cursor, chips.
2. **Warm neutrals.** Canvas is cream, never pure white. Rules are warm grey, never cool.
3. **Hairlines over shadows.** Separate surfaces with 1px borders. Shadows only on floating UI (docks, tooltips, modals).
4. **One typeface.** Space Grotesk for display, body and labels.
5. **Tight display, loose body.** Big headings: light weight, negative tracking. Body: relaxed leading.
6. **Opacity for hierarchy.** Step text down with opacity (70 / 60 / 50 / 40%), not new colors.
7. **Gentle motion.** Fade + small rise on scroll-in, once. No looping animation except a blinking cursor.
8. **Light theme only.**

## Color

### Core palette

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#F4F3EE` | Page background, card fill |
| `surface-alt` | `#FAFAFA` | Image placeholder, subtle fill |
| `surface-sunken` | `#F2F2F2` | Tertiary fill |
| `ink` | `#333336` | Text, dark buttons, dark floating surfaces |
| `accent` | `#C15F3C` | Terracotta: emphasis, links, hover, cursor |
| `on-accent` | `#F9F9FA` | Text on accent |
| `stone` | `#B1ADA1` | Muted secondary |
| `muted-green` | `#4A615E` | Rare muted tone |
| `ink-secondary` | `#5C5A61` | Secondary text |
| `rule` | `#e0dcd2` | Default hairline |
| `rule-strong` | `#c9c4b8` | Hover border / underline |
| `focus` | `#4c6ee6` | Keyboard focus ring |

### Status

| Token | Hex | Text-on |
|---|---|---|
| info | `#5D9FEB` | `#2D3B5C` |
| success | `#66CA7A` | `#2F5B3F` |
| warning | `#F0C854` | `#8C5A1D` |
| error | `#E86D6D` | `#5C2222` |

### Rules

- Text selection: accent background, on-accent text.
- Accent tints: 10% fill + 30% border (chips); 15% fill (badges).
- Dark surfaces use `ink` at 90% + backdrop blur. Modal scrims `ink` at 90–95%. Never pure black.
- Hierarchy via text opacity on ink: body 70%, secondary 60–65%, tertiary 50%, metadata 40%.
- Contrast: accent is for large text, links, short labels. Not long body copy.

### CSS tokens (copy-paste)

```css
:root {
  --canvas: #F4F3EE;
  --surface-alt: #FAFAFA;
  --surface-sunken: #F2F2F2;
  --ink: #333336;
  --ink-secondary: #5C5A61;
  --accent: #C15F3C;
  --on-accent: #F9F9FA;
  --stone: #B1ADA1;
  --rule: #e0dcd2;
  --rule-strong: #c9c4b8;
  --focus: #4c6ee6;

  --radius-sm: 0.25rem;
  --radius-card: 1rem;
  --radius-modal: 22px;
  --radius-pill: 9999px;

  --font-sans: "Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif;
}

body {
  font-family: var(--font-sans);
  background: var(--canvas);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
::selection { background: var(--accent); color: var(--on-accent); }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

### DaisyUI theme (optional)

```css
@plugin "daisyui/theme" {
  name: "Warm";
  default: false;
  color-scheme: "light";
  --color-base-100: #F4F3EE;
  --color-base-200: #FAFAFA;
  --color-base-300: #F2F2F2;
  --color-base-content: #333336;
  --color-primary: #C15F3C;
  --color-primary-content: #F9F9FA;
  --color-secondary: #B1ADA1;
  --color-secondary-content: #F9F9FA;
  --color-accent: #F4F3EE;
  --color-accent-content: #4A615E;
  --color-neutral: #ffffff;
  --color-neutral-content: #5C5A61;
  --color-info: #5D9FEB;
  --color-info-content: #2D3B5C;
  --color-success: #66CA7A;
  --color-success-content: #2F5B3F;
  --color-warning: #F0C854;
  --color-warning-content: #8C5A1D;
  --color-error: #E86D6D;
  --color-error-content: #5C2222;
  --radius-selector: 0.25rem;
  --radius-field: 0.25rem;
  --radius-box: 1rem;
  --border: 2px;
  --depth: 1;
  --noise: 0;
}

@theme {
  --font-sans: "Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif;
  --color-rule: #e0dcd2;
  --color-rule-strong: #c9c4b8;
}
```

## Typography

Font: **Space Grotesk**, weights 400 / 500 / 700. Same family for display, body, labels and mono-style labels.

| Role | Spec |
|---|---|
| Display / section heading | weight 400, line-height 1.02, letter-spacing −0.03em; 36px → 48px → 60px (mobile → md → lg) |
| Hero heading | 30px → 36px → 48px, bold/extrabold, tight tracking, snug leading; key phrase in accent |
| Card title | 20px, weight 500, tracking tight, accent color |
| Lead text | 18px → 20px, ink at 70% |
| Body | 14px, leading relaxed (1.625), ink at 70% |
| Eyebrow label | 13px, weight 500, UPPERCASE, letter-spacing 0.28px; accent, preceded by 6px accent dot |
| Meta / tags | eyebrow style at 11px, ink at 40%, items joined with ` / ` |

```css
.display { font-weight: 400; line-height: 1.02; letter-spacing: -0.03em; }
.eyebrow { font-size: .8125rem; font-weight: 500; letter-spacing: .28px; text-transform: uppercase; }
```

## Layout & Spacing

- Container: max-width 72rem (`max-w-6xl`), centered, 16px gutters (hero: 32px → 64px at md/lg).
- Section vertical padding: 64px mobile, 80px md+.
- Section header: centered. Order: eyebrow → display heading → 96px × 1px `rule` divider. 56px below.
- Grids: 24px gap. 1 column → 2 at md → 3 at lg.
- Hero: full viewport height, left-aligned, vertically centered, 128px gradient fade to canvas at the bottom.
- Reserve bottom padding for any fixed bottom dock.

## Shape

| Element | Radius |
|---|---|
| Cards | 16px |
| Buttons, chips, badges | full pill |
| Floating docks, tooltips | 16px / 12px |
| Modal panel | 22px |
| Inputs, selectors | 4px |
| Thumbnails | 8px |

Cards: 1px `rule` border, canvas fill, no shadow.

## Components

### Button (pill)
`padding 12px 24px; radius pill; font 14px/500; gap 8px; transition 200ms`
- **Dark:** ink bg, canvas text. Hover → accent bg, on-accent text. Default CTA on light surfaces.
- **Light:** canvas bg, ink text. Hover → white. For dark bands.

```css
.btn { display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  padding:.75rem 1.5rem; border-radius:9999px; font-size:.875rem; font-weight:500; line-height:1;
  cursor:pointer; transition: background-color .2s, color .2s; }
.btn-dark { background: var(--ink); color: var(--canvas); }
.btn-dark:hover { background: var(--accent); color: var(--on-accent); }
.btn-light { background: var(--canvas); color: var(--ink); }
.btn-light:hover { background: #fff; }
```

### Text link
Ink text, 1px underline at 25% opacity, 4px offset. Hover: accent text + full-opacity accent underline. 200ms.

```css
.link { text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px;
  text-decoration-color: color-mix(in oklab, var(--ink) 25%, transparent);
  transition: color .2s, text-decoration-color .2s; }
.link:hover { color: var(--accent); text-decoration-color: var(--accent); }
```

### Chip
Pill, padding 6px 14px, 13px/500, accent text, `accent 10%` fill, `accent 30%` 1px border.

```css
.chip { display:inline-flex; align-items:center; gap:.375rem; padding:.375rem .875rem;
  border-radius:9999px; font-size:.8125rem; font-weight:500; color:var(--accent);
  border:1px solid color-mix(in oklab, var(--accent) 30%, transparent);
  background: color-mix(in oklab, var(--accent) 10%, transparent); }
```

### Card
1px `rule` border, 16px radius, canvas fill. Hover: border → `rule-strong` (300ms).
- Optional 16:9 media on top, `object-cover`; image scales to 105% over 500ms on hover. Optional hover overlay: ink at 40% with a centered white-ish pill label.
- Body padding 24px. Stack: title (accent) → icon row (18px, ink 50%, hover accent) → description → bullet list (14px, ink 65%) → footer.
- Footer: pinned bottom (`margin-top:auto`), 1px `rule` top border, 16px top padding, eyebrow-style tags at 40%.

### Floating dock (bottom nav)
- Fixed bottom 24px. Desktop: centered nav dock, optional second dock bottom-left. Mobile: full-width (16px side inset), icon above 10px label.
- Surface: ink at 90%, `backdrop-filter: blur(24px)`, radius 16px, heavy shadow, 1px white-10% border, padding 8px.
- Items: 40×40, radius 12px, icon 20px in canvas at 80%; hover → accent.
- Hover: scale 1.15, translateY −4px, 200ms. Tap: scale 0.95.
- Tooltip above: accent pill, on-accent 12px/500 text, radius 8px, small arrow.
- Entrance: spring slide up from 100px + fade.

### Inline tooltip
Trigger: accent text, weight 500, 2px bottom border at 20% → 100% on hover. Panel above: canvas at 90%, blur, radius 12px, large soft shadow, 1px light border, row of small chips (icon + 12px semibold name). 200ms fade + 10px rise.

### Modal / lightbox
- Scrim: ink at 90% (nested preview 95%) + blur.
- Panel: canvas fill, 1px `rule`, 22px radius, padding 24px, max 90vh scroll.
- Close: 36px round button, 1px `rule` border, top-right 16px, ink 60% → ink on hover.
- Enter: scale 0.9 → 1 and fade. Click scrim to close.

### Typing hero (optional)
Characters appear at 20ms each: heading first, then subtitle. Block cursor in accent (0.6em × 1em) blinks every 530ms; 3s after typing ends it collapses into an 8px dot. Supporting content fades up (20px, 600ms) after typing.

## Motion

| Pattern | Spec |
|---|---|
| Scroll reveal | opacity 0→1, translateY 20→0, run once, stagger `index × 100ms` |
| Hover color change | 200ms ease |
| Card border | 300ms |
| Image zoom | 500ms |
| Dock item hover | scale 1.15, y −4 |
| Anchor scroll | cubic ease-in-out, 600–1100ms scaled by distance |
| Tooltip | 150–200ms fade + 10px offset |

Honor `prefers-reduced-motion` for any large-travel or looping animation.

## Accessibility

- Always keep the 2px focus ring.
- Ink `#333336` on canvas `#F4F3EE` passes AA. 40% opacity text is decorative metadata only.
- Icon-only buttons need `aria-label`.
- Images need meaningful `alt`.
- Hover-only tooltips must not hold essential info.

## Iconography

Line/solid icons from a single set (e.g. `react-icons` Fa + Fi). 18–20px. Inherit text color; hover → accent. Brand-colored icons only inside tooltips.

## Do / Don't

- Do use hairline borders, warm neutrals, opacity-based text hierarchy.
- Do keep exactly one accent color.
- Don't add gradients (except the hero bottom fade), colored shadows, or heavy shadows on content.
- Don't add a second font family.
- Don't use pure `#000` or `#fff` for large surfaces.
- Don't add dark mode unless the whole palette is redesigned.
