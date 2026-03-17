import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bgPattern from '../Background.svg'
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';
import { personalInfo, heroBadges, heroTooltips } from '../data';

const TechTooltip = ({ text, items }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-primary font-medium border-b-2 border-primary/20 hover:border-primary transition-colors cursor-pointer">
        {text}
      </span>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 bottom-full mb-3 flex gap-2 p-2 bg-base-100/90 backdrop-blur-md rounded-xl shadow-xl border border-base-200 min-w-max z-50 pointer-events-none"
          >
            {items.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 px-2 py-1 bg-base-200/50 rounded-lg">
                <item.icon className="text-lg" style={{ color: item.color }} />
                <span className="text-xs font-semibold whitespace-nowrap">{item.name}</span>
              </div>
            ))}
            {/* Arrow */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-base-100/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

const Hero = () => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [showRest, setShowRest] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isDot, setIsDot] = useState(false);

  const titleText = personalInfo.title;
  const subtitleText = personalInfo.subtitle;
  const typingSpeed = 20; // ms per character

  useEffect(() => {
    let titleIndex = 0;
    let subtitleIndex = 0;

    // Type title first
    const titleTimer = setInterval(() => {
      if (titleIndex < titleText.length) {
        setDisplayedTitle(titleText.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
        
        // Then type subtitle
        const subtitleTimer = setInterval(() => {
          if (subtitleIndex < subtitleText.length) {
            setDisplayedSubtitle(subtitleText.slice(0, subtitleIndex + 1));
            subtitleIndex++;
          } else {
            clearInterval(subtitleTimer);
            // Show rest of elements after typing finishes
            setTimeout(() => {
              setShowRest(true);
              
              // After 3 seconds of blinking, turn into a dot
              setTimeout(() => {
                setIsDot(true);
                setCursorVisible(true); // Ensure it's visible when becoming a dot
              }, 3000);
            }, 300);
          }
        }, typingSpeed);
      }
    }, typingSpeed);

    return () => clearInterval(titleTimer);
  }, []);

  // Blinking cursor effect - stops when it becomes a dot
  useEffect(() => {
    if (isDot) return;
    
    const cursorTimer = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, [isDot]);

  // Split title to highlight name
  const renderTitle = () => {
    const nameStart = "Hello, I'm ".length;
    const typed = displayedTitle;
    
    if (typed.length <= nameStart) {
      return typed;
    }
    
    return (
      <>
        {typed.slice(0, nameStart)}
        <span className="text-primary">{typed.slice(nameStart)}</span>
      </>
    );
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Grid Pattern Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, oklch(from var(--color-secondary) l c h / 0.2) 1px, transparent 1px), linear-gradient(to bottom, oklch(from var(--color-secondary) l c h / 0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: 'center center',
        }}
      />

      {/* SVG Background Image Layer */}
      <div
        className="absolute inset-0 z-1 pointer-events-none opacity-60"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content Layer */}
      <main className="relative z-10 min-h-screen bg-base-100/50 flex items-center pt-10">
        <div className="hero-content text-left text-base-content px-4 md:px-8 lg:px-16 w-full max-w-6xl mx-auto">
          <div className="w-full">
            {/* Quick Highlights Bar */}
              <div className="flex flex-wrap gap-3 mb-2">
                {heroBadges.map((badge, i) => (
                  <motion.span
                    key={badge}
                    className="px-3 py-1.5 bg-primary/15 text-primary rounded-full text-sm font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={showRest ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            {/* Main Heading with Typing Effect */}
            <div className="min-h-[6rem] md:min-h-[8rem] lg:min-h-[10rem]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 leading-snug">
                {renderTitle()}
                {displayedTitle.length === titleText.length && <br />}
                {displayedTitle.length === titleText.length && (
                  <span className="text-base-content/80">{displayedSubtitle}</span>
                )}
                <span 
                  className={`inline-block bg-primary transition-all duration-500 ${
                    isDot 
                      ? 'w-2 h-2 rounded-full align-baseline ml-[2px]' 
                      : `w-[0.6em] h-[1em] align-middle ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`
                  }`} 
                />
              </h1>
            </div>

            {/* Rest of elements - appear after typing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showRest ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Subtext with Tooltips */}
              <div className="text-lg md:text-xl text-base-content/70 mb-4 cursor-default">
                Specializing in{' '}
                <TechTooltip 
                  text={heroTooltips.django.text}
                  items={heroTooltips.django.items}
                />
                {' '}and{' '}
                <TechTooltip 
                  text={heroTooltips.ai.text}
                  items={heroTooltips.ai.items}
                />
              </div>

              {/* Location Line */}
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-base-content/60 mb-8">
                <FaMapMarkerAlt className="text-primary" />
                <span>{personalInfo.location}</span>
                <span>•</span>
                <Link 
                  to="/cv" 
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors duration-200"
                >
                  <FaFileAlt className="text-sm" />
                  <span>View CV</span>
                </Link>
              </div>

              <div className="flex flex-wrap mb-12">

              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Bottom Fade Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, oklch(from var(--color-base-100) l c h / 0), oklch(from var(--color-base-100) l c h / 1))',
        }}
      />
    </section>
  )
}

export default Hero
