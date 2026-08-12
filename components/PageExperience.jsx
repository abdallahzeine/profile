'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Projects from './Projects';

// The deep-zoom abyss runs continuously from first paint — the ordinary
// portfolio floats over a background that is already falling endlessly into
// the void. The scroll-up "mystery" entry point that used to hide the
// foreground has been removed, so the page now behaves like a normal
// scrolling portfolio with this ambient background living behind it.
//
// Two persistent image layers alternate forever. Each runs the same cycle,
// phase-offset by half a cycle, so the next image begins appearing WHILE the
// current one is still zoomed in — there is never a gap, never a wait until
// one finishes. The cycling layer zooms 1 -> ZOOM_END, then resets to 1 while
// fully transparent (the reset is hidden behind its partner), so blur and
// framing stay bounded forever instead of degrading into mush.
const ZOOM_START = 1.12;
const ZOOM_END = 2.4;
const CYCLE_SECONDS = 12;
const PHASE_OFFSET = 0.5;
// Each layer also spins endlessly — one clockwise, one counter-clockwise —
// so the dive becomes a slow opposing spiral.
const ROTATION_SECONDS = 26;
// Within one cycle (phase 0..1): scale rises 1 -> ZOOM_END by SCALE_PEAK,
// then snaps back to 1 during the reset window (hidden by zero opacity).
const SCALE_PEAK = 0.85;
const FADE_IN_END = 0.12;
const FULL_END = 0.70;
const FADE_OUT_END = 0.85;
const BACKGROUND_OPACITY = 0.6;

// Pure function: a layer's scale + opacity at a given cycle phase.
const cycleStateAt = (phase, startScale, endScale, maxOpacity) => {
  const p = ((phase % 1) + 1) % 1;
  const scale =
    p < SCALE_PEAK
      ? startScale + (endScale - startScale) * (p / SCALE_PEAK)
      : endScale - (endScale - startScale) * ((p - SCALE_PEAK) / (1 - SCALE_PEAK));
  let opacity;
  if (p < FADE_IN_END) opacity = maxOpacity * (p / FADE_IN_END);
  else if (p < FULL_END) opacity = maxOpacity;
  else if (p < FADE_OUT_END) {
    opacity = maxOpacity * (1 - (p - FULL_END) / (FADE_OUT_END - FULL_END));
  } else opacity = 0;
  return { scale, opacity };
};

const layerStateAt = (phase) =>
  cycleStateAt(phase, ZOOM_START, ZOOM_END, BACKGROUND_OPACITY);

// Inward gradient transparency: opaque at the centre, fading to fully
// transparent at every edge so each layer is a soft floating form rather
// than a hard rectangle, and overlapping layers blend into real depth.
const VIGNETTE =
  'radial-gradient(ellipse closest-side at 50% 50%, #000 50%, rgba(0,0,0,0.55) 82%, transparent 100%)';

// Cursor parallax scales with depth: the nearer (more zoomed-in) layer
// travels further, the further (less zoomed) layer barely moves. This is the
// cue that separates the two layers in space instead of stacking them.
const depthFactor = (scale) =>
  0.4 + 1.2 * Math.min(1, Math.max(0, (scale - ZOOM_START) / (ZOOM_END - ZOOM_START)));

const ZoomBackgroundLayer = ({
  layerRef,
  scale,
  opacity,
  rotate,
  parallaxX,
  parallaxY,
}) => (
  <motion.div
    ref={layerRef}
    className="absolute inset-0 origin-center"
    style={{ x: parallaxX, y: parallaxY, scale, opacity, willChange: 'transform, opacity' }}
    aria-hidden="true"
  >
    {/* Sized a bit smaller than the viewport and aspect-correct, so the image
        floats in the void with transparent edges; it grows to fill the frame
        only as it dives inward. Rotation lives on this element so it pivots
        about its own centre, independent of the parent's scale/parallax. */}
    <motion.div
      className="absolute inset-0 m-auto"
      style={{
        height: '84vh',
        aspectRatio: '2028 / 1144',
        maxWidth: '96vw',
        rotate,
        backgroundImage: "url('/Background.svg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        WebkitMaskImage: VIGNETTE,
        maskImage: VIGNETTE,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        willChange: 'transform',
      }}
    />
  </motion.div>
);

const PageExperience = () => {
  // Two persistent image layers. They are never added or removed — only their
  // scale/opacity/z/rotation are advanced each frame by the loop below.
  const layer0Scale = useMotionValue(ZOOM_START);
  const layer0Opacity = useMotionValue(0);
  const layer1Scale = useMotionValue(ZOOM_START + (ZOOM_END - ZOOM_START) * 0.5);
  const layer1Opacity = useMotionValue(BACKGROUND_OPACITY);
  // Opposing endless spins: layer 0 clockwise, layer 1 counter-clockwise.
  const layer0Rotate = useMotionValue(0);
  const layer1Rotate = useMotionValue(0);
  const layer0Ref = useRef(null);
  const layer1Ref = useRef(null);

  const backgroundX = useMotionValue(0);
  const backgroundY = useMotionValue(0);
  const smoothBackgroundX = useSpring(backgroundX, {
    stiffness: 140,
    damping: 26,
    mass: 0.7,
    restDelta: 0.01,
  });
  const smoothBackgroundY = useSpring(backgroundY, {
    stiffness: 140,
    damping: 26,
    mass: 0.7,
    restDelta: 0.01,
  });

  // Each layer's parallax is the shared cursor offset multiplied by its own
  // depth factor, so the diving layer drifts more than the receding one.
  const layer0ParallaxX = useTransform(
    [smoothBackgroundX, layer0Scale],
    ([x, s]) => x * depthFactor(s),
  );
  const layer0ParallaxY = useTransform(
    [smoothBackgroundY, layer0Scale],
    ([y, s]) => y * depthFactor(s),
  );
  const layer1ParallaxX = useTransform(
    [smoothBackgroundX, layer1Scale],
    ([x, s]) => x * depthFactor(s),
  );
  const layer1ParallaxY = useTransform(
    [smoothBackgroundY, layer1Scale],
    ([y, s]) => y * depthFactor(s),
  );
  const returnAnimations = useRef([]);

  // Advance both layers through their cycles every frame. Layer 1 is offset
  // by half a cycle, so while layer 0 is still zooming in, layer 1 is already
  // ramping in behind it — the two overlap continuously and the frame is
  // never left empty. The more deeply zoomed layer is lifted on top so the
  // diving image reads as rushing toward the viewer.
  useEffect(() => {
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const elapsedSec = (now - start) / 1000;
      const phase = elapsedSec / CYCLE_SECONDS;
      const s0 = layerStateAt(phase);
      const s1 = layerStateAt(phase + PHASE_OFFSET);
      layer0Scale.set(s0.scale);
      layer0Opacity.set(s0.opacity);
      layer1Scale.set(s1.scale);
      layer1Opacity.set(s1.opacity);
      // One full turn per ROTATION_SECONDS, opposite directions.
      const rotation = (elapsedSec / ROTATION_SECONDS) * 360;
      layer0Rotate.set(rotation);
      layer1Rotate.set(-rotation);
      // Whichever layer is further into its dive sits on top.
      const topIs0 = s0.scale >= s1.scale;
      if (layer0Ref.current) layer0Ref.current.style.zIndex = topIs0 ? '2' : '1';
      if (layer1Ref.current) layer1Ref.current.style.zIndex = topIs0 ? '1' : '2';
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [
    layer0Scale,
    layer0Opacity,
    layer1Scale,
    layer1Opacity,
    layer0Rotate,
    layer1Rotate,
  ]);

  const stopBackgroundReturn = useCallback(() => {
    returnAnimations.current.forEach((animation) => animation.stop());
    returnAnimations.current = [];
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (event.pointerType === 'touch') return;

    stopBackgroundReturn();

    const x = ((event.clientX / window.innerWidth) - 0.5) * 56;
    const y = ((event.clientY / window.innerHeight) - 0.5) * 56;
    backgroundX.set(x);
    backgroundY.set(y);
  }, [backgroundX, backgroundY, stopBackgroundReturn]);

  const handlePointerLeave = useCallback(() => {
    stopBackgroundReturn();
    const returnOptions = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
    returnAnimations.current = [
      animate(backgroundX, 0, returnOptions),
      animate(backgroundY, 0, returnOptions),
    ];
  }, [backgroundX, backgroundY, stopBackgroundReturn]);

  useEffect(() => () => {
    stopBackgroundReturn();
  }, [stopBackgroundReturn]);

  return (
    <div
      className="relative isolate min-h-screen overflow-x-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Ambient deep-zoom abyss living behind the portfolio content. */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-base-100" aria-hidden="true">
        {/* Grid Pattern Layer */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, oklch(from var(--color-secondary) l c h / 0.2) 1px, transparent 1px), linear-gradient(to bottom, oklch(from var(--color-secondary) l c h / 0.2) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: 'center center',
          }}
        />

        {/* Two persistent image layers alternate forever; the next begins
            appearing while the current is still zooming in, so the frame is
            never left empty and nothing ever visibly zooms back out. */}
        <ZoomBackgroundLayer
          layerRef={layer0Ref}
          scale={layer0Scale}
          opacity={layer0Opacity}
          rotate={layer0Rotate}
          parallaxX={layer0ParallaxX}
          parallaxY={layer0ParallaxY}
        />
        <ZoomBackgroundLayer
          layerRef={layer1Ref}
          scale={layer1Scale}
          opacity={layer1Opacity}
          rotate={layer1Rotate}
          parallaxX={layer1ParallaxX}
          parallaxY={layer1ParallaxY}
        />

        {/* Preserve the hero's translucent color wash and bottom fade. */}
        <div className="absolute inset-0 z-10 bg-base-100/50" />
        <div
          className="absolute inset-x-0 bottom-0 z-20 h-32"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, oklch(from var(--color-base-100) l c h / 0), oklch(from var(--color-base-100) l c h / 1))',
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default PageExperience;
