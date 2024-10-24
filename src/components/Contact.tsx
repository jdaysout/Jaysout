import React, { useState } from 'react';
import { Mail, Instagram, Home, Loader2 } from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const subject = `Website Contact: ${formData.get('name')}`;
    const body = `
Name: ${formData.get('name')}
Email: ${formData.get('email')}
Message: ${formData.get('message')}
    `;

    // Create mailto link with form data
    const mailtoLink = `mailto:jdaysout@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    // Reset form and show success message
    form.reset();
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="neo-card p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="neo-btn p-3 rounded-lg mr-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-primary group-hover:icon-bounce" />
                </div>
                <span className="text-white">jdaysout@gmail.com</span>
              </div>
              <div className="flex items-center group">
                <div className="neo-btn p-3 rounded-lg mr-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <Instagram className="h-6 w-6 text-primary group-hover:icon-bounce" />
                </div>
                <span className="text-white">@jdaysout</span>
              </div>
              <div className="flex items-start group">
                <div className="neo-btn p-3 rounded-lg mr-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <Home className="h-6 w-6 text-primary group-hover:icon-bounce" />
                </div>
                <div className="flex flex-col">
                  <a 
                    href="https://www.compass.com/agents/jared-richey/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-primary transition-colors duration-300"
                  >
                    Jared Richey, Compass Realtor®️
                  </a>
                  <span className="text-white text-sm">DRE #02155947</span>
                </div>
              </div>
            </div>
          </div>
          <div className="neo-card p-8 rounded-xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-text font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="neo-input w-full px-4 py-3 rounded-lg text-text" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-text font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="neo-input w-full px-4 py-3 rounded-lg text-text" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-text font-semibold mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="neo-input w-full px-4 py-3 rounded-lg text-text resize-none" 
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="neo-btn text-primary font-semibold py-3 px-8 rounded-lg w-full flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary hover:text-white transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 icon-spin" />
                    Opening Email Client...
                  </>
                ) : submitted ? (
                  'Message Sent!'
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;