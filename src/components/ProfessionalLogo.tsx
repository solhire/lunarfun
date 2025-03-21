'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface ProfessionalLogoProps {
  size?: number;
  showText?: boolean;
  onClick?: () => void;
  autoAnimate?: boolean;
}

const ProfessionalLogo: React.FC<ProfessionalLogoProps> = ({ 
  size = 40, 
  showText = true,
  onClick,
  autoAnimate = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => setIsClicked(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);
  
  useEffect(() => {
    if (!autoAnimate) return;
    
    const animationInterval = setInterval(() => {
      setIsClicked(true);
    }, 5000);
    
    return () => clearInterval(animationInterval);
  }, [autoAnimate]);
  
  const handleClick = () => {
    setIsClicked(true);
    if (onClick) onClick();
  };
  
  // Colors from the theme
  const primaryColor = "#B19CD9";
  const primaryLight = "#D4C4E9";
  const primaryDark = "#8A7AA9";
  const accentTeal = "#7EE7D8";
  const navyColor = "#10101E";
  const navyLight = "#1E1E32";
  
  // Calculate dimensions
  const viewBoxSize = 240;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const mainRadius = viewBoxSize * 0.4;
  
  // Animation variants
  const coinVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    click: { 
      scale: [1, 1.2, 1.1],
      rotate: [0, 10, 0],
      transition: { duration: 0.5 }
    }
  };
  
  const glowVariants: Variants = {
    initial: { opacity: 0.5, scale: 1 },
    hover: { opacity: 0.8, scale: 1.1, transition: { duration: 0.3 } },
    click: { opacity: 0.9, scale: 1.2, transition: { duration: 0.5 } }
  };
  
  const orbitVariants: Variants = {
    initial: { opacity: 0.3, rotate: 0 },
    animate: { 
      opacity: isHovered ? 0.5 : 0.3, 
      rotate: 360,
      transition: { 
        rotate: { 
          duration: isClicked ? 10 : 20, 
          ease: "linear", 
          repeat: Infinity 
        },
        opacity: { duration: 0.3 }
      }
    }
  };
  
  // Cosmic L path - main structure with modern font styling
  const cosmicLPath = `
    M${centerX - 25},${centerY - 35}
    Q${centerX - 25},${centerY - 35} ${centerX - 25},${centerY - 30}
    L${centerX - 25},${centerY + 15}
    Q${centerX - 25},${centerY + 20} ${centerX - 20},${centerY + 25}
    L${centerX + 15},${centerY + 25}
    Q${centerX + 25},${centerY + 25} ${centerX + 25},${centerY + 15}
    Q${centerX + 25},${centerY + 5} ${centerX + 15},${centerY + 5}
    L${centerX - 5},${centerY + 5}
    L${centerX - 5},${centerY - 35}
    Q${centerX - 5},${centerY - 35} ${centerX - 15},${centerY - 35}
    Z
  `;
  
  // Star paths for decoration - repositioned for new L shape
  const starPaths = [
    `M${centerX - 25},${centerY - 30} l-2,-2 l2,-2 l2,2 l-2,2`,
    `M${centerX - 25},${centerY} l-2,-2 l2,-2 l2,2 l-2,2`,
    `M${centerX + 15},${centerY + 25} l-2,-2 l2,-2 l2,2 l-2,2`,
    `M${centerX},${centerY + 15} l-2,-2 l2,-2 l2,2 l-2,2`
  ];
  
  // Cosmic rays
  const rayPaths = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * Math.PI * 2) / 8;
    const startX = centerX + Math.cos(angle) * 30;
    const startY = centerY + Math.sin(angle) * 30;
    const endX = centerX + Math.cos(angle) * 40;
    const endY = centerY + Math.sin(angle) * 40;
    return `M${startX},${startY} L${endX},${endY}`;
  });
  
  // SVG definitions
  const svgDefs = (
    <defs>
      {/* Cosmic Gradient */}
      <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={primaryLight} />
        <stop offset="50%" stopColor={primaryColor} />
        <stop offset="100%" stopColor={primaryDark} />
      </linearGradient>
      
      {/* Star Pattern */}
      <pattern id="starPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill={primaryLight} opacity="0.5" />
        <circle cx="10" cy="10" r="0.5" fill={accentTeal} opacity="0.3" />
        <circle cx="18" cy="18" r="1" fill={primaryColor} opacity="0.4" />
      </pattern>
      
      {/* Glow Effect */}
      <filter id="cosmicGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      {/* Nebula Effect */}
      <radialGradient id="nebulaGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={primaryLight} stopOpacity="0.3" />
        <stop offset="70%" stopColor={primaryColor} stopOpacity="0.1" />
        <stop offset="100%" stopColor={primaryDark} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
  
  return (
    <div 
      className="relative inline-block transition-all duration-300 cursor-pointer"
      style={{
        width: size,
        height: size,
        transform: `scale(${isHovered ? 1.05 : 1}) rotate(${isClicked ? '-5deg' : isHovered ? '5deg' : '0deg'})`,
        filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <svg 
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className={`w-full h-full ${autoAnimate ? 'animate-cosmic-float' : ''}`}
      >
        {svgDefs}
        
        {/* Background Nebula */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={mainRadius + 10}
          fill="url(#nebulaGradient)"
          variants={glowVariants}
          initial="initial"
          animate={isClicked ? "click" : isHovered ? "hover" : "initial"}
        />
        
        {/* Star Field Background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={mainRadius}
          fill="url(#starPattern)"
          opacity="0.3"
        />
        
        {/* Cosmic Rays */}
        <g>
          {rayPaths.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              stroke={primaryLight}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.3"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ 
                duration: 2,
                delay: i * 0.25,
                repeat: Infinity 
              }}
            />
          ))}
        </g>
        
        {/* Main L Shape */}
        <motion.g
          variants={coinVariants}
          initial="initial"
          animate={isClicked ? "click" : isHovered ? "hover" : "initial"}
        >
          {/* L Shadow */}
          <path
            d={cosmicLPath}
            fill={primaryDark}
            transform="translate(2, 2)"
            opacity="0.3"
          />
          
          {/* Main L */}
          <path
            d={cosmicLPath}
            fill="url(#cosmicGradient)"
            filter="url(#cosmicGlow)"
          />
          
          {/* Stars */}
          {starPaths.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill={primaryLight}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ 
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity 
              }}
            />
          ))}
        </motion.g>
        
        {/* Orbit Ring */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={mainRadius}
          fill="none"
          stroke={primaryLight}
          strokeWidth="1"
          strokeDasharray="3 3"
          variants={orbitVariants}
          initial="initial"
          animate="animate"
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />
        
        {/* Sparkles */}
        {isHovered && (
          <g>
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i * Math.PI * 2) / 6;
              const x = centerX + Math.cos(angle) * 35;
              const y = centerY + Math.sin(angle) * 35;
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1"
                  fill={primaryLight}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                />
              );
            })}
          </g>
        )}
      </svg>
      
      {/* Logo Text */}
      {showText && (
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <h1 className="text-4xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary drop-shadow-glow">
              <span className="font-extrabold">LUNARA</span>
              <span className="text-white opacity-80 mx-1">.</span>
              <span className="font-extrabold">FUN</span>
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfessionalLogo; 