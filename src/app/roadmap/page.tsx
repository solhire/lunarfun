'use client';

// Updated roadmap page - triggering new deployment
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

// Updated roadmap data with Q2 and Q3 2025
const ROADMAP_DATA = [
  {
    title: "Q2 2025: Launch & Core Features",
    items: [
      "Security First Approach",
      "Fair Launch Protocol: Ensuring equal access for all traders at token creation",
      "Basic Rug Protection: Implementing initial safeguards against common exit scams",
      "Creator Verification System: Initial verification layer for token creators",
      "Transparency Dashboard: Real-time visibility into contract interactions",
      "Platform stability and performance optimization",
      "Mobile-responsive design implementation",
      "Community channels establishment (Discord, Telegram)",
      "Initial trading features and token creation system"
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
      </svg>
    ),
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    lightColor: "bg-blue-400",
    darkColor: "bg-blue-600",
    borderColor: "border-blue-500/30",
    glowColor: "from-blue-500/20 to-transparent",
    status: "In Progress"
  },
  {
    title: "Q3 2025: Advanced Security & History Tracking",
    items: [
      "Rug Protection Suite: Token Contract Scanning with social media verification",
      "Liquidity Locking Options: Built-in timelock mechanisms with transparent opt-out",
      "Owner Action Alerts: Real-time notifications of suspicious activities",
      "Risk Assessment Scores: Automated token risk evaluation system",
      "Token Timeline: Complete historical record of each token's lifecycle",
      "Creator History Database: Cross-referencing system for developer addresses",
      "Rug Pool Archive: Searchable database of identified rug pulls",
      "Wallet Reputation System: Trust scores based on historical behavior",
      "Advanced charts and trading tools"
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
      </svg>
    ),
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    lightColor: "bg-purple-400",
    darkColor: "bg-purple-600",
    borderColor: "border-purple-500/30",
    glowColor: "from-purple-500/20 to-transparent",
    status: "Upcoming"
  },
  {
    title: "Q4 2025: Platform Enhancements",
    items: [
      "Enhanced token discoverability features",
      "Customizable watchlists with alert systems",
      "Advanced trading analytics dashboard",
      "Cross-chain integration capabilities",
      "Expanded payment options and fiat on-ramps",
      "Community governance features",
      "Developer API and integration tools",
      "Mobile app launch with push notifications",
      "Expanded educational resources and documentation"
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ),
    color: "text-rose-500",
    bgColor: "bg-rose-500",
    lightColor: "bg-rose-400",
    darkColor: "bg-rose-600",
    borderColor: "border-rose-500/30",
    glowColor: "from-rose-500/20 to-transparent",
    status: "Planned"
  }
];

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemFadeIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const pulseAnimation: Variants = {
  initial: { scale: 1 },
  pulse: { 
    scale: 1.05,
    transition: { 
      duration: 0.8, 
      repeat: Infinity, 
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const floatAnimation: Variants = {
  initial: { y: 0 },
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function RoadmapPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothProgress = useSpring(progressBarWidth, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      window.scrollTo({
        top: sectionRefs.current[index]?.offsetTop ? sectionRefs.current[index]!.offsetTop - 100 : 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-16">
        {/* Progress bar */}
        <motion.div 
          className="fixed top-16 left-0 right-0 h-1 bg-gray-800 z-50"
          style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
        >
          <div className="h-full bg-gradient-to-r from-primary via-primary-light to-blue-400"></div>
        </motion.div>
        
        {/* Hero section */}
        <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative max-w-3xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="mb-6"
            >
              <SparklesIcon className="h-12 w-12 mx-auto text-primary mb-4" />
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-blue-400 mb-6">
              Our Roadmap
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Our journey to build the most delicious platform for creators and collectors.
              Explore our upcoming features and milestones as we build the future together.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-flex items-center px-5 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary"
            >
              <motion.span 
                initial="initial"
                animate="pulse"
                variants={pulseAnimation}
                className="h-3 w-3 rounded-full bg-primary mr-3"
              ></motion.span>
              Currently in active development
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce flex flex-col items-center text-gray-400">
              <span className="text-sm mb-1">Scroll to explore</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </section>
        
        {/* Timeline navigation */}
        <div className="sticky top-16 z-40 bg-navy-500/90 backdrop-blur-lg py-4 border-y border-navy-400/20 shadow-lg">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center">
              {ROADMAP_DATA.map((phase, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeIndex === index
                      ? `bg-${phase.bgColor.split('-')[1]}-500/20 text-${phase.color.split('-')[1]}-400 border border-${phase.color.split('-')[1]}-500/30`
                      : 'text-gray-400 hover:text-white hover:bg-navy-400/10'
                  }`}
                  onClick={() => scrollToSection(index)}
                >
                  <div className={`relative flex-shrink-0 w-10 h-10 rounded-full ${
                    activeIndex === index 
                      ? `${phase.bgColor}/20` 
                      : 'bg-navy-400/20'
                  } flex items-center justify-center`}>
                    <span className={activeIndex === index ? phase.color : 'text-gray-400'}>
                      {phase.icon}
                    </span>
                    
                    {activeIndex === index && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -inset-1 rounded-full border-2 border-dashed"
                        style={{ borderColor: `rgba(var(--${phase.color.split('-')[1]}-500-rgb), 0.3)` }}
                      ></motion.div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center sm:items-start">
                    <span className={`text-sm font-medium ${activeIndex === index ? phase.color : ''}`}>
                      {phase.title.split(':')[0]}
                    </span>
                    <span className="text-xs text-gray-500">{phase.status}</span>
                  </div>
                  
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-4 left-0 right-0 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-primary to-blue-400"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Roadmap sections */}
        <div className="max-w-5xl mx-auto px-4 py-16">
          <AnimatePresence>
            {ROADMAP_DATA.map((phase, index) => (
              <motion.section
                key={index}
                ref={(el) => { sectionRefs.current[index] = el; }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="mb-32 relative"
              >
                {/* Timeline connector */}
                {index < ROADMAP_DATA.length - 1 && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`absolute left-8 top-20 w-1 bg-gradient-to-b ${phase.glowColor} h-full rounded-full`} 
                  />
                )}
                
                <div className="flex">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${phase.bgColor}/20 flex items-center justify-center`}
                  >
                    <motion.div 
                      initial="initial"
                      animate="float"
                      variants={floatAnimation}
                      className={`w-12 h-12 rounded-full ${phase.bgColor}/30 flex items-center justify-center`}
                    >
                      <span className={phase.color}>{phase.icon}</span>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute -inset-2 rounded-full border-2 border-dashed"
                      style={{ borderColor: `rgba(var(--${phase.color.split('-')[1]}-500-rgb), 0.2)` }}
                    ></motion.div>
                  </motion.div>
                  
                  <div className="ml-8 flex-1">
                    <motion.div 
                      variants={fadeInUp}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4"
                    >
                      <h2 className={`text-3xl font-bold ${phase.color}`}>
                        {phase.title}
                      </h2>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${phase.bgColor}/20 ${phase.color} border ${phase.borderColor} self-start`}>
                        {phase.status}
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      variants={fadeInUp}
                      className={`mb-8 p-6 rounded-2xl bg-navy-400/20 border ${phase.borderColor} backdrop-blur-sm relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-navy-500/50 to-navy-600/50 opacity-80"></div>
                      <div className={`absolute top-0 right-0 w-40 h-40 rounded-full ${phase.bgColor}/5 filter blur-3xl transform translate-x-20 -translate-y-20 group-hover:translate-x-16 transition-transform duration-700`}></div>
                      
                      <ul className="relative space-y-4 z-10">
                        {phase.items.map((item, itemIndex) => (
                          <motion.li 
                            key={itemIndex}
                            variants={itemFadeIn}
                            className="flex items-start"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${phase.bgColor}`} />
                            <div className="ml-4">
                              <span className="text-gray-200 font-medium">{item}</span>
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 + itemIndex * 0.1 }}
                                className={`h-px ${phase.bgColor}/30 mt-2`}
                              />
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    {index === 0 && (
                      <motion.div
                        variants={fadeInUp}
                        className="flex justify-end"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`inline-flex items-center px-4 py-2 ${phase.bgColor}/20 border ${phase.borderColor} rounded-lg text-sm ${phase.color} cursor-pointer`}
                        >
                          <span className="mr-2">View progress details</span>
                          <ArrowRightIcon className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Bottom section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative py-16 px-4 sm:px-6 lg:px-8 text-center bg-navy-400/30 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
                  <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400"
            >
              Help Shape Our Future
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-300 mb-8 leading-relaxed"
            >
              Our roadmap is constantly evolving based on community feedback. Have a suggestion
              or feature request? We'd love to hear from you and build the future together!
            </motion.p>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(var(--primary-rgb), 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-blue-500 text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              Share Your Ideas
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 