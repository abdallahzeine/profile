import { motion } from 'framer-motion';
import { FaChartLine, FaGraduationCap, FaTrophy, FaMedal, FaLaptopCode, FaWrench, FaCertificate, FaHandshake, FaArrowUpRightFromSquare, FaBriefcase } from 'react-icons/fa6';
import { skillsData, education, experience, highlights, certifications, certificationsUrl, volunteering } from '../data';

const About = () => {
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

  // Consistent base card class
  const cardBaseIn = "card bg-base-200/50 border border-base-300/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300";
  const cardBaseOut = "card bg-base-100 transition-all duration-300";
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-base-100">
        {/* Background Decorations - Subtle */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-xs font-bold tracking-widest text-primary mb-4 border border-primary/20 uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-base-content mb-4 tracking-tight">
            My Journey
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mx-auto"></div>
        </motion.div>

        {/* Bento Grid Container */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          
          {/* Left Column: Skills (8 cols on md+) */}
          <motion.div variants={item} className={`md:col-span-8 ${cardBaseOut}`}>
            <div className="card-body p-6 h-full">
              <h3 className="text-lg font-bold text-base-content flex items-center gap-2 mb-4">
                <FaWrench className="text-xl text-primary" /> Skills
              </h3>
              
              <div className="space-y-4">
                {Object.entries(skillsData).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="inline-flex items-center gap-2 rounded-lg py-2 px-3 text-base font-medium bg-base-200/70 text-base-content/80 border border-base-300/50 cursor-default"
                        >
                          <span className="text-lg">{skill.icon}</span>
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

            {/* Right Column: Experience + Education + Highlights stacked (4 cols on md+) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            {/* Experience */}
            <motion.div variants={item} className={`flex-1 ${cardBaseIn}`}>
               <div className="card-body p-6">
                <h3 className="text-lg font-bold text-base-content flex items-center gap-2 mb-3">
                  <FaBriefcase className="text-xl text-primary" /> Experience
                </h3>
                <div className="flex flex-col gap-4">
                  {experience.map((job, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <div className={`w-2.5 h-2.5 rounded-full ${job.active ? 'bg-primary' : 'bg-base-content/40'}`}></div>
                        {i < experience.length - 1 && <div className="w-0.5 h-full bg-base-200 my-1.5 rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base-content">{job.title}</h4>
                        <div className="text-primary/80 text-sm mt-0.5">{job.company} - {job.type}</div>
                        <div className="text-xs text-base-content/50 mt-1">{job.period}</div>
                        <div className="text-xs text-base-content/50">{job.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
               </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={item} className={`flex-1 ${cardBaseIn}`}>
               <div className="card-body p-6">
                  <h3 className="text-lg font-bold text-base-content flex items-center gap-2 mb-3">
                      <FaGraduationCap className="text-xl text-primary" /> Education
                  </h3>
                  {education.map((edu, i) => (
                    <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center pt-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                            <div className="w-0.5 h-full bg-base-200 my-1.5 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base-content">{edu.degree}</h4>
                            <div className="text-primary/80 text-sm mt-0.5">{edu.university}</div>
                            <div className="text-xs text-base-content/50 mt-1">{edu.period}</div>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {edu.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded bg-base-200 text-base-content/70 text-xs font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                        </div>
                    </div>
                  ))}
               </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={item} className={`flex-1 ${cardBaseIn}`}>
              <div className="card-body p-6">
                <h3 className="text-lg font-bold text-base-content flex items-center gap-2 mb-4">
                  <FaTrophy className="text-xl text-amber-500" /> Highlights
                </h3>
                <div className="flex flex-col gap-4">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center text-lg">{h.icon}</div>
                      <div>
                          <div className="font-semibold text-base-content">{h.title}</div>
                          <div className="text-sm text-base-content/60">{h.subtitle}</div>
                          <div className="text-xs text-base-content/40 mt-0.5">{h.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div variants={item} className={`md:col-span-12 ${cardBaseOut}`}>
             <div className="card-body p-6">
                <h3 className="text-lg font-bold text-base-content flex items-center gap-2 mb-4">
                    <FaCertificate className="text-xl text-primary" /> Certifications
                    <a 
                      href={certificationsUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 text-base-content/40 hover:text-primary transition-colors"
                      title="View all certifications on LinkedIn"
                    >
                      <FaArrowUpRightFromSquare className="text-sm" />
                    </a>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {certifications.map((cert, i) => (
                        <div key={i} className="flex items-stretch rounded-lg border border-base-200 bg-base-200 transition-colors overflow-hidden">
                            <div className={`w-1 ${cert.accent}`}></div>
                            <div className="flex flex-col p-3 flex-1">
                                <span className="font-semibold text-sm text-base-content">{cert.title}</span>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-base-content/60">{cert.org}</span>
                                    <span className="text-[10px] uppercase font-medium text-base-content/40">{cert.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </motion.div>

          {/* Volunteering */}
          <motion.div variants={item} className={`md:col-span-12 ${cardBaseIn}`}>
             <div className="card-body p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center text-xl"><FaHandshake className="text-primary" /></div>
                    <div>
                        <h3 className="text-lg font-bold text-base-content">Volunteering</h3>
                        <p className="text-sm text-base-content/60">Community Engagement</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    {volunteering.map((vol, i) => (
                        <div key={i} className="flex items-center gap-3 bg-base-200/50 py-2 px-3 rounded-lg border border-base-200">
                             <img src={vol.logo} alt={vol.org} className="w-8 h-8 object-contain rounded" />
                             <div className="flex flex-col">
                                 <span className="font-semibold text-sm text-base-content">{vol.role}</span>
                                 <span className="text-xs text-base-content/50">{vol.org}</span>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
