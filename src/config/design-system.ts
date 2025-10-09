// Design System Configuration for L'ÉTUDIANT À L'ÉTRANGER
// Modern, high-converting, SEO-optimized design

export const designSystem = {
  // Brand Colors - Psychology-driven palette
  colors: {
    primary: {
      blue: '#0B5FFF', // Trust, professionalism
      blueLight: '#3D7FFF',
      blueDark: '#0847CC',
      blueGhost: 'rgba(11, 95, 255, 0.1)',
    },
    secondary: {
      green: '#2ECC71', // Success, growth
      greenLight: '#58D68D',
      greenDark: '#27AE60',
      greenGhost: 'rgba(46, 204, 113, 0.1)',
    },
    neutral: {
      white: '#FFFFFF',
      gray50: '#F8F9FA',
      gray100: '#F1F3F5',
      gray200: '#E9ECEF',
      gray300: '#DEE2E6',
      gray400: '#CED4DA',
      gray500: '#ADB5BD',
      gray600: '#6C757D',
      gray700: '#495057',
      gray800: '#343A40',
      gray900: '#212529',
      black: '#000000',
    },
    accent: {
      yellow: '#FFC107', // Attention, hope
      orange: '#FF6B35',
      purple: '#9B59B6',
      red: '#E74C3C',
    },
    semantic: {
      success: '#2ECC71',
      warning: '#FFC107',
      error: '#E74C3C',
      info: '#0B5FFF',
    },
  },

  // Typography System
  typography: {
    fonts: {
      heading: '"Poppins", system-ui, -apple-system, sans-serif',
      body: '"Inter", system-ui, -apple-system, sans-serif',
      mono: '"JetBrains Mono", "Courier New", monospace',
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
  },

  // Spacing System (8px base)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
    glow: '0 0 20px rgba(11, 95, 255, 0.3)',
    glowGreen: '0 0 20px rgba(46, 204, 113, 0.3)',
  },

  // Animation Timings
  animations: {
    durations: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    easings: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
}

// Country Flags & Colors
export const countries = {
  france: {
    name: 'France',
    flag: '🇫🇷',
    color: '#0055A4',
    emoji: '🗼',
  },
  belgium: {
    name: 'Belgique',
    flag: '🇧🇪',
    color: '#FDDA24',
    emoji: '🏰',
  },
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    color: '#FF0000',
    emoji: '🍁',
  },
  italy: {
    name: 'Italie',
    flag: '🇮🇹',
    color: '#009246',
    emoji: '🏛️',
  },
  china: {
    name: 'Chine',
    flag: '🇨🇳',
    color: '#DE2910',
    emoji: '🏮',
  },
}

// Social Proof Data
export const socialProof = {
  studentsHelped: '500+',
  visaSuccessRate: '95%',
  universities: '50+',
  countries: '5',
}

// Trust Badges
export const trustBadges = [
  {
    icon: '🎓',
    text: 'Certifié Campus France',
  },
  {
    icon: '⭐',
    text: '4.9/5 sur Trustpilot',
  },
  {
    icon: '✅',
    text: '95% taux de réussite visa',
  },
  {
    icon: '🏆',
    text: 'Prix d\'excellence 2024',
  },
]

export default designSystem
