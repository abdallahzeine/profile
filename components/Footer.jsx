import { FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
import site from '../content/site.json';

const { personalInfo, contactInfo, labels } = site;

const Footer = () => {
  return (
    <footer className="bg-[var(--color-base-content)] text-base-100">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-start">
          {/* Identity */}
          <div>
            <span className="cohere-eyebrow text-primary">Open to opportunities</span>
            <h3 className="cohere-display mt-4 text-2xl text-base-100 md:text-3xl">{personalInfo.name}</h3>
            <p className="mt-3 max-w-md text-sm text-base-100/60">{personalInfo.location}</p>
          </div>

          {/* Contact columns */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="cohere-eyebrow text-[0.6875rem] text-base-100/45">Email</span>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-1.5 block text-sm text-base-100/75 underline decoration-base-100/25 underline-offset-4 transition-colors hover:text-base-100 hover:decoration-base-100"
              >
                {contactInfo.email}
              </a>
            </div>
            <div>
              <span className="cohere-eyebrow text-[0.6875rem] text-base-100/45">Phone</span>
              {contactInfo.phones.map((phone, i) => (
                <a
                  key={i}
                  href={phone.href}
                  className="mt-1.5 block text-sm text-base-100/75 underline decoration-base-100/25 underline-offset-4 transition-colors hover:text-base-100 hover:decoration-base-100"
                >
                  {phone.number} ({phone.label}){phone.secondary ? ` ${labels.secondary}` : ''}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-base-100/45">
            © {new Date().getFullYear()} {personalInfo.name} — {labels.rights}
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-xs text-base-100/60 transition-colors hover:text-base-100"
          >
            <FiArrowUp className="text-sm" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;