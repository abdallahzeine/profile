import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiImage, FiBarChart2, FiFileText, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="projects" className="bg-base-100 py-24 relative">
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full bg-base-200 px-4 py-1.5 text-sm font-medium text-base-content/70">My Work</span>
          <h2 className="text-4xl font-bold mt-4">Featured Projects</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden group"
            >
              <figure className="relative h-48 bg-base-200 overflow-hidden group cursor-pointer" onClick={() => project.gallery.length > 0 && setSelectedProject(project)}>
                {project.image ? (
                  <>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {project.gallery.length > 0 && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white flex items-center gap-2 font-medium px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                          <FiImage /> View Gallery
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-base-content/20 text-4xl font-bold bg-base-200">
                    {project.title[0]}
                  </div>
                )}
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3 text-2xl text-base-content/70">
                        {project.icons.map((icon, i) => <span key={i} className="hover:text-primary transition-colors cursor-help">{icon}</span>)}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {project.link !== "#" ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link" title="View Code/Project">
                            <h3 className="card-title text-xl font-bold text-primary group-hover/link:underline">{project.title}</h3>
                            <FiExternalLink className="text-base-content/70 group-hover/link:text-primary transition-colors" />
                        </a>
                    ) : (
                        <h3 className="card-title text-xl font-bold text-primary">{project.title}</h3>
                    )}
                </div>
                <p className="text-base-content/80 text-sm leading-relaxed my-4">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-base-100 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost hover:bg-base-200 z-10"
              >
                <FiX className="text-lg" />
              </button>
              
              <h3 className="text-2xl font-bold mb-6 pr-10">{selectedProject.title} Gallery</h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {selectedProject.gallery.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="rounded-xl overflow-hidden border border-base-200 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`${selectedProject.title} screenshot ${idx + 1}`} className="w-full h-auto" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 btn btn-circle btn-ghost text-white hover:bg-white/20 z-10"
            >
              <FiX className="text-2xl" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
