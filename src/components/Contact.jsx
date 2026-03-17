import { motion } from 'framer-motion';
import { FiMail, FiPhone } from 'react-icons/fi';
import { contactInfo } from '../data';

const Contact = () => {
  return (
    <section id="contact" className="bg-base-200 py-24 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card bg-base-100 shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            <div className="bg-primary text-primary-content p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">{contactInfo.heading}</h2>
                <p className="opacity-90">{contactInfo.subheading}</p>
              </div>
              <div className="space-y-6 mt-10">
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <FiMail className="text-xl"/>
                  <span>{contactInfo.email}</span>
                </a>
                {contactInfo.phones.map((phone, i) => (
                  <a key={i} href={phone.href} className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                    <FiPhone className="text-xl"/>
                    <span>{phone.number}</span>
                    {phone.secondary && <span className="opacity-70 text-sm">(Secondary)</span>}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="p-10 flex flex-col justify-center items-center text-center">
              <div className="w-full max-w-sm space-y-4">
                 <h3 className="text-xl font-bold">{contactInfo.quickMsgTitle}</h3>
                 <p className="text-sm opacity-70">{contactInfo.quickMsgDesc}</p>
                 <a href={`mailto:${contactInfo.email}`} className="btn btn-primary w-full shadow-lg hover:shadow-primary/30">
                    {contactInfo.quickMsgBtn}
                 </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
