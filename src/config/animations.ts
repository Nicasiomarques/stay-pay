import { Transition, Variants } from 'framer-motion';

// Spring configurations
export const springs = {
  smooth: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 20,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 15,
  },
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 14,
  },
  overshoot: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 10,
  },
} as const;

// Duration constants (in seconds)
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
  slower: 0.6,
} as const;

// Easing functions
export const easings = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  sharp: [0.4, 0.0, 0.6, 1],
} as const;

// Reusable variant objects
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export const drawerVariants: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0 },
  exit: { y: '100%' },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Page transition variants
export const pageVariants = {
  forward: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  backward: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
} as const;

// Stagger configurations
export const staggerConfigs = {
  fast: {
    staggerChildren: 0.03,
    delayChildren: 0.1,
  },
  normal: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  },
  slow: {
    staggerChildren: 0.08,
    delayChildren: 0.15,
  },
} as const;

// List container variant with stagger
export const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: staggerConfigs.normal,
  },
};

// Gesture animations
export const tapAnimation = {
  scale: 0.95,
};

export const pressAnimation = {
  scale: 0.98,
};

export const hoverAnimation = {
  scale: 1.02,
  transition: springs.smooth,
};

export const hoverLiftAnimation = {
  y: -4,
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  transition: springs.smooth,
};

// Special animations
export const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: {
    duration: 0.4,
  },
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const bounceAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Success animation (for confirmation screen)
export const successCheckmarkVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: springs.overshoot,
  },
};

export const successCircleVariants: Variants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      ...springs.overshoot,
      delay: 0.1,
    },
  },
};

// Skeleton shimmer animation
export const shimmerAnimation = {
  backgroundPosition: ['200% 0', '-200% 0'],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear',
  },
};

// Default transition for most animations
export const defaultTransition: Transition = {
  duration: durations.normal,
  ease: easings.easeOut,
};

// Layout transition for smooth repositioning
export const layoutTransition: Transition = {
  layout: {
    duration: durations.normal,
    ease: easings.easeOut,
  },
};
