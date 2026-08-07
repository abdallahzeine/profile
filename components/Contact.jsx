'use client';

import { motion } from 'framer-motion';
import { FiMail, FiPhone } from 'react-icons/fi';
import site from '../content/site.json';

const { contactInfo, labels } = site;

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--color-accent-content)] py-14 text-base-100 md:py-16"
    >
      {/* Ambient color fields */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-base-100/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="cohere-eyebrow mb-6 inline-flex items-center gap-2 text-base-100/55">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Contact
          </span>
          <h2 className="cohere-display text-4xl text-base-100 md:text-5xl">{contactInfo.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base-100/70">{contactInfo.subheading}</p>
        </motion.div>

        {/* Form card — white panel on the dark product band */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-rule bg-base-100 text-base-content shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
        >
          <div className="grid md:grid-cols-2">
            {/* Direct lines */}
            <div className="p-8 md:p-10">
              <span className="cohere-eyebrow text-primary">Direct</span>
              <div className="mt-8 space-y-6">
                <a href={`mailto:${contactInfo.email}`} className="group flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FiMail className="text-lg" />
                  </span>
                  <span>
                    <span className="cohere-eyebrow block text-[0.6875rem] text-base-content/45">Email</span>
                    <span className="font-medium text-base-content underline decoration-rule-strong underline-offset-4 transition-colors group-hover:text-primary group-hover:decoration-primary">
                      {contactInfo.email}
                    </span>
                  </span>
                </a>
                {contactInfo.phones.map((phone, i) => (
                  <a key={i} href={phone.href} className="group flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FiPhone className="text-lg" />
                    </span>
                    <span>
                      <span className="cohere-eyebrow block text-[0.6875rem] text-base-content/45">{phone.label}</span>
                      <span className="font-medium text-base-content underline decoration-rule-strong underline-offset-4 transition-colors group-hover:text-primary group-hover:decoration-primary">
                        {phone.number}{phone.secondary ? ` ${labels.secondary}` : ''}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick message */}
            <div className="flex flex-col justify-center border-t border-rule p-8 md:border-l md:border-t-0 md:p-10">
              <span className="cohere-eyebrow text-primary">{contactInfo.quickMsgTitle}</span>
              <p className="mt-3 text-sm text-base-content/60">{contactInfo.quickMsgDesc}</p>
              <a href={`mailto:${contactInfo.email}`} className="cohere-btn cohere-btn-dark mt-7 self-start">
                {contactInfo.quickMsgBtn}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact