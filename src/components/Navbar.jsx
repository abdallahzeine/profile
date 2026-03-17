import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import { navLinks, socialLinks } from '../data';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

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
            const Icon = link.icon;
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
          <Link to="/cv">
            <motion.div
              className="relative flex items-center justify-center w-10 h-10 rounded-xl text-base-100/80 hover:text-primary transition-colors duration-200"
              onMouseEnter={() => setHoveredItem('View CV')}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFileText className="w-5 h-5 relative z-10" />
              
              <AnimatePresence>
                {hoveredItem === 'View CV' && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-primary text-primary-content text-xs font-medium rounded-lg whitespace-nowrap shadow-lg"
                  >
                    View CV
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
            const Icon = link.icon;
            const isHovered = hoveredItem === link.name;
            
            return (
              <motion.a
                key={link.name}
                href={link.href}
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
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
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
