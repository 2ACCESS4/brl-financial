import { FC } from 'react';

interface LogoProps {
  className?: string;
  showShield?: boolean;
}

const Logo: FC<LogoProps> = ({ className = '', showShield = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Shield logo */}
      {showShield && (
        <div className="mr-3">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 60 60" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradient for main shield */}
              <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#116e3a" />
                <stop offset="100%" stopColor="#0d5c30" />
              </linearGradient>
              
              {/* Brighter gradient for the accent */}
              <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#24b85b" />
                <stop offset="100%" stopColor="#1c9c4d" />
              </linearGradient>
              
              {/* Metallic gradient for embossed effect */}
              <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0f0f0" />
                <stop offset="20%" stopColor="#d0d0d0" />
                <stop offset="50%" stopColor="#b0b0b0" />
                <stop offset="100%" stopColor="#a0a0a0" />
              </linearGradient>
              
              {/* Shadow effect */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.4" />
              </filter>
              
              {/* Inner shadow */}
              <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                <feOffset in="blur" dx="0" dy="1" result="offsetBlur" />
                <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
              </filter>
            </defs>
            
            {/* Main shield shape with shadow */}
            <path 
              d="M30,5 
                 L53,18 
                 L53,32 
                 C53,45 42,50 30,55 
                 C18,50 7,45 7,32
                 L7,18 Z" 
              fill="#063620" 
              filter="url(#shadow)"
            />
            
            {/* Inner shield with gradient */}
            <path 
              d="M30,8 
                 L50,20 
                 L50,32 
                 C50,42 41,47 30,52 
                 C19,47 10,42 10,32
                 L10,20 Z" 
              fill="url(#mainGradient)" 
              stroke="#052f19"
              strokeWidth="0.5"
            />
            
            {/* Center accent piece */}
            <path 
              d="M30,12 
                 L44,22 
                 L44,30 
                 C44,38 38,42 30,46 
                 C22,42 16,38 16,30
                 L16,22 Z" 
              fill="url(#accentGradient)" 
              stroke="#0a5128"
              strokeWidth="0.5"
            />
            
            {/* Metallic emblem in center */}
            <g transform="translate(19, 18)">
              <path 
                d="M11,2 
                   L18,6 
                   L18,13 
                   C18,17 15,20 11,22 
                   C7,20 4,17 4,13
                   L4,6 Z" 
                fill="url(#metallicGradient)" 
                stroke="#909090"
                strokeWidth="0.5"
                filter="url(#innerShadow)"
              />
              
              {/* "B" letter inside emblem */}
              <text 
                x="11" 
                y="17" 
                fontFamily="Arial, sans-serif" 
                fontSize="12" 
                fontWeight="bold" 
                fill="#116e3a" 
                textAnchor="middle"
              >
                B
              </text>
            </g>
            
            {/* Highlight effects */}
            <path 
              d="M18,28 
                 C24,36 36,36 42,28" 
              fill="none" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Bottom shine */}
            <path 
              d="M25,42 
                 C28,44 32,44 35,42" 
              fill="none" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
      
      {/* Text logo */}
      <div>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary tracking-tight">BRL</span>
          <span className="mx-1.5 text-gray-300 font-light">|</span>
          <span className="text-xl text-gray-800 font-medium">Financial</span>
        </div>
        <div className="text-xs text-gray-600 -mt-0.5 tracking-widest uppercase font-semibold">Financial Solutions</div>
      </div>
    </div>
  );
};

export default Logo;