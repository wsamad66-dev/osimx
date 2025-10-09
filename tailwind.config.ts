import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*",
    "./components/**/*",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        // PRIMARY - Trust & Innovation (Blue)
        primary: {
          50: '#EBF5FF',
          100: '#D1E9FF',
          200: '#A8D5FF',
          300: '#70B8FF',
          400: '#3D9AFF',
          500: '#26A5DE',
          600: '#1D8BC4',
          700: '#1570A3',
          800: '#0F5682',
          900: '#0A3D61',
          950: '#062A45'
        },
        
        // NAVY - Authority & Academic Excellence
        navy: {
          50: '#F0F3F9',
          100: '#E1E7F3',
          200: '#C3CFE7',
          300: '#9AACD5',
          400: '#6B82BC',
          500: '#232D6E',
          600: '#1A2556',
          700: '#141D44',
          800: '#0F1638',
          900: '#0A0F26',
          950: '#060914'
        },
        
        // GOLD - Achievement & Premium
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03'
        },
        
        // ORANGE - Primary CTA
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F29100',
          600: '#E68600',
          700: '#CC7700',
          800: '#B36600',
          900: '#995500',
          950: '#663800'
        },
        
        // NEUTRAL - Warm Grays
        neutral: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09'
        },
        
        // SEMANTIC
        success: {
          light: '#D1FAE5',
          DEFAULT: '#10B981',
          dark: '#059669'
        },
        warning: {
          light: '#FEF3C7',
          DEFAULT: '#F59E0B',
          dark: '#D97706'
        },
        error: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#DC2626'
        },
        info: {
          light: '#DBEAFE',
          DEFAULT: '#3B82F6',
          dark: '#2563EB'
        },
        
        // SPECIAL
        whatsapp: '#25D366',
        
        // Legacy brand colors for backward compatibility
        brand: {
          blue: "#26A5DE",
          navy: "#232D6E",
          amber: "#F29100",
          ivory: "#FAFAFA",
          gray: "#E5E7EB",
          primary: "#26a5de",
          "primary-light": "#4fb8e8",
          "primary-dark": "#1d8bc4",
          "navy-light": "#3a4785",
          orange: "#f29100",
          "orange-dark": "#d97e00",
          white: "#ffffff",
          "bg-light": "#F8FAFC",
          "bg-blue": "#E6F4FB",
          green: "#22C55E",
        },
        
        // Shadcn UI compatibility
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // 8pt Grid System + Custom Spacing
      spacing: {
        "section": "5rem", // 80px
        "section-sm": "3rem", // 48px
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '26': '6.5rem',  // 104px
        '30': '7.5rem',  // 120px
      },
      
      // Professional Typography Scale
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
      },
      
      // Custom Easing Functions
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      
      boxShadow: {
        // Standard elevation shadows
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        
        // Branded shadows with color (single layer)
        'primary': '0 10px 30px -5px rgba(38, 165, 222, 0.3)',
        'primary-lg': '0 20px 40px -10px rgba(38, 165, 222, 0.4)',
        'navy': '0 10px 30px -5px rgba(35, 45, 110, 0.3)',
        'navy-lg': '0 20px 40px -10px rgba(35, 45, 110, 0.4)',
        'gold': '0 10px 30px -5px rgba(245, 158, 11, 0.3)',
        'gold-lg': '0 20px 40px -10px rgba(245, 158, 11, 0.4)',
        'orange': '0 10px 30px -5px rgba(242, 145, 0, 0.3)',
        'orange-lg': '0 20px 40px -10px rgba(242, 145, 0, 0.4)',
        
        // Multi-layer premium shadows (colored + neutral)
        'primary-mixed': '0 4px 20px rgba(38, 165, 222, 0.25), 0 10px 40px rgba(35, 45, 110, 0.15)',
        'gold-mixed': '0 4px 20px rgba(245, 158, 11, 0.3), 0 10px 40px rgba(35, 45, 110, 0.1)',
        'navy-mixed': '0 4px 20px rgba(35, 45, 110, 0.3), 0 10px 40px rgba(0, 0, 0, 0.1)',
        
        // Glow effects
        'glow-primary': '0 0 40px rgba(38, 165, 222, 0.5)',
        'glow-gold': '0 0 40px rgba(245, 158, 11, 0.5)',
        'glow-navy': '0 0 40px rgba(35, 45, 110, 0.5)',
        
        // Inner shadows for depth
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-ring": "pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounceSubtle 1s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "scale-in-center": "scaleInCenter 0.5s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        glow: {
          "0%": { opacity: "0.5", transform: "scale(1)" },
          "100%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        pulseRing: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.7" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeInUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleInCenter: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #232D6E 0%, #26A5DE 60%)',
        'hero-navy': 'linear-gradient(135deg, #232D6E 0%, #1A2556 50%, #141D44 100%)',
        'premium-gold': 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
        'cta-orange': 'linear-gradient(135deg, #FB923C 0%, #F29100 50%, #E68600 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
