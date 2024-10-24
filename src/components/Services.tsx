import React from 'react';
import { Brain, Rocket, Users, Zap } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const services = [
  {
    icon: <Brain className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />,
    title: 'AI for Creators',
    description: 'Elevate your creative workflow with intelligent tools and seamless automation.',
    details: 'Unlock new levels of creativity by integrating AI into your artistic process, enhancing productivity without compromising your unique vision.',
    category: 'creativity'
  },
  {
    icon: <Zap className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Process Automation',
    description: 'Optimize and streamline repetitive tasks with bespoke automation solutions.',
    details: 'Focus on what matters most while AI handles routine operations, improving efficiency and reducing operational costs.',
    category: 'automation',
    link: 'https://fathom.video/invite/mzereQ'
  },
  {
    icon: <Rocket className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />,
    title: 'AI Strategy Consulting',
    description: 'Navigate the AI landscape with expert strategic guidance.',
    details: 'Develop and implement effective AI strategies tailored to your business goals, ensuring successful integration and long-term success.',
    category: 'strategy'
  },
  {
    icon: <Users className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Team Training',
    description: 'Empower your team with practical AI skills and knowledge.',
    details: 'Equip your workforce with the expertise to harness AI technologies, driving innovation from within.',
    category: 'training'
  }
];

const Services: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const handleServiceClick = (service: typeof services[0]) => {
    if (service.link) {
      window.open(service.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={elementRef}>
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl font-bold mb-4 text-white animate-on-scroll fade-in ${
              isVisible ? 'is-visible' : ''
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Ready to Transform with AI?
          </h2>
          <p 
            className={`text-lg text-text-secondary max-w-2xl mx-auto animate-on-scroll fade-in ${
              isVisible ? 'is-visible' : ''
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            Learn more about who we are and how our AI expertise can elevate your business. 
            Reach out to us today to start your AI journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`neo-card p-8 rounded-xl animate-on-scroll scale-in group ${
                isVisible ? 'is-visible' : ''
              } ${service.link ? 'cursor-pointer' : ''}`}
              style={{ transitionDelay: `${0.2 * (index + 3)}s` }}
              onClick={() => handleServiceClick(service)}
            >
              <div className="neo-btn rounded-full p-4 inline-block mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-text-secondary mb-4">{service.description}</p>
              <p className="text-text-secondary text-sm">{service.details}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => handleNavigation('about')}
            className="neo-btn px-8 py-4 rounded-lg text-white hover:text-black hover:bg-primary transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            aria-label="Learn more about our company"
          >
            Learn About Us
          </button>
          <button 
            onClick={() => handleNavigation('contact')}
            className="neo-btn px-8 py-4 rounded-lg text-white hover:text-black hover:bg-[#77DD77] transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            aria-label="Contact us to get started"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;