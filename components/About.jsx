'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaTrophy, FaWrench, FaCertificate, FaHandshake, FaArrowUpRightFromSquare, FaBriefcase, FaLanguage } from 'react-icons/fa6';
import { icons } from '../lib/icons';
import about from '../content/about.json';
import site from '../content/site.json';

const { skillsData, education, experience, highlights, certifications, certificationsUrl, volunteering, languages } = about;
const { labels } = site;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

// Merge Experience + Education into a single timeline, sorted most-recent-first.
// We only sort by start date; overlapping / "Present" entries are kept as-is.
const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const parseStartDate = (period) => {
  const start = String(period).split('-')[0].trim();
  const match = start.match(/([A-Za-z]{3})?\s*(\d{4})/);
  if (!match) return 0;
  const year = parseInt(match[2], 10);
  const month = match[1] ? (monthMap[match[1]] ?? 0) : 0;
  return new Date(year, month, 1).getTime();
};
const timeline = [
  ...experience.map((job) => ({
    kind: 'experience',
    title: job.title,
    org: job.company,
    meta: job.type,
    period: job.period,
    location: job.location,
    active: job.active,
    tags: [],
    details: job.details || [],
    start: parseStartDate(job.period),
  })),
  ...education.map((edu) => ({
    kind: 'education',
    title: edu.degree,
    org: edu.university,
    meta: null,
    period: edu.period,
    location: edu.location || null,
    active: String(edu.period).includes('Present'),
    tags: edu.tags,
    program: edu.program,
    details: [],
    start: parseStartDate(edu.period),
  })),
].sort((a, b) => b.start - a.start);

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-base-100 py-20 md:py-24">
      {/* Background Decorations - Subtle */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-20">
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-secondary/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="cohere-eyebrow mb-6 inline-flex items-center gap-2 text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            {labels.aboutBadge}
          </span>
          <h2 className="cohere-display text-4xl text-base-content md:text-5xl lg:text-6xl">
            {labels.aboutHeading}
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-rule"></div>
        </motion.div>

        {/* Blocks — hairline-separated capability sections */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col"
        >

          {/* Skills */}
          <motion.div variants={item} className="border-t border-rule py-10 md:py-12">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule text-primary">
                <FaWrench className="text-lg" />
              </span>
              <h3 className="cohere-display text-2xl text-base-content md:text-3xl">{labels.skills}</h3>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
              {Object.entries(skillsData).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="cohere-eyebrow mb-4 text-base-content/45">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => {
                      const SkillIcon = icons[skill.icon];
                      return (
                        <span
                          key={skill.name}
                          className="inline-flex cursor-default items-center gap-2 rounded-lg border border-rule bg-base-100 px-3 py-2 text-sm font-medium text-base-content/80"
                        >
                          <span className="text-base"><SkillIcon className={skill.className} /></span>
                          <span>{skill.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience — combined timeline incl. education (most recent first) */}
          <motion.div variants={item} className="border-t border-rule py-10 md:py-12">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule text-primary">
                <FaBriefcase className="text-lg" />
              </span>
              <h3 className="cohere-display text-2xl text-base-content md:text-3xl">{labels.experience}</h3>
            </div>
            <div className="flex flex-col">
              {timeline.map((entry, i) => {
                const Icon = entry.kind === 'experience' ? FaBriefcase : FaGraduationCap;
                return (
                  <div
                    key={i}
                    className="grid gap-3 border-t border-rule py-6 first:border-t-0 md:grid-cols-[2.5rem_1fr_auto] md:gap-5"
                  >
                    {/* Node */}
                    <div
                      className={`hidden h-9 w-9 items-center justify-center rounded-full border md:flex ${
                        entry.active
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-rule-strong text-base-content/40'
                      }`}
                    >
                      <Icon className="text-sm" />
                    </div>
                    {/* Entry content */}
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="text-lg font-medium text-base-content">{entry.title}</h4>
                        {entry.active && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            <span className="inline-block h-1 w-1 rounded-full bg-primary" />
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-sm text-primary/85">{entry.org}{entry.meta ? ` · ${entry.meta}` : ''}</div>
                      {entry.location && <div className="mt-0.5 text-xs text-base-content/50">{entry.location}</div>}
                      {entry.program && <div className="mt-2 text-sm text-base-content/65">{entry.program}</div>}
                      {entry.details?.map((detail) => (
                        <p key={detail} className="mt-2 max-w-2xl text-sm leading-relaxed text-base-content/65">
                          {detail}
                        </p>
                      ))}
                      {entry.tags.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="cohere-eyebrow rounded-full border border-rule px-2.5 py-1 text-[0.6875rem] text-base-content/55"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Period */}
                    <div className="md:text-right">
                      <span className={`cohere-eyebrow text-xs ${entry.active ? 'text-primary' : 'text-base-content/45'}`}>
                        {entry.period}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div variants={item} className="border-t border-rule py-8 md:py-10">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule text-amber-500">
                <FaTrophy className="text-lg" />
              </span>
              <h3 className="cohere-display text-2xl text-base-content md:text-3xl">{labels.highlights}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {highlights.map((h, i) => {
                const HighlightIcon = icons[h.icon];
                return (
                  <div key={i} className="flex items-start gap-4 rounded-lg border border-rule bg-base-100 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rule text-lg">
                      <HighlightIcon className={h.className} />
                    </span>
                    <div>
                      <div className="font-medium text-base-content">{h.title}</div>
                      <div className="text-sm text-base-content/60">{h.subtitle}</div>
                      <div className="cohere-eyebrow mt-1.5 text-[0.6875rem] text-base-content/40">{h.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Certifications — rule-separated list */}
          <motion.div variants={item} className="border-t border-rule py-9 md:py-11">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule text-primary">
                <FaCertificate className="text-lg" />
              </span>
              <h3 className="cohere-display text-2xl text-base-content md:text-3xl">{labels.certifications}</h3>
              <a
                href={certificationsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-base-content/40 transition-colors hover:text-primary"
                title="View all certifications on LinkedIn"
              >
                <FaArrowUpRightFromSquare className="text-sm" />
              </a>
            </div>
            <div className="flex flex-col">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="grid items-center gap-x-4 gap-y-1 border-t border-rule py-4 first:border-t-0 sm:grid-cols-[0.625rem_1fr_auto]"
                >
                  <span className={`hidden h-2.5 w-2.5 rounded-full sm:block ${cert.accent}`}></span>
                  <div>
                    <div className="text-base font-medium text-base-content">{cert.title}</div>
                    <div className="text-sm text-base-content/60">{cert.org}</div>
                  </div>
                  <div className="cohere-eyebrow text-xs text-base-content/45 sm:text-right">{cert.date}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Volunteering */}
          <motion.div variants={item} className="border-t border-rule py-8 md:py-10">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule text-primary">
                <FaHandshake className="text-lg" />
              </span>
              <h3 className="cohere-display text-2xl text-base-content md:text-3xl">{labels.volunteering}</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {volunteering.map((vol, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-rule bg-base-100 px-4 py-2.5">
                  <img src={vol.logo} alt={vol.org} className="h-9 w-9 rounded-lg object-contain" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-base-content">{vol.role}</span>
                    <span className="text-xs text-base-content/50">{vol.org}</span>
                    {vol.period && <span className="cohere-eyebrow mt-1 text-[0.625rem] text-base-content/40">{vol.period}</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div variants={item} className="border-t border-rule py-8 md:py-10">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule text-primary">
                <FaLanguage className="text-lg" />
              </span>
              <h3 className="cohere-display text-2xl text-base-content md:text-3xl">{labels.languages}</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {languages.map((language) => (
                <div key={language.name} className="rounded-lg border border-rule bg-base-100 px-4 py-3">
                  <div className="font-medium text-base-content">{language.name}</div>
                  <div className="text-sm text-base-content/60">{language.level}</div>
                  {language.detail && <div className="mt-1 text-xs text-base-content/45">{language.detail}</div>}
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;