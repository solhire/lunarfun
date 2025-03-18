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
  size = 300, 
  showText = true,
  onClick,
  autoAnimate = true // Default to true for auto-animation
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);
  
  // Auto animation effect - triggers the click animation automatically
  useEffect(() => {
    if (!autoAnimate) return;
    
    const animationInterval = setInterval(() => {
      setIsClicked(true);
    }, 5000); // Trigger animation every 5 seconds
    
    return () => clearInterval(animationInterval);
  }, [autoAnimate]);
  
  const handleClick = () => {
    setIsClicked(true);
    if (onClick) onClick();
  };
  
  // Colors from the theme - Updated to black and red
  const primaryColor = "#FF0000";
  const primaryLight = "#FF3333";
  const primaryDark = "#CC0000";
  const secondaryColor = "#000000";
  const secondaryLight = "#333333";
  const navyColor = "#12131A";
  const navyLight = "#2A2D3A";
  const accentGreen = "#50E3C2";
  const accentPink = "#FF6B8B";
  
  // Calculate dimensions based on size
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
  
  const foodElementsVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 3, transition: { duration: 0.3 } },
    click: { 
      scale: [1, 1.25, 1.1],
      rotate: [0, 12, 3],
      transition: { duration: 0.5 }
    }
  };
  
  const textVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    click: { 
      scale: [1, 1.1, 1.05],
      transition: { duration: 0.5 }
    }
  };
  
  // Burst animations for fun food elements
  const burstVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      x: getBurstX(i),
      y: getBurstY(i),
      transition: { 
        duration: 0.8,
      }
    })
  };
  
  // Helper functions for burst animations
  const getBurstX = (i: number): number[] => {
    switch(i) {
      case 0: return [0, -30];
      case 1: return [0, 30];
      case 2: return [0, -30];
      case 3: return [0, 30];
      case 4: return [0, -40];
      case 5: return [0, 40];
      default: return [0, 0];
    }
  };
  
  const getBurstY = (i: number): number[] => {
    switch(i) {
      case 0: return [0, -30];
      case 1: return [0, -30];
      case 2: return [0, 30];
      case 3: return [0, 30];
      case 4: return [0, 0];
      case 5: return [0, 0];
      default: return [0, 0];
    }
  };
  
  // Food elements positions
  const foodPositions = [
    { x: centerX, y: centerY - mainRadius * 0.85, element: '🍓', size: 12 },
    { x: centerX, y: centerY + mainRadius * 0.85, element: '🍋', size: 12 },
    { x: centerX - mainRadius * 0.85, y: centerY, element: '🍦', size: 12 },
    { x: centerX + mainRadius * 0.85, y: centerY, element: '🍕', size: 12 },
  ];
  
  // Sparkle positions
  const sparklePositions = [
    { x: centerX + 20, y: centerY - 25, delay: 0, size: 3 },
    { x: centerX - 15, y: centerY - 20, delay: 0.5, size: 2 },
    { x: centerX + 10, y: centerY + 25, delay: 1, size: 2 },
  ];
  
  // Floating elements (food crumbs)
  const floatingElements = [
    { x: centerX + mainRadius * 0.7, y: centerY - mainRadius * 0.5, size: 4, delay: 0.7, color: accentPink },
    { x: centerX - mainRadius * 0.7, y: centerY + mainRadius * 0.5, size: 3, delay: 1.2, color: accentGreen },
  ];
  
  // Fun food burst elements
  const burstElements = [
    { x: centerX - 20, y: centerY - 20, element: '✨' },
    { x: centerX + 20, y: centerY - 20, element: '✨' },
    { x: centerX - 20, y: centerY + 20, element: '✨' },
    { x: centerX + 20, y: centerY + 20, element: '✨' },
    { x: centerX - 25, y: centerY, element: '✨' },
    { x: centerX + 25, y: centerY, element: '✨' },
  ];
  
  // Y-shaped Fork path - main Y structure
  const yPath = `
    M${centerX - 20},${centerY - 35}
    Q${centerX - 10},${centerY - 35} ${centerX - 5},${centerY - 25}
    L${centerX},${centerY - 15}
    L${centerX + 5},${centerY - 25}
    Q${centerX + 10},${centerY - 35} ${centerX + 20},${centerY - 35}
    Q${centerX + 30},${centerY - 30} ${centerX + 15},${centerY - 10}
    Q${centerX + 10},${centerY - 5} ${centerX + 8},${centerY}
    Q${centerX + 8},${centerY + 10} ${centerX + 8},${centerY + 15}
    Q${centerX + 8},${centerY + 20} ${centerX},${centerY + 25}
    Q${centerX - 8},${centerY + 20} ${centerX - 8},${centerY + 15}
    Q${centerX - 8},${centerY + 10} ${centerX - 8},${centerY}
    Q${centerX - 10},${centerY - 5} ${centerX - 15},${centerY - 10}
    Q${centerX - 30},${centerY - 30} ${centerX - 20},${centerY - 35}
    Z
  `;
  
  // Fork tines overlaid on the Y
  const forkTinesPath = `
    M${centerX - 15},${centerY - 30}
    L${centerX - 15},${centerY - 15}
    M${centerX - 5},${centerY - 25}
    L${centerX - 5},${centerY - 15}
    M${centerX + 5},${centerY - 25}
    L${centerX + 5},${centerY - 15}
    M${centerX + 15},${centerY - 30}
    L${centerX + 15},${centerY - 15}
  `;
  
  // Plate/Bowl path beneath the Y
  const platePath = `
    M${centerX - 15},${centerY + 5}
    Q${centerX},${centerY} ${centerX + 15},${centerY + 5}
    Q${centerX + 20},${centerY + 10} ${centerX + 18},${centerY + 20}
    Q${centerX + 10},${centerY + 30} ${centerX},${centerY + 32}
    Q${centerX - 10},${centerY + 30} ${centerX - 18},${centerY + 20}
    Q${centerX - 20},${centerY + 10} ${centerX - 15},${centerY + 5}
    Z
  `;
  
  // Steam/aroma paths
  const steamPath1 = `
    M${centerX - 8},${centerY - 5}
    Q${centerX - 10},${centerY - 15} ${centerX - 5},${centerY - 20}
    Q${centerX},${centerY - 25} ${centerX - 2},${centerY - 32}
  `;
  
  const steamPath2 = `
    M${centerX + 5},${centerY - 7}
    Q${centerX + 7},${centerY - 17} ${centerX + 2},${centerY - 22}
    Q${centerX - 3},${centerY - 27} ${centerX + 1},${centerY - 35}
  `;
  
  // Food highlight path
  const highlightPath = `
    M${centerX - 5},${centerY + 15}
    Q${centerX},${centerY + 20} ${centerX + 5},${centerY + 15}
    Q${centerX + 3},${centerY + 25} ${centerX - 3},${centerY + 25}
    Z
  `;
  
  // SVG definitions for gradients and patterns
  const svgDefs = (
    <defs>
      {/* Particle gradients */}
      <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={primaryLight} />
        <stop offset="100%" stopColor={primaryColor} />
      </radialGradient>
      
      {/* Small squares grid pattern */}
      <pattern
        id="gridPattern"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="1" height="1" fill={secondaryColor} />
      </pattern>
      
      {/* Glowing effect for the particles */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          result="glow"
        />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      {/* Coin gradient */}
      <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={secondaryLight} />
        <stop offset="100%" stopColor={secondaryColor} />
      </linearGradient>
      
      {/* Inner coin gradient - changing from red to black */}
      <radialGradient id="innerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor={secondaryLight} />
        <stop offset="100%" stopColor={secondaryColor} />
      </radialGradient>
      
      {/* Grid on the primary coin */}
      <pattern
        id="gridPatternMain"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="1" height="1" fill={secondaryLight} />
      </pattern>
      
      {/* Shine effect on the coin */}
      <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
        <stop offset="50%" stopColor={primaryLight} stopOpacity="0.5" />
        <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
      </linearGradient>
      
      {/* Y gradient */}
      <linearGradient id="yGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={primaryLight} />
        <stop offset="100%" stopColor={primaryDark} />
      </linearGradient>
      
      {/* Y vertical gradient */}
      <linearGradient id="yVerticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={primaryLight} />
        <stop offset="100%" stopColor={primaryDark} />
      </linearGradient>
      
      {/* Text gradient */}
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={primaryLight} />
        <stop offset="100%" stopColor={primaryDark} />
      </linearGradient>
      
      {/* Shadow for the coin */}
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={secondaryColor} floodOpacity="0.3" />
      </filter>
    </defs>
  );
  
  return (
    <div 
      style={{ width: size, height: size }}
      className="relative mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        {svgDefs}
        
        {/* Glow Background */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={mainRadius + 5}
          fill={secondaryColor}
          opacity={0.2}
          filter="url(#glow)"
          variants={glowVariants}
          initial="initial"
          animate={isClicked ? "click" : isHovered ? "hover" : "initial"}
        />
        
        {/* Main Coin Circle */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={mainRadius}
          fill="url(#coinGradient)"
          variants={coinVariants}
          initial="initial"
          animate={isClicked ? "click" : isHovered ? "hover" : "initial"}
        />
        
        {/* Inner Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={mainRadius - 8}
          fill="url(#innerGradient)"
        />
        
        {/* Grid Pattern Background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={mainRadius - 8}
          fill="url(#gridPattern)"
          opacity={0.1}
        />
        
        {/* Shine Effect */}
        <circle
          cx={centerX}
          cy={centerY}
          r={mainRadius - 8}
          fill="url(#shineGradient)"
          opacity={0.2}
        />
        
        {/* Orbit Ring */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={mainRadius}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          strokeDasharray="6 4"
          variants={orbitVariants}
          initial="initial"
          animate="animate"
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />
        
        {/* Food Element Group with Y shape */}
        <motion.g
          variants={foodElementsVariants}
          initial="initial"
          animate={isClicked ? "click" : isHovered ? "hover" : "initial"}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        >
          {/* Shadow/3D effect base for Y */}
          <path
            d={yPath}
            fill={primaryDark}
            transform="translate(3, 3)"
            opacity="0.3"
          />
          
          {/* Main Y shape */}
          <path
            d={yPath}
            fill="url(#yVerticalGradient)"
            filter="url(#shadow)"
          />
          
          {/* Metallic edge effect */}
          <path
            d={yPath}
            fill="none"
            stroke="url(#metallicGradient)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          
          {/* Fork tines overlay - decorative elements on the Y */}
          <path
            d={forkTinesPath}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Plate/Bowl under Y */}
          <path
            d={platePath}
            fill="url(#plateGradient)"
            filter="url(#shadow)"
            opacity="0.9"
          />
          
          {/* Steam/Aroma Lines */}
          <path
            d={steamPath1}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
            strokeDasharray="1 3"
          >
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
          </path>
          
          <path
            d={steamPath2}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
            strokeDasharray="1 3"
          >
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" />
          </path>
          
          {/* Food Highlight */}
          <path
            d={highlightPath}
            fill="white"
            opacity="0.3"
          />
          
          {/* Subtle dot accents */}
          <circle
            cx={centerX + 18}
            cy={centerY - 25}
            r={1.5}
            fill="white"
            opacity="0.7"
          />
          
          <circle
            cx={centerX - 18}
            cy={centerY - 25}
            r={1.5}
            fill="white"
            opacity="0.7"
          />
        </motion.g>
        
        {/* Food Icons at Cardinal Points */}
        {foodPositions.map((pos, i) => (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            fontSize={pos.size}
            textAnchor="middle"
            dominantBaseline="middle"
            opacity="0.9"
            className="select-none"
          >
            {pos.element}
          </text>
        ))}
        
        {/* Sparkles */}
        {sparklePositions.map((spark, i) => (
          <circle
            key={i}
            cx={spark.x}
            cy={spark.y}
            r={spark.size}
            fill="white"
            opacity="0.7"
          >
            <animate 
              attributeName="opacity" 
              values="0.7;0.3;0.7" 
              dur={`${1 + spark.delay}s`} 
              repeatCount="indefinite" 
            />
          </circle>
        ))}
        
        {/* Floating dots */}
        {floatingElements.map((elem, i) => (
          <circle
            key={i}
            cx={elem.x}
            cy={elem.y}
            r={elem.size}
            fill={elem.color}
            opacity="0.7"
          >
            <animate 
              attributeName="cy" 
              values={`${elem.y};${elem.y - 10};${elem.y}`} 
              dur={`${3 + elem.delay}s`} 
              repeatCount="indefinite" 
            />
          </circle>
        ))}
        
        {/* Burst Elements on Click */}
        <AnimatePresence>
          {isClicked && burstElements.map((burst, i) => (
            <motion.text
              key={i}
              x={burst.x}
              y={burst.y}
              fontSize="20"
              textAnchor="middle"
              dominantBaseline="middle"
              custom={i}
              variants={burstVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
              className="select-none"
            >
              {burst.element}
            </motion.text>
          ))}
        </AnimatePresence>
      </svg>
      
      {/* Logo Text */}
      {showText && (
        <motion.div
          className="text-center mt-4"
          variants={textVariants}
          initial="initial"
          animate={isClicked ? "click" : isHovered ? "hover" : "initial"}
        >
          <div className="relative">
            <h1 className="text-4xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary drop-shadow-glow">
              <span className="font-extrabold">YUMS</span>
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