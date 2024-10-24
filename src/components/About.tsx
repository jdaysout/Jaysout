import React from 'react';
import { Check } from 'lucide-react';

const About = () => {
  const benefits = [
    "Transform your workflow with AI integration",
    "Automate repetitive tasks efficiently",
    "Receive personalized AI strategy consulting",
    "Implement solutions in days, not months"
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="AI Consultant" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Choose Us</h2>
            <p className="text-text-secondary mb-6">
              We specialize in empowering businesses to harness the transformative power of artificial intelligence, 
              including tools like ChatGPT, to streamline workflows and enhance productivity.
            </p>
            <p className="text-text-secondary mb-6">
              Our mission is to make AI accessible and practical for every business, 
              delivering measurable results and real-world impact.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="neo-btn p-2 rounded-full text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-white">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-secondary">
              Ready to embark on your AI journey? Dive into our interactive{' '}
              <button 
                onClick={() => {
                  const ai101Section = document.getElementById('ai101');
                  if (ai101Section) {
                    const offset = 80; // Height of fixed header
                    const elementPosition = ai101Section.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="text-primary hover:text-[#77DD77] transition-colors duration-300 underline-offset-4 hover:underline"
              >
                AI 101
              </button>
              {' '}section, where learning becomes an engaging experience, and discover how you can start saving time{' '}
              <strong className="text-white">now</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;