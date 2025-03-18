'use client';

import { FC, useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  project?: string;
  projectLogo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Founder, MoonShot',
    avatar: '/testimonials/avatar1.jpg',
    content: 'Yums.fun made it incredibly easy to launch our token. We went from idea to live trading in less than an hour! The platform is intuitive and the support team was helpful whenever we had questions.',
    project: 'MoonShot',
    projectLogo: '/testimonials/project1.png'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'CTO, DefiWhales',
    avatar: '/testimonials/avatar2.jpg',
    content: 'As a developer, I appreciate how streamlined the token creation process is. The technical aspects are handled seamlessly, allowing us to focus on building our community instead of worrying about contract deployment.',
    project: 'DefiWhales',
    projectLogo: '/testimonials/project2.png'
  },
  {
    id: 3,
    name: 'Michael Smith',
    role: 'Community Manager',
    avatar: '/testimonials/avatar3.jpg',
    content: 'Our community loved how quickly we could get our token live on Solana. Yums.fun provided all the tools we needed to track growth and engage with our earliest supporters. Highly recommended!',
  },
];

const TestimonialCard: FC<{ testimonial: Testimonial; isActive: boolean }> = ({ testimonial, isActive }) => {
  return (
    <div 
      className={`rounded-2xl p-6 transition-all duration-700 h-full ${
        isActive 
          ? 'bg-gradient-to-br from-navy-700/70 to-navy-800/70 border border-primary/20 shadow-lg shadow-primary/5 scale-100 opacity-100' 
          : 'bg-navy-800/30 border border-navy-700/30 scale-95 opacity-60'
      }`}
    >
      <div className="flex items-start mb-4">
        <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/30">
          <Image 
            src={testimonial.avatar} 
            alt={testimonial.name}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/testimonials/default-avatar.jpg';
            }}
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
          {testimonial.project && (
            <div className="flex items-center mt-1">
              {testimonial.projectLogo && (
                <div className="relative h-5 w-5 rounded-full overflow-hidden mr-1">
                  <Image 
                    src={testimonial.projectLogo} 
                    alt={testimonial.project}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/testimonials/default-project.jpg';
                    }}
                  />
                </div>
              )}
              <span className="text-xs text-primary">{testimonial.project}</span>
            </div>
          )}
        </div>
      </div>
      <blockquote className="mt-4">
        <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
      </blockquote>
    </div>
  );
};

const Testimonials: FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 rounded-full bg-accent-purple/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">What Our Users Say</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of creators who have successfully launched their tokens on Solana with Yums.fun
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              isActive={index === activeTestimonial}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`h-2 w-2 rounded-full mx-1 transition-colors duration-300 ${
                index === activeTestimonial ? 'bg-primary' : 'bg-gray-600'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-700/50 border border-navy-600/50">
            <span className="text-primary font-medium mr-2">1,200+</span>
            <span className="text-gray-400 text-sm">Tokens launched on Yums.fun</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 