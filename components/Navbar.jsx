'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import { icons } from '../lib/icons';
import site from '../content/site.json';

const { navLinks, socialLinks, labels } = site;

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const scrollFrame = useRef(null);

  useEffect(() => {
    return () => {
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

  const handleSectionClick = (event, href) => {
    if (
      !href.startsWith('#') ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    if (scrollFrame.current !== null) {
      window.cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = null;
    }

    const startPosition = window.scrollY;
    const targetPosition = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY,
    );
    const distance = targetPosition - startPosition;

    if (Math.abs(distance) < 1) {
      window.history.replaceState(null, '', href);
      return;
    }

    const duration = Math.min(1100, Math.max(600, Math.abs(distance) * 0.45));
    let startTime;

    const step = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress =
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        scrollFrame.current = window.requestAnimationFrame(step);
      } else {
        scrollFrame.current = null;
        window.history.replaceState(null, '', href);
      }
    };

    scrollFrame.current = window.requestAnimationFrame(step);
  };

  return (
    <>
      {/* Desktop Left Social Dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }}
        className="fixed bottom-6 left-6 z-50 hidden md:block"
      >
        <div className="flex items-center gap-1 px-2 py-2 bg-base-content/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
          {/* Social Links */}
          {socialLinks.map((link) => {
            const Icon = icons[link.icon];
            const isHovered = hoveredItem === link.name;
            
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-10 h-10 rounded-xl text-base-100/80 hover:text-primary transition-colors duration-200"
                onMouseEnter={() => setHoveredItem(link.name)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 relative z-10" />
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-primary text-primary-content text-xs font-medium rounded-lg whitespace-nowrap shadow-lg"
                    >
                      {link.name}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
          
          {/* CV View */}
          <Link href="/cv">
            <motion.div
              className="relative flex items-center justify-center w-10 h-10 rounded-xl text-base-100/80 hover:text-primary transition-colors duration-200"
              onMouseEnter={() => setHoveredItem(labels.viewCV)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFileText className="w-5 h-5 relative z-10" />
              
              <AnimatePresence>
                {hoveredItem === labels.viewCV && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-primary text-primary-content text-xs font-medium rounded-lg whitespace-nowrap shadow-lg"
                  >
                    {labels.viewCV}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* Desktop Center Navigation Dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 100 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="flex items-center gap-1 px-2 py-2 bg-base-content/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
          {navLinks.map((link) => {
            const Icon = icons[link.icon];
            const isHovered = hoveredItem === link.name;
            
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(event) => handleSectionClick(event, link.href)}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl text-base-100/80 hover:text-primary transition-colors duration-200"
                onMouseEnter={() => setHoveredItem(link.name)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 relative z-10" />
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-primary text-primary-content text-xs font-medium rounded-lg whitespace-nowrap shadow-lg"
                    >
                      {link.name}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Bottom Floating Dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      >
        <div className="flex items-center justify-around px-2 py-3 bg-base-content/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
          {navLinks.map((link) => {
            const Icon = icons[link.icon];
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(event) => handleSectionClick(event, link.href)}
                className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl text-base-100/80 hover:text-primary transition-colors duration-200"
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{link.name}</span>
              </motion.a>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar
