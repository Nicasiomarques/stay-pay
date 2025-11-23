import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { pageVariants, durations, easings } from '@/config/animations';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants.fade}
      transition={{
        duration: durations.normal,
        ease: easings.easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}
