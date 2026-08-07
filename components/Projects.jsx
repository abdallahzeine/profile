'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiImage, FiExternalLink } from 'react-icons/fi';
import { icons } from '../lib/icons';
import projectsData from '../content/projects.json';
import site from '../content/site.json';

const { projects } = projectsData;
const { labels } = site;

const orderedProjects = [...projects].sort((a, b) => a.priority - b.priority);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="projects" className="relative bg-base-100 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="cohere-eyebrow mb-6 inline-flex items-center gap-2 text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            {labels.projectsBadge}
          </span>
          <h2 className="cohere-display text-4xl text-base-content md:text-5xl lg:text-6xl">
            {labels.projectsHeading}
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-rule"></div>
        </motion.div>

        {/* Product grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orderedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-rule bg-base-100 transition-colors duration-300 hover:border-rule-strong"
            >
              {/* Media — only rendered when the project has an image */}
              {project.image && (
                <figure
                  className="relative aspect-[16/9] cursor-pointer overflow-hidden bg-base-200"
                  onClick={() => project.gallery.length > 0 && setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.gallery.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-content/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-sm font-medium text-base-content">
                        <FiImage /> {labels.viewGallery}
                      </span>
                    </div>
                  )}
                </figure>
              )}

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2">
                  {project.link !== '#' ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2"
                      title="View Code/Project"
                    >
                      <h3 className="text-xl font-medium tracking-tight text-primary underline decoration-transparent underline-offset-4 transition-colors group-hover/link:decoration-rule-strong">
                        {project.title}
                      </h3>
                      <FiExternalLink className="text-base-content/50 transition-colors group-hover/link:text-primary" />
                    </a>
                  ) : (
                    <h3 className="text-xl font-medium tracking-tight text-primary">{project.title}</h3>
                  )}
                </div>

                <div className="flex gap-3 py-4 text-lg text-base-content/50">
                  {project.icons.map((ic, i) => {
                    const ProjectIcon = icons[ic.icon];
                    return (
                      <span key={i} className="cursor-help transition-colors hover:text-primary" title={ic.title}>
                        <ProjectIcon />
                      </span>
                    );
                  })}
                </div>

                <p className="mb-4 text-sm leading-relaxed text-base-content/70">{project.description}</p>

                {project.highlights?.length > 0 && (
                  <ul className="mb-4 list-disc space-y-1 pl-4 text-sm leading-relaxed text-base-content/65">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}

                {project.tags.length > 0 && (
                  <div className="cohere-eyebrow mt-auto border-t border-rule pt-4 text-[0.6875rem] text-base-content/40">
                    {project.tags.join(' / ')}
                  </div>
                )}
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-base-content/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[22px] border border-rule bg-base-100 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-base-100 text-base-content/60 transition-colors hover:text-base-content"
                aria-label="Close gallery"
              >
                <FiX className="text-lg" />
              </button>

              <h3 className="mb-6 pr-10 text-2xl font-medium tracking-tight text-base-content">
                {selectedProject.title} {labels.gallerySuffix}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {selectedProject.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer overflow-hidden rounded-lg border border-rule transition-transform hover:scale-[1.02]"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`${selectedProject.title} screenshot ${idx + 1}`} className="h-auto w-full" />
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
            className="fixed inset-0 z-[70] flex items-center justify-center bg-base-content/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-base-100/10 text-base-100 transition-colors hover:bg-base-100/20"
              aria-label="Close preview"
            >
              <FiX className="text-2xl" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Preview"
              className="max-h-[90vh] w-full max-w-full rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects