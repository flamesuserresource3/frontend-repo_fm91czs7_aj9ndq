import React, { useState } from 'react';
import { Mail, Send, Phone, User } from 'lucide-react';

const Input = ({ label, icon: Icon, ...props }) => (
  <label className="block">
    <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
      {Icon && <Icon className="w-4 h-4 text-slate-300" />} {label}
    </span>
    <input
      className="mt-2 w-full rounded-md bg-zinc-900/60 border border-zinc-700 focus:border-blue-500/70 focus:outline-none px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
      {...props}
    />
  </label>
);

const TextArea = ({ label, ...props }) => (
  <label className="block">
    <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
      <Mail className="w-4 h-4 text-slate-300" /> {label}
    </span>
    <textarea
      className="mt-2 w-full rounded-md bg-zinc-900/60 border border-zinc-700 focus:border-red-500/70 focus:outline-none px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 min-h-[140px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
      {...props}
    />
  </label>
);

const ContactSection = () => {
  const [status, setStatus] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Simple client validation
    if (!data.name || !data.email || !data.message) {
      setStatus({ type: 'error', msg: 'Please fill in all required fields.' });
      return;
    }

    // No backend call per current setup — simulate success
    setTimeout(() => {
      setStatus({ type: 'success', msg: "Got it — your message is staged. We'll wire the backend next." });
      form.reset();
    }, 400);
  };

  return (
    <section id="contact" className="relative mt-16 sm:mt-24">
      <div className="absolute -inset-6 sm:-inset-8 rounded-3xl bg-gradient-to-r from-blue-500/10 via-red-500/10 to-slate-200/10 blur-2xl pointer-events-none" />

      <div className="relative rounded-2xl border border-zinc-800 bg-[radial-gradient(ellipse_at_top,_#0b0b0b,_#09090b_60%,_#000)] overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 400">
            <defs>
              <pattern id="plate" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 30 L10 40 L20 30 L30 40 L40 30" fill="none" stroke="#9ca3af" strokeWidth="1" opacity="0.25" />
                <circle cx="5" cy="5" r="2" fill="#9ca3af" opacity="0.2" />
                <circle cx="35" cy="35" r="2" fill="#9ca3af" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#plate)" />
          </svg>
        </div>

        <div className="relative grid md:grid-cols-2 gap-0">
          <div className="p-8 sm:p-10 lg:p-12 border-b md:border-b-0 md:border-r border-zinc-800">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-2 mb-6">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-xs tracking-widest uppercase text-zinc-300">Get in touch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">Contact</h3>
            <p className="mt-3 text-zinc-400 max-w-md">
              Drop your message in this armored inbox. I’ll get back with momentum.
            </p>

            <div className="mt-8 space-y-4 text-sm text-zinc-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-300" /> <span>+1 (000) 000-0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-300" /> <span>you@example.com</span>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-8 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input name="name" label="Your Name" icon={User} placeholder="Street Alias" required />
              <Input name="email" label="Email" icon={Mail} placeholder="you@domain.com" type="email" required />
            </div>
            <div className="mt-5">
              <Input name="subject" label="Subject" placeholder="Quick collab?" />
            </div>
            <div className="mt-5">
              <TextArea name="message" label="Message" placeholder="Hit me with the details..." required />
            </div>

            {status && (
              <div
                className={`mt-5 rounded-md border px-4 py-3 text-sm ${
                  status.type === 'success'
                    ? 'border-green-700/60 bg-green-900/20 text-green-300'
                    : 'border-red-700/60 bg-red-900/20 text-red-300'
                }`}
              >
                {status.msg}
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold hover:border-blue-500/60 hover:text-white transition"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
              <a href="#work" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-200">Back to Work</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
